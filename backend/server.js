require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});