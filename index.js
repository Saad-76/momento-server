const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const contentRoutes = require("./src/routes/contentRoutes");

app.use(express.json());
app.use(cors());

// app.use("/", (req, res) => {
//   return res.send({ message: "Server is listening at localhost:5001" });
// });
app.use("/relations", userRoutes);
app.use("/relations", contentRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(5001, () => {
      console.log("You are on port 5001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
