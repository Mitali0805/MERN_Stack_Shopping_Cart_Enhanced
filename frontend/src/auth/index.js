import API from '../config'

// fetch API for backend connection
export const signup = (user) =>{
    //console.log(name,mobile,email,password);
return fetch(`${API}/signup`,{
       method:"POST" ,
       headers:{
          Accept:'application/json' ,
          "Content-Type": "application/json",
       },
       body: JSON.stringify(user),  //to send json string to backend
       mode:"cors"
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
};

// fetch API for backend connection of signin
export const signin = (user) =>{
    //console.log(name,mobile,email,password);
return fetch(`${API}/signin`,{
       method:"POST" ,
       headers:{
          Accept:'application/json' ,
          "Content-Type": "application/json",
       },
       body: JSON.stringify(user),
       mode:"cors"
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
};

export const authenticate = (data,next) => {
   if(typeof window !== undefined){
       localStorage.setItem('jwt',JSON.stringify(data));    //key=>'jwt' ,value=>data
       next();
    }
};

export const signout = (next) =>{
    if(typeof window !== undefined){
        localStorage.removeItem('jwt');
        next();

        //request to backend
        return fetch(`${API}/signout`,{
            method:"GET",
        })
        .then(response =>{
            console.log('signout',response);
        })
        .catch(err => console.log(err));
    }
};

//Authenticate (to hide & show signin,signup,signout)
export const isAuthenticated = () =>{
 if(typeof window == 'undefined'){
     return false;
 }

 if(localStorage.getItem('jwt')){
     return JSON.parse(localStorage.getItem('jwt'))   //return in json format
 }else{
     return false;
 }
};
