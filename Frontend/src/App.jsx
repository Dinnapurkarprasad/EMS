import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import AdminDashbord from './Pages/AdminDashbord';
import EmployeeDashbord from './Pages/EmployeeDashbord';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummery from './components/dashbord/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartmenet from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import AddSalary from "./components/salary/Add";
import Summary from './components/EmployeeDashbord/Summary';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashbord" />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/admin-dashbord" element={ 
        <PrivateRoutes>
          <RoleBaseRoutes requiredRole={["admin"]}>
            <AdminDashbord />
          </RoleBaseRoutes>
        </PrivateRoutes>
      }>
        <Route index element={<AdminSummery />} />
        <Route path="departments" element={<DepartmentList />} />
        <Route path="add-department" element={<AddDepartmenet />} />
        <Route path="/admin-dashbord/department/:id" element={<EditDepartment />} />
        <Route path="employee" element={<List />} />
        <Route path="add-employee" element={<Add />} />
        <Route path="employee/:id" element={<View />} />
        <Route path="employee/edit/:id" element={<Edit />} />
        <Route path="salary/add" element={<AddSalary />} />
      </Route>
      
      <Route path="/employee-dashbord" element={
        <PrivateRoutes>
          <RoleBaseRoutes requiredRole={["admin", "employee"]}>
            <EmployeeDashbord />
          </RoleBaseRoutes>
        </PrivateRoutes>
      }>
       
        <Route index element={<Summary />} />
      </Route>
    </Routes>
  );
}

export default App;
