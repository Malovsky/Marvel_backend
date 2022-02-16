require("dotenv").config();

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(formidable());
app.use(cors());
mongoose.connect(process.env.MONGO_DB_URI);

const userRoutes = require("./routes/User_routes");
app.use(userRoutes);

const personnagesRoutes = require("./routes/Personnages_routes");
app.use(personnagesRoutes);

// app.get("/*", (req, res) =>
//   res.status(404).json({
//     error: {
//       message: "Cette route n'existe pas.",
//     },
//   })
// );

app.listen(process.env.PORT, () => {
  console.log("Server has started. 🤖 ✅");
});
