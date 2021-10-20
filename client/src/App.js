import './App.css';
import React,{Fragment} from 'react'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import  Register  from './components/layout/auth/Register';
import  Login  from './components/layout/auth/Login';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
//Redux
import { Provider } from 'react-redux' //Provider connects react and redux
import store from './store'
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Router>
   <Fragment>
      <Navbar/>
      <Route exact path="/" component={Landing}/>
      <section className="container">
        <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        </Switch>
        </section>
   </Fragment>
   </Router>
    </div>
    </Provider>
  );
}

export default App;
