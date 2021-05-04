"use strict";

const express = require("express"),
    layouts = require("express-ejs-layouts"),
    app = express(),
    router = require("./routes/index"),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    subscribersController = require("./controllers/subscribersController"),
    usersController = require("./controllers/usersController"),
    coursesController = require("./controllers/coursesController"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    cookieParser = require("cookie-parser"),
    expressSession = require("express-session"),
    expressValidator = require("express-validator"),
    connectFlash = require("connect-flash"),
    User = require("./models/user");

//mongoose.Promise = global.Promise;

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/confetti_cuisine",
    { useNewUrlParser: true }); //if database doesn't exist, will be created
mongoose.set("useCreateIndex", true);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(layouts);
app.use(express.static("public"));
app.use(expressValidator());
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

app.use(cookieParser("my_passcode"));
app.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000 //milisecond = ~1hr
    },
    resave: false,
    saveUninitialized: false
}));

app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server running on port: ${app.get("port")}`)
});