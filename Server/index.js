import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js"; // Importing the auth routes
import connectToDatabase from "./db/db.js";
import departmentRouter from "./routes/department.js"
import employeeRouter from "./routes/employee.js"
connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json()); 
app.use("/uploads", express.static("public/uploads"));
app.use('/public', express.static('public'));
app.use("/api/auth", authRouter);
app.use("/api/department",departmentRouter)
app.use("/api/employee",employeeRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});