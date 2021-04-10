"use strict";

const mongoose = require("mongoose"),
    User = require("./models/user"),
    Course = require("./models/course"),
    Subscriber = require("./models/subscriber");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine",
    { useNewUrlParser: true });
mongoose.connection;

var users = [
    {
        name: {
            first: "John",
            last: "Doe"
        },
        email: "john.doe@email.com",
        zipCode: 80027,
        password: "Abc123"
        
    },
    {
        name: {
            first: "Jane",
            last: "Smith"
        },
        email: "jane.smith@email.com",
        zipCode: 80127,
        password: "xyz987"
        
    },
    {
        name: {
            first: "Mary",
            last: "Sue"
        },
        email: "mary.sue@email.com",
        zipCode: 55555,
        password: "123456"
        
    }
];

var courses = [
    {
        title: "Baking 101",
        description: "Learn the basics on how to bake delicious breads and desserts.",
        maxStudents: 10,
        cost: 50
    },
    {
        title: "Novice to Pro Cooking",
        description: "Become a pro cook by taking this class",
        maxStudents: 10,
        cost: 80
    }
];

var subscribers = [
    {
        name: "John Doe",
        email: "john.doe@email.com",
        zipCode: "80027"
    },
    {
        name: "Suzy Sam",
        email: "suzy.sam@email.com",
        zipCode: "80512"
    }
];

User.deleteMany()
    .exec()
    .then(() => {
        console.log("User data is empty");
    });

Course.deleteMany()
    .exec()
    .then(() => {
        console.log("Course data is empty");
    });

Subscriber.deleteMany()
    .exec()
    .then(() => {
        console.log("Subscriber data is empty");
    });    

var commands = [];

users.forEach(u => {
    commands.push(
        User.create({
            name:{
                first: u.name.first,
                last: u.name.last
            },
            email: u.email,
            zipCode: u.zipCode,
            password: u.password

        })
    );
});

courses.forEach(c => {
    commands.push(
        Course.create({
            title : c.title,
            description: c.description,
            maxStudents: c.maxStudents,
            cost: c.cost
        })
    );
});

subscribers.forEach(s => {
    commands.push(
        Subscriber.create({
            name : s.name,
            email: s.email,
            zipCode: s.zipCode,
        })
    );
});


Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r));
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(`ERROR: ${error}`);
    });
