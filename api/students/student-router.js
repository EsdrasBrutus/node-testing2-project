const express = require("express");

const Student = require("./student-model")
const router = express.Router();

const {validateStudentId} = require("../middleware/middleware")

router.get("/", (req, res) => {
    Student.get(req.query)
      .then(students => {
        res.status(200).json(students);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
   
  router.post("/", (req, res) => {
    Student.insert(req.body)
      .then(student => {
        res.status(201).json(student);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  router.delete("/:id", validateStudentId, (req, res) => {
    Student.remove(req.params.id)
        .then(() =>{
            res.status(200).json({ message: "deleted"})
        })
        .catch(error => {
            res.status(500).json({ message: "Error removing student"})
        });   
  });

  module.exports = router;