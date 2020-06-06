const express = require("express");
const studentsRouter = require("./routers/studentsRouter");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const path = require("path");
const students = require("./models/students");
const formatIndex = require("../src/views/helpers/formatIndex");
const ifEquality = require("../src/views/helpers/ifEquality");

const app = express();

// Creating a config for handlebars engine
const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    formatIndex,
    ifEquality
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
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

app.get("/delete-student/:id", (req, res) => {
  try {
    let studentIndex;
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === parseInt(req.params.id)) {
        studentIndex = i;
      }
    }
    if (typeof studentIndex !== "undefined") {
      students.splice(studentIndex, 1);
      res.redirect("/students");
    } else {
      res.status(400).send("Invalid Student");
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/add-student", (req, res) => {
  res.render("add-students", {
    layout: "navigation",
    action: "/api/students",
    method: "POST",
    pageTitle: "Add Student",
    mode: "add"
  });
});

app.get("/edit-student/:id", (req, res) => {
  try {
    const student = students.find(student => {
      return student.id === parseInt(req.params.id);
    });

    if (student) {
      res.render("edit-students", {
        layout: "navigation",
        action: "/api/students/" + student.id,
        method: "PATCH",
        pageTitle: "Edit Student - " + student.firstName,
        student,
        mode: "edit"
      });
    } else {
      res.status(400).send("Student Not found!");
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
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
