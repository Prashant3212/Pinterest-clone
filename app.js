const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

const route = require("./routes/index");
const User = require("./routes/user"); // Correct model import

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "hey hey hey",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ Use model to setup passport strategies
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", route);

app.get("/", (req, res) => {
  res.send("hello");
});

console.log("working");
app.listen(3000);
