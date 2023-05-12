const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const moveController = require("./controllers/moveController");

dotenv.config({ path: "./config.env" });
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
// Start the server
const port = process.env.PORT || 8000;

app.post("/get-result", moveController.getResult);

const server = app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
