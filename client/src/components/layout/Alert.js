import React from 'react'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
export const Alert = ({alerts}) => alerts !== null && alerts.length >0 && alerts.map(alert=>(
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
))

Alert.propTypes = {
 alerts:propTypes.array.isRequired,
}
const mapStateToProps = state =>({
    alerts:state.alert
})  //Need to map the state into an array pass it as a prop to display on the ui


export default connect(mapStateToProps)(Alert)