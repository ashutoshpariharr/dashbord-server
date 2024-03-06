require("dotenv").config();
const express = require("express");
const authRoute = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewale/error-middleware");
const cors = require("cors");
const adminRouter = require("./router/admin-router");

const app = express();
const PORT = 5000;

app.use(cors());

// Use the admin router
app.use("/api/data", adminRouter);

// Set up your routes
app.use(express.json());
app.use("/api/auth", authRoute);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Your server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();