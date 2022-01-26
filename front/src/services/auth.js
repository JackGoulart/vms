import api from './api';

const register = (name, email, password, passwordConfirm) =>{
    return api.post('/user/register/', {
        name,
        email, 
        password, 
        passwordConfirm
    });
}

const login = (email, password) =>{
    return api.post('/user/login/', {
        email, 
        password
    });
}


const logout = () =>{
    return api.post('/user/logout/'); 
}


const AuthService ={
    register,
    login,
    logout
}

export default AuthService;