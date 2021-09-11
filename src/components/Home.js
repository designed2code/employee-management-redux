import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Home = () => {
    const employees = useSelector(state => state)

    const dispatch = useDispatch()
    
    // Delete Confirmation
    const deleteEmployee = (id) => {
        if (window.confirm(`Are you sure you want to delete employee with id ${id}`)) {
            // Delete
            dispatch({type: "DELETE_EMP", payload: id})
            toast.success('Deleted successfully')
          } else {
            // Do nothing!
          }
        
    }
    return ( 
        <div className="container">
            <div className="row">
                <div className="col-md-10 my-5 text-right">
                    {/* Add Employee routes to the add component */}
                    <Link to="/add" className="btn btn-outline-dark">Add Employee</Link>
                </div>
                <div className="col-md-12 mx-auto">
                <table className="table table-hover">
                    <thead className="text-white bg-dark text-center">
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Date of Birth</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((employee,id) =>(
                            <tr key={id}>
                                <td className="text-center">{employee.id}</td>
                                <td className="text-center">{employee.firstName}</td>
                                <td className="text-center">{employee.lastName}</td>
                                <td className="text-center">{employee.email}</td>
                                <td className="text-center">{employee.phoneNumber}</td>
                                <td>{employee.date}</td>
                                <td>
                                    <Link to={`/edit/${employee.id}`} className="btn btn-small btn-primary mr-2"> Edit </Link>
                                    <button type="button" onClick={()=> deleteEmployee(employee.id)} className="btn btn-small btn-danger">Delete</button>
                                </td>
                            </tr>))
                        }
                    </tbody>
                </table>
                </div>
            </div>
            
        </div>
     );
}
 
export default Home;