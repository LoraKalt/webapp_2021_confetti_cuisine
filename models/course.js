const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    courseSchema = new Schema(
        {
            title: {
                type: String,
                required: true,
                unique: true
            },
            description: {
                type: String,
                required: true,
            },
            maxStudents: {
                type: Number,
                default: 0,
                min: [0, "Course cannot have a negative number of students"]
            },
            cost: {
                type: Number,
                default: 0,
                min: [0, "Course cannot have a negative cost"]
            }
        },
        {
            timestamps: true
        }
    );

// courseSchema.methods.getInfo = function () {
//     return `Title ${this.title} Desc: ${this.description} MaxStudents: ${this.maxStudents} Cost: ${this.cost}`;
// };

module.exports = mongoose.model("Course", courseSchema);