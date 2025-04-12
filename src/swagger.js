require("dotenv").config();

const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes.js"];

const doc = {
  info: {
    title: "Book Nest - Backend Application",
    description: "Backend application",
  },
  securityDefinitions: {
    jwt: { type: "apiKey", in: "header", name: "Authorization" },
  },
  host: process.env.HOST || "localhost:5000",
  schemes: ["http", "https"],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.js");
});
