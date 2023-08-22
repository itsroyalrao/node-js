const express = require("express");
const expenseRoutes = require("./routes/expenseRoutes");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", expenseRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Page Not Found!" });
});

app.listen(3000);
