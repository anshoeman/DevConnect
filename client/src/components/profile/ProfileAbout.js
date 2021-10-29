import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile:{
    bio,
    skills,
    user:{name}
}}) => {
    return (
        <div>
             <div class="profile-about bg-light p-2">
          <h2 class="text-primary">{name}'s Bio</h2>
          <p>
            {bio}
          </p>
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
            {skills.map((skill,index)=>(
                <div className="p-1">
                <i className="fas fa-check"></i>{skill}
                    </div>
            ))}
          </div>
        </div>
        </div>
    )
}

ProfileAbout.propTypes = {

}

export default ProfileAbout

