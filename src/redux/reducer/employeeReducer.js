// Initial State of React App
const initialState = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: 9819812498,
        email: 'johndoe@gmail.com',
        date: '1996-09-07'
    },
]

// Reducer Function
const employeeReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_EMPLOYEE":
            state = [...state, action.payload]
            return state
        case "UPDATE_EMPLOYEE":
            const updateState = state.map(employee => employee.id === action.payload.id ? action.payload: employee)
            state = updateState
            return state
        case "DELETE_EMP":
            const filterEmployees = state.filter(employee => employee.id !== action.payload && employee)
            state = filterEmployees
            return state
        default:
             return state
    }
}

export default employeeReducer