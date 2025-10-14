import { Request, RequestHandler, Response } from 'express';
import { Product } from '../models/Product';
import { bufferToBase64 } from '../middleware/imageUpload';


  // Create product
  export const create: RequestHandler = async(req: Request, res: Response): Promise<void> => {
    try {
      const { name, price, category, description, stock } = req.body;
      
      let image: string | undefined;
      if (req.file) {
        image = bufferToBase64(req.file);
      }

      const product = await Product.create({
        name,
        price,
        category,
        description,
        stock: stock || 0,
        image,
      });

      res.status(201).json({
        message: 'Product created successfully',
        product,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get all products with pagination and search
  export const getAll: RequestHandler = async(req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string || '';
      const category = req.query.category as string || '';

      let query: any = {};
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }
      
      if (category) {
        query.category = { $regex: category, $options: 'i' };
      }

      const total = await Product.countDocuments(query);
      const products = await Product.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      res.json({
        products,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
          limit,
        },
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get product by ID
  export const getById: RequestHandler = async(req: Request, res: Response): Promise<void>=> {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json({ product });
    } catch (error: any) {
      if (error.kind === 'ObjectId') {
        res.status(400).json({ error: 'Invalid product ID' });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  }

  // Update product
  export const update: RequestHandler = async(req: Request, res: Response): Promise<void> => {
    try {
      const { name, price, category, description, stock } = req.body;
      
      const updateData: any = {
        name,
        price,
        category,
        description,
        stock,
      };

      if (req.file) {
        updateData.image = bufferToBase64(req.file);
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json({
        message: 'Product updated successfully',
        product,
      });
    } catch (error: any) {
      if (error.kind === 'ObjectId') {
        res.status(400).json({ error: 'Invalid product ID' });
        return;
      }
      res.status(400).json({ error: error.message });
    }
  }

  // Delete product (admin only)
  export const deleteProduct: RequestHandler = async(req: Request, res: Response): Promise<void> => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json({ message: 'Product deleted successfully' });
    } catch (error: any) {
      if (error.kind === 'ObjectId') {
        res.status(400).json({ error: 'Invalid product ID' });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  }
