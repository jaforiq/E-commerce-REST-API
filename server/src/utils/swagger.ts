import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API with TypeScript',
      version: '1.0.0',
      description: 'RESTful API for managing employees and products with JWT authentication',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Employee: {
          type: 'object',
          required: ['name', 'salary', 'role'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated ID',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            salary: {
              type: 'number',
              example: 50000,
            },
            role: {
              type: 'string',
              enum: ['admin', 'manager', 'employee', 'intern'],
              example: 'employee',
            },
            permission: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: ['read', 'write'],
            },
            image: {
              type: 'string',
              description: 'Base64 encoded image',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Product: {
          type: 'object',
          required: ['name', 'price', 'category'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated ID',
            },
            name: {
              type: 'string',
              example: 'Laptop',
            },
            price: {
              type: 'number',
              example: 1200,
            },
            category: {
              type: 'string',
              example: 'Electronics',
            },
            description: {
              type: 'string',
              example: 'High-performance laptop',
            },
            stock: {
              type: 'number',
              example: 50,
            },
            image: {
              type: 'string',
              description: 'Base64 encoded image',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        User: {
          type: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            _id: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'admin@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'password123',
            },
            name: {
              type: 'string',
              example: 'Admin User',
            },
            role: {
              type: 'string',
              enum: ['admin', 'manager', 'user'],
              example: 'admin',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);