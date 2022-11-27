import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../core/Layout';
import { signup } from '../auth/index'

function Signup(){
    const[values, setValues] = useState({
        name:'',
        mobile:'',
        email:'',
        password:'',
        error:'',
        success:false,
        redirectToReferrer:false
    });

    const {name,mobile,email,password,success,error,redirectToReferrer} = values    //destructure

    const handleChange = name=>event=>{
        setValues({...values,                   //rest operator(...)   
            error:false,                        //hide typing errors
            [name]: event.target.value})       //[name] has dynamic value such as name,email,password,mobile
    };

    const clickSubmit = (event) => {
        event.preventDefault();     //to avoid reloading of page when button clicked 
        setValues({...values, error:false});

        signup({name,mobile,email ,password })      //signup() of api
        .then(data=>{
            if(data.error){                     //if error then update state
               console.log("error");
                setValues({...values, error: data.error , success:false,redirectToReferrer:false})
            }else{                              //
                setValues({
                    ...values,
                    name:'',
                    mobile:'',
                    email:'',
                    password:'',
                    error:'',
                    success:true,
                    redirectToReferrer : true
                })
            }
        })
    }

   const signupForm = () =>(
       <div>
           <h3 className="h3">Signup</h3>
        <form className="form" style={{maxWidth:400,margin:"auto",marginTop:20}}> 
            <div className="form-group">
            <label>Name</label>
            <input onChange={handleChange('name')}
                 type="text"
                 value = {name}
                 placeholder="Enter name" 
                 className="form-control" />
            </div>

            <div className="form-group">
            <label>Mobile No.</label>
            <input onChange={handleChange('mobile')}
                   type="number" 
                   value = {mobile}
                   placeholder="Enter Mobile No" 
                   className="form-control" />
            </div>

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
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>       {/* ternoray opt =>if error is there then display otherwise none  */}
            {error}
        </div>
    )

    
    const redirectUser = () =>{
        if(redirectToReferrer){
           return <Redirect to="/signin" />;
        }
 
     }

    return(
        <Layout title="Signup Page" 
                className="container col-md-8 offset-md-2 mb-5">          
           <br/>
           {showError()}   

           {signupForm()}

           {redirectUser()}

           {/* {JSON.stringify(values)} */}
        </Layout>
        
    )}

export default Signup;