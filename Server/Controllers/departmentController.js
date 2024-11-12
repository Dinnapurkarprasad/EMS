import Department from "../models/Department.js";

const getDepartments=async(req,res)=>{
   try {

    const departments=await Department.find()
    return res.status(200).json({success:true,departments})

    
   } catch (error) {
    return res.status(500).json({success:false,error:"server error in department"})
   }
}

const addDepartment=async(req,res)=>{
    try {
        const {dep_name,description}=req.body;
        const newDep=new Department({
            dep_name,
            description
        })
        await newDep.save()
        res.status(200).json({success:true,department:newDep})

    } 
    catch (error) {
        return res.status(500).json({success:false,error:"server error in department"})
    }
}

const editDepartment=async(req,res)=>{
    
    try {
        const{id}=req.params;
        const department=await Department.findById({_id:id})
        return res.status(200).json({success:true,department})
    } catch (error) {
        return res.status(500).json({success:false,error:"server error in department"})
    }
}

const updateDepartment=async(req,res)=>{
     try {
        const{id}=req.params;
        const {dep_name,description}=req.body
        
        const updateDep=await Department.findByIdAndUpdate({_id:id},{
            dep_name:dep_name,
            description:description
        }) 
        return res.status(200).json({success:true,updateDep})
     } catch (error) {
        return res.status(500).json({success:false,error:"server error in department"})
     }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const deleteDep = await Department.findByIdAndDelete(id);

        if (!deleteDep) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        return res.status(200).json({ success: true, deleteDep });
    } catch (error) {
        console.error("Delete error:", error);  // Log the error for debugging
        return res.status(500).json({ success: false, error: error.message || "Server error in department" });
    }
};





export {addDepartment,getDepartments,editDepartment,updateDepartment,deleteDepartment}
