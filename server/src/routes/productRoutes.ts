// import { Router } from 'express';
// import { upload } from '../middleware/imageUpload';
// import { authenticate, authorize } from '../middleware/auth';
// import { create, getAll, getById, update, deleteProduct } from '../controllers/productController';

// const router = Router();


// router.post(
//   '/',
//   authenticate,
//   authorize('admin', 'manager'),
//   upload.single('image'),
//   create
// );

// router.get('/', getAll);
// router.get('/:id', getById);

// router.put(
//   '/:id',
//   authenticate,
//   authorize('admin', 'manager'),
//   upload.single('image'),
//   update
// );


// router.delete(
//   '/:id',
//   authenticate,
//   authorize('admin'),
//   deleteProduct
// );

// export default router;

import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { upload } from '../middleware/imageUpload';
import { create, getAll, getById, update, deleteProduct } from '../controllers/productController';

const router = Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               stock:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post(
  '/',
  authenticate,
  authorize('admin', 'manager'),
  upload.single('image'),
  create
);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with pagination and search
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               stock:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put(
  '/:id',
  authenticate,
  authorize('admin', 'manager'),
  upload.single('image'),
  update
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       403:
 *         description: Access denied - Admin role required
 */
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  deleteProduct
);

export default router;