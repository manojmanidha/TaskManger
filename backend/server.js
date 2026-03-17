require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = 8082;

// Connect DB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});