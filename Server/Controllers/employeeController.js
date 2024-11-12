import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import Department from "../models/Department.js";
import bcrypt from "bcrypt"


// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Make sure 'uploads/' directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Multer middleware
const upload = multer({ storage: storage });

// Controller for adding a new employee
const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      date, // Date of Joining
      gender,
      designation,
      department,
      salary,
      password,
      role
    } = req.body;

    // Check if the email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: "User already registered" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : ""
    });

    const savedUser = await newUser.save();

    // Create new employee
    const newEmployee = new Employee({
      userId: savedUser._id,
      DOJ: date,
      designation,
      gender,
      department,
      salary
    });

    await newEmployee.save();

    // Send success response
    return res.status(200).json({ success: true, message: "Employee Created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error in employee creation" });
  }
};


const getEmployees=async(req,res)=>{
   
  try {
    const employees=await Employee.find().populate("userId",{password:0}).populate("department")
    return res.status(200).json({success:true,employees})
  } catch (error) {
    return res.status(500).json({success:false,error:"error in get employees"})
  }

}

const getEmployee = async (req, res) => {
  const { id } =req.params
 
  try {
      let employee = await Employee.findById({ _id: id })
        .populate("userId", { password: 0 })
        .populate("department");

      if (!employee) {
        return res.status(404).json({ success: false, error: "Employee not found in database" });
      }

      return res.status(200).json({ success: true, employee });
  } catch (error) {
      console.error("Error fetching employee:", error.message);
      return res.status(500).json({ success: false, error: "Error fetching employee data" });
  }
};




const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, department, salary } = req.body;

    // Input validation
    if (salary < 0) {
      return res.status(400).json({ success: false, error: "Salary must be a positive number." });
    }

    // Find employee by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    // Find the related user by the employee's userId
    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Update the user's name
    const updatedUser = await User.findByIdAndUpdate(employee.userId, { name }, { new: true });

    // Update the employee details
    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
      designation,
      salary,
      department,
    }, { new: true });

    if (!updatedUser || !updatedEmployee) {
      return res.status(404).json({ success: false, error: "Document not found" });
    }

    // Send success response
    return res.status(200).json({ success: true, message: "Employee Updated", updatedEmployee });

  } catch (error) {
    console.error(error); // Log error to server for debugging
    return res.status(500).json({ success: false, error: "Error in updating employee" });
  }
};


const fetchEmployeeBydepId = async (req, res) => {
  const { departmentId } = req.params; // Assuming you're passing department ID in params

  try {
      // Fetch employees based on department and populate user details (name and email)
      const employees = await Employee.find({ department: departmentId })
      console.log(employees)
      return res.status(200).json({
          success: true,
          employees,
      });
  } catch (error) {
      console.error('Error fetching employees:', error);
      return res.status(500).json({
          success: false,
          error: 'Error fetching employees',
      });
  }
};



export { addEmployee, upload,getEmployees,getEmployee,updateEmployee,fetchEmployeeBydepId};
