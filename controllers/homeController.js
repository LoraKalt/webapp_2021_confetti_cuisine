"use strict";
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

module.exports = {
    index: (req, res) => {
    res.render("index");
    }
    
}

