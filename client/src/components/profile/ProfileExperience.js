import React from 'react'
import propTypes from 'prop-types'
import Moment from 'react-moment'
const ProfileExperience = ({experience:{
    company,title,location,current,to,from,description
}}) => {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> - {!to ?'Now':<Moment format='YYYY/MM/DD'>{to}</Moment>}
            </p>
            <strong>Position</strong>: {title}
            <p>
            <strong>Description</strong>: {description}
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {
        experience:propTypes.array.isRequired,
}

export default ProfileExperience
