import './App.css';
import React,{Fragment,useEffect} from 'react'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import  Register  from './components/layout/auth/Register';
import  Login  from './components/layout/auth/Login';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom' 
//Redux
import { Provider } from 'react-redux' //Provider connects react and redux
import store from './store'
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/dashboard' 
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/Create-Profile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
if(localStorage.token){
  setAuthToken(localStorage.token)
}
function App() {
  
  useEffect(()=>{
    store.dispatch(loadUser())
  },[]);

  return (
    <Provider store={store}>
      <Router>
   <Fragment>
      <Navbar/>
      <Route exact path="/" component={Landing}/>
      <section className="container">
        <Alert/>
        <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/profiles" component={Profiles}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/profile/:id" component={Profile}/>
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
        <PrivateRoute exact path="/add-experience" component={AddExperience}/>
        <PrivateRoute path='/create-profile' component={CreateProfile}/>
        <PrivateRoute path='/add-education' component={AddEducation}/>
        </Switch>
        </section>
   </Fragment>
   </Router> 

    </Provider>
  );
}

export default App;
