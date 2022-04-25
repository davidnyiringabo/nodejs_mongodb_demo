//Import the dependencies
const admin  = require('../middlewares/admin')
const express = require('express');
const mongoose = require('mongoose');
//Creating a Router
var router = express.Router();
//Create Course model CLASS
const Course = mongoose.model('Course');

//Router Controller for CREATE request
router.post('/',admin,(req,res) => {
    //const token = req.header('x-auth-token')
    //if(!token) return res.send('not authenticated..').status(401)
insertIntoMongoDB(req, res);
});
 //Router Controller for UPDATE request
router.put('/',(req,res) => {
    updateIntoMongoDB(req, res);
});
     
//Creating function to insert data into MongoDB
function insertIntoMongoDB(req,res) {
let course = new Course();
course.courseName = req.body.courseName;
course.courseId = req.body.courseId;
course.courseDuration = req.body.courseDuration;
course.courseFee = req.body.courseFee;
course.author = req.body.author;
course.discount = req.body.discount;
course.save()
    .then(courseSaved => res.send(courseSaved).status(201))
    .catch(err => res.send(err).status(400));
}
 
//Creating a function to update data in MongoDB
function updateIntoMongoDB(req, res) {
Course.findOneAndUpdate({ _id: req.body._id },
     req.body, { new: true })
    .then(course => res.send(course))
    .catch(err => res.send(err).status(400));
} 
//Router to retrieve the complete list of available courses
router.get('/',(req,res) => {
Course.find()
    .then(courses => res.send(courses))
    .catch(err => res.send(err).status(404));
});
router.get('/byname/:name/:couId', (req,res) => {
    Course.find({courseName:req.params.name,courseId:req.params.couId})
        .then(courses => res.send(courses))
        .catch(err => res.send(err).status(404));
    });
    
router.get('/discount/:discount', (req,res) => {
    Course.find({discount:req.params.discount})
        .then(courses => res.send(courses))
        .catch(err => res.send(err).status(404));
    });
//Comparision operators
// eq (equal)
//ne (not equal)
//gt (greater than)
//gte (greater than or equal to)
//lt (less than)
//lte (Less than or equal to)
//in
//nin (not in)
router.get('/comparision', (req,res) => {
    Course
    .find({discount:{$gte: 100}})
    //.find({discount:{$lte:100}})
    .sort({courseName:-1})
        .then(courses => res.send(courses))
        .catch(err => res.send(err).status(404));
    });
    //or
    //and
    router.get('/logical', (req,res) => {
        Course
        .find()
        //.and([{author:'Stanley'},{discount:{$in:[100,150]}}])
        .or([{discount:{$gte:100}},{author:'Stanley'}])
        .sort({courseName:1})
            .then(courses => res.send(courses))
            .catch(err => res.send(err).status(404));
        });
        
        router.get('/expression', (req,res) => {
            Course
            //starts with
            .find({ author: /^sta/i})
            //ends with
            //.find({author:/Sta$/i})
            //contains
           //.find({author:/.*st.*/i})
            //.or([{author:'Stanley'},{discount:{$in:[100,150]}}])
            .and([{discount:{$gte:100}},{author:'Stanley'}])
            .sort({courseName:1})
                .then(courses => res.send(courses))
                .catch(err => res.send(err).status(404));
            });
router.get('/advanced/:author', (req,res) => {
    Course.find({author: req.params.author})
    .select({author:1,courseId:1})
        .then(courses => res.send(courses))
        .catch(err => res.send(err).status(404));
    });
    
router.get('/count/:author', (req,res) => {
    Course
    .find({author: req.params.author})
            .then(count => res.send(count))
            .catch(err => res.send(err));

    });
//Router to update a course using it's ID
router.get('/:id', (req, res) => {
Course.findById(req.params.id)
    .then(course => res.send(course))
    .catch(err => res.send(err).status(404));
});
 
//Router Controller for DELETE request
router.delete('/:id', (req, res) => {
Course.findByIdAndRemove(req.params.id)
    .then(course => res.send(course))
    .catch(err => res.send(err).status(404));
});
//count documents
function dispayCount(author){
Course.find({author:author}).countDocuments()
    .then(count =>console.log({total:count }))
    .catch(err => console.error(err));
}
//dispayCount('Stanley')
module.exports = router;