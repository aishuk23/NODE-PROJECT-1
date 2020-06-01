const express = require("express");
const studentsRouter = require("./routers/studentsRouter");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const path = require("path");
const students = require("./models/students");

const app = express();

// Creating a config for handlebars engine
const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials")
});

app.use(bodyParser.json());
// Define which engines are available
app.engine(".hbs", hbs.engine);
// Set default engine to use
app.set("view engine", ".hbs");
// Let express know where all the views are present
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("home", {
    layout: "hero",
    pageTitle: "Home"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "hero",
    pageTitle: "About"
  });
});

app.get("/students", (req, res) => {
  res.render("students", {
    layout: "navigation",
    pageTitle: "Students",
    students
  });
});

app.use("/api/students", studentsRouter);

app.get("/teachers", (req, res) => {
  res.json({
    teachers: ["Dani", "Sam", "John"]
  });
});

app.listen(8080, () => {
  console.log("Server Running!");
});
