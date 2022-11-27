import React,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Signin.css'

import Layout from '../core/Layout';
import { signin,authenticate, isAuthenticated } from '../auth'


function Signin(){
    const[values, setValues] = useState({
        email:'mitalipawaskar@gmail.com',
        password:'mita123',
        error:'',
        loading:false,
        redirectToReferrer: false
    });

    const {email,password,loading,error,redirectToReferrer} = values    //destructure
    const {user} = isAuthenticated()

    const handleChange = name=>event=>{
        setValues({...values,                   //rest operator(...)   
            error:false,                        //hide typing errors
            [name]: event.target.value})       //[name] has dynamic value
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false,loading: true});

        signin({email ,password })      //signin() of api
        .then(data=>{
            if(data.error){                     //if error then update state
                setValues({...values, error: data.error ,loading:false})
            }else{                              
               authenticate(data , ()  =>{      //authenticate(data,callback())
                  setValues({
                     ...values,
                     redirectToReferrer : true
                 });
               });
            }
        });
    };

   const signinForm = () =>(
     <div>
           <h3 className="h3">Log In</h3>
        <form  className="form1" style={{maxWidth:300,margin:"auto",marginTop:20}}>
           
           <div className="form-group">
            <label>Email</label>
            <input onChange={handleChange('email')}
                   type="email" 
                   value = {email}
                   placeholder="Enter Email" 
                   className="form-control" />
            </div>

            <div className="form-group">
            <label>Password</label>
            <input onChange={handleChange('password')} 
                   type="password" 
                   value = {password}
                   placeholder="Enter Password" 
                   className="form-control"/>
            </div>

           
            <button className="button" onClick={clickSubmit} type="submit">Submit</button>
            

        </form>
      </div>
   );


    const showError = () =>(
        <div className="container col-md-8 offset-md-2 alert alert-danger" style={{display: error ? '' : 'none'}}>       {/* ternoray opt =>if error is there then display otherwise none  */}
            {error} <Link to={`/signup`}>SignUp</Link>
        </div>
    );

    const showLoading = () =>(
        loading && (
        <div className=" container col-md-8 offset-md-2 alert alert-info">
          <h3> Loading..  </h3>
        </div>)
    );

    const redirectUser = () =>{
       if(redirectToReferrer){
          if(user && user.role === 1){
              return <Redirect to="/admin/dashboard"/>;
          }else{
              return <Redirect to="/user/dashboard" />;
          }
       }

       if(isAuthenticated()){
           return <Redirect to ="/"/>
       }

    };


    return(
        <Layout className="container col-md-8 offset-md-2 mb-5">          
           
           {showLoading()}
           {showError()}   

           {signinForm()}

           {redirectUser()}

           {/* {JSON.stringify(values)} */}
        </Layout>
        
    )}

export default Signin;