import { Request, RequestHandler, Response } from 'express';
import { Employee } from '../models/Employee';
//import { bufferToBase64 } from '../middleware/imageUpload';


  // Create employee
//   export const create: RequestHandler = async(req: Request, res: Response): Promise<void> => {
//     try {
//       const { name, salary, role, permission } = req.body;
      
//       let image: string | undefined;
//       if (req.file) {
//         image = bufferToBase64(req.file);
//       }
// //console.log(name, salary, role, permission);
//       const employee = await Employee.create({
//         name,
//         salary,
//         role,
//         permission: permission,
//         image,
//       });
// //console.log(employee);
//       res.status(201).json({
//         message: 'Employee created successfully',
//         employee,
//       });
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }
  export const create: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { name, salary, role, permission } = req.body;
    
    let image: string | undefined;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const employee = await Employee.create({
      name,
      salary,
      role,
      permission,
      image,
    });

    res.status(201).json({
      message: 'Employee created successfully',
      employee,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


  // Get all employees with pagination and search
  export const getAll: RequestHandler = async(req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string || '';

      let query = {};
      if (search) {
        query = {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { role: { $regex: search, $options: 'i' } },
          ],
        };
      }

      const total = await Employee.countDocuments(query);
      const employees = await Employee.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      res.json({
        employees,
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

  // Get employee by ID
  export const getById: RequestHandler = async(req: Request, res: Response): Promise<void> => {
    try {
      const employee = await Employee.findById(req.params.id);

      if (!employee) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }

      res.json({ employee });
    } catch (error: any) {
      if (error.kind === 'ObjectId') {
        res.status(400).json({ error: 'Invalid employee ID' });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  }

  // Update employee
  export const update: RequestHandler = async(req: Request, res: Response): Promise<void> => {
    try {
      const { name, salary, role, permission } = req.body;
      
      const updateData: any = {
        name,
        salary,
        role,
        permission: permission ? JSON.parse(permission) : undefined,
      };

      let image: string | undefined;
      if (req.file) {
        image = `/uploads/${req.file.filename}`;
      }

      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!employee) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }

      res.json({
        message: 'Employee updated successfully',
        employee,
      });
    } catch (error: any) {
      if (error.kind === 'ObjectId') {
        res.status(400).json({ error: 'Invalid employee ID' });
        return;
      }
      res.status(400).json({ error: error.message });
    }
  }

  // Delete employee (admin only)
  export const deleteEmployee: RequestHandler = async(req: Request, res: Response): Promise<void> => {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);

      if (!employee) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }

      res.json({ message: 'Employee deleted successfully' });
    } catch (error: any) {
      if (error.kind === 'ObjectId') {
        res.status(400).json({ error: 'Invalid employee ID' });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  }
