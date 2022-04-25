const mongoose = require('mongoose');

//Attributes of the Course object
var courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: 'this field is required!'
    },
    courseId: {
        type: String,
        required: 'this field is required'
    },
    author: {
        type: String,
        required: 'this field is required',
        min: 10,
        max: 100
    },
    courseDuration: {
        type: String
    },
    courseFee: {
        type: String
    },
    discount: {
        type: Number
    }
});

mongoose.model('Course', courseSchema);