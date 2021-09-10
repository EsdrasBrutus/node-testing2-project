const Student = require("../students/student-model")

const validateStudentId = async (req, res, next) =>{
    const {id} = req.params
   try {
     const student = await Student.getById(id)
     if(!student){
       res.status(404).json({ message: "student not found" })
     }
     else{
       req.student = student
       next();
     }
   }
   catch(error){
     res.status(500).json({message: "Internal server error"})
   }
 }

 module.exports = { 
     validateStudentId 
    }