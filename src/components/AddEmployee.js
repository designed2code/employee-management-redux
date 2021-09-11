import { useState } from "react";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const AddEmployee = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLasttName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [date, setDate] = useState('')
    
    
    // Data from the redux state
    const employees = useSelector(state=> state)
    // Applying actions
    const dispatch = useDispatch()
    // To push back to Home after adding 
    const history = useHistory()
    
    // Form Submit Handler
    const submitHandler = (e) => {
        // Prevent Default Submission
        e.preventDefault()
        // Check if the email and Phone Number already exits
        const checkEmail = employees.find(employee => employee.email === email && employee)
        const checkNumber = employees.find(employee => employee.phoneNumber === parseInt(phoneNumber))
        
        // Check if all fields are filled
        if(!email || !phoneNumber || !firstName || !lastName || !date){
            return toast.warning("Please Fill All Details")
        }
        if(checkEmail){
            return toast.error("Email already exits")
        }
        if(checkNumber){
            return toast.error("Number already exits")
        }
        // Check Email and Phone Number Pattern 
            const reEmail = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/
            const rePhone = /^[6-9]\d{9}$/
            if(!reEmail.test(String(email).toLowerCase())){
                return toast.warning("Invalid EMail")
            }
            else if(!rePhone.test(Number(phoneNumber))){
                return toast.warning("Invalid Number")
            }
        
        

        // To get the new id after adding the employee
        const data = {
            // id: employees[employees.length - 1].id + 1,
            id: employees.length > 0 ? employees[employees.length - 1].id + 1 : 1,
            firstName,
            lastName,
            email,
            phoneNumber,
            date
        }
        dispatch({type: "ADD_EMPLOYEE", payload: data})
        toast.success('Emp added')
        history.push("/")
    }
    return ( 
        <div className="container">
            <div className="row">
                {/* Heading */}
                <h1 className="display-3 my-5 text-center">Add Employee</h1>
                 
                {/* Add Employee Form  */}
                <div className="col-md-6 mx-auto p-5">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                       <input autoComplete="new-password" type="text" placeholder="First Name..." className="form-control py-2" value={firstName} onChange={e=> setFirstName(e.target.value)}/>
                    </div>

                    <div className="form-group">
                       <input autoComplete="new-password" type="text" placeholder="Last Name..." className="form-control" value={lastName} onChange={e => setLasttName(e.target.value)}/>
                    </div>

                    <div className="form-group">
                       <input autoComplete="new-password" type="email" placeholder="abc@email.com" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="form-group">
                       <input autoComplete="new-password" type="number" placeholder="10-digit Phone Number" className="form-control" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                    </div>
                    
                    <div className="form-group">
                       <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)}/>
                    </div>

                    <div className="form-group">
                       <input type="submit" value="Add Employee" className="form-control btn btn-dark btn-block" />
                    </div>
                </form>
                </div>
            </div>
            
        </div>
     );
}
 
export default AddEmployee;
