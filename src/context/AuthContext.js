import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import config from "../api/config";
import configTr from "../api/configTr"
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';

const authReducer = (state, action)=>{
    switch(action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            return {
                token: action.payload.token,
                errorMessage: '',
                id: action.payload.id,
                name: action.payload.name,
                surname: action.payload.surname,
                department: action.payload.department,
                company: action.payload.company,
                email: action.payload.email,
                role: action.payload.role,
                profilePic: action.payload.profilePic
            };
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'signout':
            return {
                token: null,
                errorMessage: '',
                id: -1,
                name: '',
                surname: '',
                department: '',
                company: '',
                email: '',
                role: '',
                profilePic: '',
                cities: [],
                regions: [],
                towns: []
            };
        case "insert_city_array":
            return {...state, cities: action.payload};
        case "insert_regions_array":
            return {...state, regions: action.payload};
        case "insert_towns_array":
            return {...state, towns: action.payload};
        default:
            return state;
    }
};



const clearErrorMessage = dispatch => () =>{
    dispatch({type: 'clear_error_message'})
}


const signout = (dispatch) => (route) =>{
    dispatch({type:'signout'});
    navigate(route);
}

const pickImage = (dispatch) => async ({setImage}) => {
    // No permissions request is necessary for launching the image library
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if(!response.canceled){
        setImage(response.assets[0].uri);
    }
};

const signin = (dispatch) => async ({email, password})=>{
    try{
        const response = await config.post('/api/auth/signin', {username: email, password});
        dispatch({
            type: 'signin',
            payload:{
                token: response.data.data.accessToken,
                profilePic: response.data.data.user.profilePicture,
                id: response.data.data.user.id,
                name: response.data.data.user.name,
                surname: response.data.data.user.surname,
                department: response.data.data.user.department.name,
                company: response.data.data.user.department.company.name,
                email: response.data.data.user.email,
                role: response.data.data.user.role.name
            }
        });
        navigate('Profile');
    } catch(err){
        const errorText = err.response.data.message;
        dispatch({
         type: 'add_error',
          payload: errorText
        });
        
    }
};

const signinTr = (dispatch) => async ({email, password})=>{
    try{
        const response = await configTr.post('/api/auth/signin', {username: email, password});
        dispatch({
            type: 'signin',
            payload:{
                token: response.data.data.accessToken,
                profilePic: response.data.data.user.profilePicture,
                id: response.data.data.user.id,
                name: response.data.data.user.name,
                surname: response.data.data.user.surname,
                department: response.data.data.user.department.name,
                company: response.data.data.user.department.company.name,
                email: response.data.data.user.email,
                role: response.data.data.user.role.name
            }
        });
        navigate('ProfileTr');
    } catch(err){
        const errorText = err.response.data.message;
        dispatch({
         type: 'add_error',
          payload: errorText
        });
    }
};

const activateAccount = (dispatch) => async ({email})=>{
    try{
        const response = await config.post('/api/auth/send-activation-mail', null, {
            params: {
                email: email
            }
        });
        console.log(response.data);
        navigate("ConfirmCode");
    }
    catch(err){
        const errorText = err.response.data.message;
        dispatch({
          type: 'add_error',
          payload: errorText
        });
    }
};

const activateAccountTr = (dispatch) => async ({email})=>{
    try{
        const response = await configTr.post('/api/auth/send-activation-mail', null, {
            params: {
                email: email
            }
        });
        console.log(response.data);
        navigate("ConfirmCodeTr");
    }
    catch(err){
        console.log("EROOOR");
        dispatch({
          type: 'add_error',
          payload: "Make sure you entered a correct email or contact admin."
        });
    }
};

const resetPassword = (dispatch) => async ({email})=>{
    try{
        const response = await config.post('/api/auth/send-reset-password-mail', null, {
            params: {
                email: email
            }
        });
        console.log(response.data);
        navigate("ConfirmPassword");
    }
    catch(err){
        const errorText = err.response.data.message;
        dispatch({
          type: 'add_error',
          payload: errorText
        });
    }
};

const resetPasswordTr = (dispatch) => async ({email})=>{
    try{
        const response = await configTr.post('/api/auth/send-reset-password-mail', null, {
            params: {
                email: email
            }
        });
        console.log(response.data);
        navigate("ConfirmPasswordTr");
    }
    catch(err){
        const errorText = err.response.data.message;
        dispatch({
          type: 'add_error',
          payload: errorText
        });
    }
};

const confirmActivation = (dispatch) => async ({code, password}) => {
    if(password.length <= 8){
        dispatch({
            type: 'add_error',
            payload: "Password must be at least 8 characters"
          });
    } 
    else if(password.length > 20){
        dispatch({
            type: 'add_error',
            payload: "Password must be at most 20 characters"
          });
    }
    else if(!(/[A-Z]/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Password must contain at least 1 upper case character"
          });
    }
    else if(!(/[a-z]/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Password must contain at least 1 lower case character"
          });
    }
    else if(!(/\d/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Password must contain at least 1 numeric character"
          });
    }
    else if(!(/[@?.!$-+]/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Password must contain at least 1 special character i.e @?.!$-+"
          });
    }
    else{
        try{
            const response = await config.post('/api/auth/activate-user', null, {
                params: {
                    activationToken: code,
                    password
                }
            });
            navigate("Login");
        }
        catch(err){
        console.log(err.response);
        dispatch({
            type: 'add_error',
            payload: "Code is incorrect."
          });
        }
    }
};


const confirmActivationTr = (dispatch) => async ({code, password}) => {
    if(password.length <= 8){
        dispatch({
            type: 'add_error',
            payload: "Şifre en az 8 karakter olmalı"
          });
    } 
    else if(password.length > 20){
        dispatch({
            type: 'add_error',
            payload: "Şifre en çok 20 karakter olmalı"
          });
    }
    else if(!(/[A-Z]/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Şifrede en az 1 büyük harfı olduğunu gerekmektedir"
          });
    }
    else if(!(/[a-z]/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Şifrede en az 1 küçük harfı olduğunu gerekmektedir"
          });
    }
    else if(!(/\d/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Şifrede en az 1 sayı olduğunu gerekmektedir"
          });
    }
    else if(!(/[@?.!$-+]/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Şifrede en az 1 özel harfı olduğunu gerekmektedir i.e @?.!$-+"
          });
    }
    else{
        try{
            const response = await configTr.post('/api/auth/activate-user', null, {
                params: {
                    activationToken: code,
                    password
                }
            });
            navigate("LoginTr");
        }
        catch(err){
        console.log(err.response);
        dispatch({
            type: 'add_error',
            payload: "Kodu hatalı."
          });
        }
    }
};


const confirmResetPassword = (dispatch) => async ({code, password}) => {
    if(password.length <= 8){
        dispatch({
            type: 'add_error',
            payload: "Password must be at least 8 characters"
          });
    } 
    else if(password.length > 20){
        dispatch({
            type: 'add_error',
            payload: "Password must be at most 20 characters"
          });
    }
    else if(!(/[A-Z]/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Password must contain at least 1 upper case character"
          });
    }
    else if(!(/[a-z]/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Password must contain at least 1 lower case character"
          });
    }
    else if(!(/\d/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Password must contain at least 1 numeric character"
          });
    }
    else if(!(/[@?.!$-+]/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Password must contain at least 1 special character i.e @?.!$-+"
          });
    }
    else{
        try{
            const response = await config.post('/api/auth/reset-password', null, {
                params: {
                    resetPasswordToken: code,
                    newPassword: password
                }
            });
            navigate("Login");
        }
        catch(err){
        console.log(err.response);
        dispatch({
            type: 'add_error',
            payload: "Code is incorrect."
          });
        }
    }
};

const confirmResetPasswordTr = (dispatch) => async ({code, password}) => {
    if(password.length <= 8){
        dispatch({
            type: 'add_error',
            payload: "Şifre en az 8 karakter olmalı"
          });
    } 
    else if(password.length > 20){
        dispatch({
            type: 'add_error',
            payload: "Şifre en çok 20 karakter olmalı"
          });
    }
    else if(!(/[A-Z]/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Şifrede en az 1 büyük harfı olduğunu gerekmektedir"
          });
    }
    else if(!(/[a-z]/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Şifrede en az 1 küçük harfı olduğunu gerekmektedir"
          });
    }
    else if(!(/\d/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Şifrede en az 1 sayı olduğunu gerekmektedir"
          });
    }
    else if(!(/[@?.!$-+]/.test(password))){
        dispatch({
            type: 'add_error',
            payload: "Şifrede en az 1 özel harfı olduğunu gerekmektedir i.e @?.!$-+"
          });
    }
    else{
        try{
            const response = await configTr.post('/api/auth/reset-password', null, {
                params: {
                    resetPasswordToken: code,
                    newPassword: password
                }
            });
            navigate("LoginTr");
        }
        catch(err){
        console.log(err.response);
        dispatch({
            type: 'add_error',
            payload: "Kodu hatalı."
          });
        }
    }
};


const updatePic = (dispatch) => async({id, imageUri, authToken})=>{
    try{
        let formData = new FormData();
        formData.append('file', {name: new Date + `_${id}`,type: "image/jpg", uri:imageUri});
        console.log(imageUri);
        const response = await config.post(`/api/user/${id}/profile-picture/add`, formData,
        {
            headers: {
                Authorization: 'Bearer ' + authToken,
                'content-type': 'multipart/form-data'
            }
        }
        )
        console.log(response);
        navigate('Profile');
    }
    catch(err){
        console.log(err.response);
    }
};


const getCities = (dispatch) => async({authToken, page = 0, pageSize = 5}) => {
    try{
        const response = await config.get('/api/city', {
            params:{
                page: page,
                pageSize: pageSize
            },
            headers: {
                Authorization: 'Bearer ' + authToken
            }
        });
        dispatch({
            type: 'insert_city_array',
            payload: response.data.data.content
        })
    }
    catch(err){

    }
};

const deleteCity = (dispatch) => async({authToken, cityId})=> {
    try{
        const response = await config.delete('/api/city', {
            params:{
                id: cityId
            },
            headers: {
                Authorization: 'Bearer ' + authToken
            }
        });
        console.log(response.data);
    }
    catch(err){
        console.log(err.response.data.message);
    }
};

const deleteRegion = (dispatch) => async({authToken, regionId})=> {
    try{
        const response = await config.delete('/api/region', {
            params:{
                id: regionId
            },
            headers: {
                Authorization: 'Bearer ' + authToken
            }
        });
        console.log(response.data);
    }
    catch(err){
        console.log(err.response.data.message);
    }
};

const deleteTown = (dispatch) => async({authToken, townId})=> {
    try{
        const response = await config.delete('/api/town', {
            params:{
                id: townId
            },
            headers: {
                Authorization: 'Bearer ' + authToken
            }
        });
        console.log(response.data);
    }
    catch(err){
        console.log(err.response.data.message);
    }
};


const getRegions = (dispatch) => async({authToken, cityId, page = 0, pageSize = 5}) => {
    try{
        const response = await config.get('/api/region', {
            params: {
                page: page,
                pageSize: pageSize
            },
            data:{
                "filter": {
                    cityId: cityId
                }
            },
            headers: {
                Authorization: 'Bearer ' + authToken
            }
        });
        dispatch({
            type: 'insert_regions_array',
            payload: response.data.data.content
        });
    }
    catch(err){
        console.log(err.response);
    }
};

const getTowns = (dispatch) => async({authToken, cityId, regionId, page = 0, pageSize = 5}) => {
    try{
        const response = await config.get('/api/town', {
            params: {
                page: page,
                pageSize: pageSize
            },
            data:{
                "filter": {
                    cityId: cityId,
                    regionId: regionId
                }
            },
            headers: {
                Authorization: 'Bearer ' + authToken
            }
        });
        dispatch({
            type: 'insert_towns_array',
            payload: response.data.data.content
        });
    }
    catch(err){
        console.log(err.response);
    }
};


const addCity = (dispatch) => async({authToken, name}) =>{
    try{
        const response = await config.post('/api/city',null, {
            params:{
                name: name
            },
            headers: {
                Authorization: 'Bearer ' + authToken
            }
        });
        console.log(response.data);
        navigate("AdminstratorCRUD");
    } catch(err){
        console.log(err.response);
    }
}



const addRegion = (dispatch) => async({authToken, name, cityId}) =>{
    try{
        const response = await config.post('/api/region',null, {
            params:{
                name: name,
                cityId: cityId
            },
            headers: {
                Authorization: 'Bearer ' + authToken
            }
        });
        console.log(response.data);
        navigate("AdminstratorRegions");
    } catch(err){
        console.log(err.response);
    }
}

const addTown = (dispatch) => async({authToken, name, regionId}) =>{
    try{
        const response = await config.post('/api/town',{
            name: name,
            regionId: regionId
        }, {
            headers: {
                Authorization: 'Bearer ' + authToken
            }
        });
        console.log(response.data);
        navigate("AdminstratorTowns");
    } catch(err){
        console.log(err.response);
    }
}


export const {Provider, Context} = createDataContext(
    authReducer,
    {
        signin,
        signinTr,
        clearErrorMessage,
        signout,
        activateAccount,
        activateAccountTr,
        resetPassword,
        resetPasswordTr,
        confirmActivation,
        confirmActivationTr,
        confirmResetPassword,
        confirmResetPasswordTr,
        updatePic,
        pickImage,
        getCities,
        deleteCity,
        getRegions,
        getTowns,
        addCity,
        addRegion,
        addTown,
        deleteRegion,
        deleteTown
    },
    {
        token: null,
        errorMessage: '',
        id: -1,
        name: '',
        surname: '',
        department: '',
        company: '',
        email: '',
        role: '',
        profilePic: '',
        cities: [],
        regions:[],
        towns: []
    }
);