import { Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
// Importing Components
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import Home from './components/Home';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Switch>
        {/* Home Route */}
        <Route exact path="/">
          <Home/>
        </Route>
        
        {/* Add Employee Route */}
        <Route path="/add">
        <AddEmployee/>
        </Route>
        
        {/* Edit Employee Route */}
        <Route path="/edit/:id">
        <EditEmployee/>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
