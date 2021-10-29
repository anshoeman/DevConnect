import React from 'react'
import propTypes from 'prop-types'

const ProfileTop = ({profile:{
  status,
  company,
  website,
  location,
  social,
  user:{name,avatar}
}}) => {
    return (
        <div class="profile-top bg-primary p-2">
        <img
          class="round-img my-1"
          src={avatar}
          alt="#" 
        />
        <h1 class="large">{name}</h1>
        <p class="lead">{status}</p>
        <p>{location && <span>{location}</span>}</p>
        <div class="icons my-1">
          {
            website && ( <a href={website} target="_blank" rel="noopener noreferrer">
            <i class="fas fa-globe fa-2x"></i>
          </a>)
          }
          {
            social && social.twitter && (
              <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter fa-2x"></i>
          </a>
            )
          }  
          {
            social && social.facebook && (
              <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook fa-2x"></i>
          </a> 
            )
          }
          {
            social && social.linkedin && (
            <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin fa-2x"></i>
          </a>
            )
          }
          {
            social && social.youtube &&(
            <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-youtube fa-2x"></i>
          </a>
            )
          }
          {
            social && social.instagram &&(
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram fa-2x"></i>
          </a>
            )
        }
        </div>
      </div>
    )
}

ProfileTop.propTypes = {
    profile:propTypes.object.isRequired,
}

export default ProfileTop

