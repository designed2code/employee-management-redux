import { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
const EditEmployee = () => {
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLasttName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [date, setDate] = useState('')

    const{id} = useParams()
    const employees = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const currentEmployee = employees.find(employee => employee.id === parseInt(id))
    
    

    useEffect(()=>{
        if(currentEmployee){
            setFirstName(currentEmployee.firstName)
            setLasttName(currentEmployee.lastName)
            setEmail(currentEmployee.email)
            setPhoneNumber(currentEmployee.phoneNumber)
            setDate(currentEmployee.date)
        }
    
    },[currentEmployee])

    const submitHandler = (e) => {
      // Prevent Default Submission
      e.preventDefault()
      // Check if the email already exits
      const checkEmail = employees.find((employee) => employee.id !== parseInt(id) && employee.email === email)
      const checkNumber = employees.find((employee) => employee.id !== parseInt(id) && employee.phoneNumber === parseInt(phoneNumber))
      // Check Email and Phone Number Pattern 
      const reEmail = /^\S+@\S+$/
      const rePhone = /^[6-9]\d{9}$/
            if(!reEmail.test(String(email).toLowerCase())){
                return toast.warning("Invalid EMail")
            }
            else if(!rePhone.test(Number(phoneNumber))){
                return toast.warning("Invalid Number")
            }
      if(!email || !phoneNumber || !firstName || !lastName || !date){
          return toast.warning("Please Fill All Details")
      }
      if(checkEmail){
          return toast.error("Email already exits")
      }
      if(checkNumber){
          return toast.error("Number already exits")
      }
      // To get the new id after adding the employee
      const data = {
          id: parseInt(id),
          firstName,
          lastName,
          email,
          phoneNumber,
          date
      }
      dispatch({type: "UPDATE_EMPLOYEE", payload: data})
      toast.success('Emp Updated')
      history.push("/")
  }
        return ( 
        <div className="container">
            {currentEmployee? (
            <>            
            <div className="row">
                {/* Heading */}
                <h1 className="display-3 my-5 text-center">Edit Employee {id}</h1>
                 
                {/* Add Employee Form  */}
                <div className="col-md-6 mx-auto p-5">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                       <input type="text" placeholder="First Name..." className="form-control py-2" value={firstName} onChange={e=> setFirstName(e.target.value)}/>
                    </div>

                    <div className="form-group">
                       <input type="text" placeholder="Last Name..." className="form-control" value={lastName} onChange={e => setLasttName(e.target.value)}/>
                    </div>

                    <div className="form-group">
                       <input type="email" placeholder="abc@email.com" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="form-group">
                       <input type="number" placeholder="10-digit Phone Number" className="form-control" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                    </div>
                    
                    <div className="form-group">
                       <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)}/>
                    </div>

                    <div className="form-group">
                       <input type="submit" value="Update Employee" className="form-control btn btn-dark m-2" />
                    </div>

                    <div className="form-group">
                       <Link to = "/" className="form-control btn btn-danger m-2">Cancel</Link>
                    </div>
                </form>
                </div>
            </div>
            </>
            ):(
                <h1 className="display-3 my-5 text-center">Employee with id {id} does not exists</h1> 
            )}
        </div>
     );
}
 
export default EditEmployee;