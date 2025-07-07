const express = require("express");
const router = express.Router();
const userData = require("../routes/user");
const postData = require("../routes/post");
const passport = require("passport");
const upload = require("./multer")

const isLoggedin = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else res.redirect("/");
};

router.get("/", (req, res) => {
  res.render("landing");
});

router.get("/index", (req, res) => {
  res.render("index");
});

router.get("/home",isLoggedin, async(req, res) => {
  const user = await userData
  .findOne({username:req.user.username})
  .populate("post")
  res.render("home",{user});
});
router.get("/profile", isLoggedin, async(req, res) => {
  const user = await userData
  .findOne({username:req.user.username})
  .populate("post")
  
  res.render("profile",{user});
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

router.post("/register", (req, res, next) => {
    // console.log("Request Body:", req.body);
  const newUser = new userData({
    username: req.body.username,
    email: req.body.email,
    fullName: req.body.fullname
  });

  userData.register(newUser, req.body.password, (err, user) => {
    if (err) {
      if (err.name === "UserExistsError") {
        return res.redirect("/login?error=userexists");
      }
      console.log(err);
      return res.redirect("/index");
    }


    passport.authenticate("local")(req, res, () => {
      res.redirect("/home");
    });
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/index"
}));



router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(404).send("no file was given");
  }

  const user = await userData.findOne({username: req.session.passport.user});
console.log(user);

  const createPost = await postData.create({
    image: req.file.filename,
    postText: req.body.postText,
    user: user._id,
  });

  user.post.push(createPost._id); 
  
  await user.save();

  res.redirect("/profile");
});


module.exports = router;
