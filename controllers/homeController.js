var courses = [
    {
        title: "Rasperry Cake",
        cost: 50
    },
    {
        title: "Artichoke",
        cost: 25
    },
    {
        title: "Burger",
        cost: 100
    }
];

exports.showIndex = (req, res) => {
    res.render("index");
};

exports.showCourses = (req, res) => {
    res.render("courses", {offeredCourses: courses});
};

exports.showSignUp = (req, res) => {
    res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
    res.render("thanks");
};
