import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Thera Kinetics API",
      version: "1.0.0",
      description: "API documentation for Thera Kinetics",
    },
    servers: [
      {
        url: "http://localhost:3010/api/v1", 
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", 
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  
  },
  apis: ["./src/api/v1/**/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
