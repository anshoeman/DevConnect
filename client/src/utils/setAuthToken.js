import axios from 'axios'
//if token is there then do this
const setAuthToken = token =>{
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete axios.defaults.headers.common['x-auth-token']
    }
}


export default setAuthToken