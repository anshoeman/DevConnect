import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import propTypes from 'prop-types'
import {connect} from 'react-redux'//rest opeartor we passed inside the Route
const PrivateRoute = ({component:Component,auth:{isAuthenticated,loading},...rest}) => (
    <Route {...rest} render={props=>!isAuthenticated && !loading ? (<Redirect to="/login"/>):(<Component {...props}/>)}/>
)

PrivateRoute.propTypes = {
auth:propTypes.object.isRequired
}

const mapStateToProps = state=>({   //We are passing whole state in the props so mapstatetoprops
    auth:state.auth
})

export default connect(mapStateToProps)(PrivateRoute)//connect redux with the actions we craeted
