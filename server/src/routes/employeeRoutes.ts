// import { Router } from 'express';
// import { upload } from '../middleware/imageUpload';
// import { authenticate, authorize } from '../middleware/auth';
// import { create, deleteEmployee, getAll, getById, update } from '../controllers/employeeController';

// const router = Router();

// router.post('/', authenticate,
//   authorize('admin', 'manager'),
//   upload.single('image'),
//   create
// );
// router.get('/', getAll);
// router.get('/:id', getById);
// router.put('/:id',authenticate, authorize('admin', 'manager'), upload.single('image'),update);
// router.delete(
//   '/:id',
//   authenticate,
//   authorize('admin'),
//   deleteEmployee
// );

// export default router;

import { Router } from 'express';
import { upload } from '../middleware/imageUpload';
import { authenticate, authorize } from '../middleware/auth';
import { create, deleteEmployee, getAll, getById, update } from '../controllers/employeeController';

const router = Router();

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
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
 *               - salary
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               salary:
 *                 type: number
 *               role:
 *                 type: string
 *               permission:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Employee created successfully
 */
router.post(
  '/',
  authenticate,
  //authorize('admin', 'manager'),
  upload.single('image'),
  create
);

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees with pagination
 *     tags: [Employees]
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
 *     responses:
 *       200:
 *         description: List of employees
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee details
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee
 *     tags: [Employees]
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
 *               salary:
 *                 type: number
 *               role:
 *                 type: string
 *               permission:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Employee updated successfully
 */
router.put(
  '/:id',
  authenticate,
  //authorize('admin', 'manager'),
  upload.single('image'),
  update
);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete employee (Admin only)
 *     tags: [Employees]
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
 *         description: Employee deleted successfully
 *       403:
 *         description: Access denied
 */
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  deleteEmployee
);

export default router;