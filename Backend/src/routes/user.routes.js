
import express from "express"
import { User } from "../modals/user.modals.js"

const router = express.Router()

// create data
router.post("/",async(req,res)=>{
    try{
    const {name,course,batch,rollno} = req.body
    
    if (!name || !course || !batch || !rollno ) {
    res.status(400).json({error : "Missing requird feilds"})    
    }
    const userAdd = await User.create({
        name : name,
        course : course,
        batch : batch,
        rollno : rollno,
    })
    res.status(201).json(userAdd)
}
catch(error){
    console.log("API ERROR :" , error)
    res.status(400).json({error : error.message})
}
})
// get and read all user
router.get("/",async(req,res)=>{
    try {
        const getUser = await User.find()
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json({error : error.message})       
    }
})
// get single user
router.get("/:id",async(req,res)=>{
    
    const {id} = req.params
    
    try {
        const getSingleUser = await User.findById({_id : id})
        res.status(200).json(getSingleUser)
    } catch (error) {
        res.status(500).json({error : error.message})       
    }
})
// delete single user
router.delete("/:id",async(req,res)=>{
    
    const {id} = req.params
    try {
        const deleteUser = await User.findByIdAndDelete({_id : id})
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(500).json({error : error.message})       
    }
})
// patch (edit) user
router.patch("/:id",async(req,res)=>{
    
    const {id} = req.params
    const{name,course,batch,rollno} = req.body
    if (!name || !course || !batch || !rollno) {
    res.status(400).json({error : "Missing requird edit feilds "})    
    }
    try {
        const updateUser = await User.findByIdAndUpdate(id,req.body ,{new: true})
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({error : error.message})       
    }
})

// student portal get api
router.get("/studentCard/:rollno",async(req,res)=>{
    const {rollno} = req.params
    try {
        const getstudent = await User.findOne({rollno})
        if (!getstudent) {
        res.status(404).json({message:"student not found"})
        }
        res.status(200).json(getstudent)
    } catch (error) {
        res.status(500).json({error : error.message})       
    }
})

export default router