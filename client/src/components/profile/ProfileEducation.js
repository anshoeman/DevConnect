import React from 'react'
import propTypes from 'prop-types'
import Moment from 'react-moment'
const ProfileEducation = ({education:{
    school,degree,fieldofstudy,current,to,from,description
}}) => {
    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> - {!to ?'Now':<Moment format='YYYY/MM/DD'>{to}</Moment>}
            </p>
            <strong>Degree</strong>: {degree}
            <p>
            <strong>Description</strong>: {description}
            </p>
            <p>
            <strong>FeildOfStudy</strong>: {fieldofstudy}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
        education:propTypes.array.isRequired,
}

export default ProfileEducation
