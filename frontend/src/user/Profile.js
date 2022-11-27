import React, { useState , useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index'
import { NavLink, Redirect } from 'react-router-dom';
import { read , update , updateUser} from './apiUser'

const Profile = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        email:'',
        password: '',
        error: false,
        success: false
    });

    const {token} = isAuthenticated();
    const {name, email , password , error , success} = values;

    const init = (userId) => {
        //console.log(userId)
        read(userId,token).then(data => {
            if(data.error) {
                setValues({...values, error: true})
            } else {
                setValues({...values,name: data.name, email: data.email})        //prepopulating user's existing info
            }
        })
    }

    useEffect(() => {
        init(match.params.userId);      // to grab userId from router
    }, []);

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, {name, email, password}).then(data =>{
            if(data.error) {
                console.log(data.error)
            } else {
                updateUser(data, () =>{
                    setValues({
                        ...values,
                        name:data.name,
                        email:data.email,
                        success: true
                    });
                });                   //set info in  local storage
            }
        });
    };

    const redirectUser = (success) => {
        if(success) {
            return <Redirect to ="/cart" />
        }
    }

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    type="text" 
                    onChange={handleChange("name")} 
                    className="form-control" 
                    value={name} 
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    type="text" 
                    onChange={handleChange("email")} 
                    className="form-control" 
                    value={email} 
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    type="text" 
                    onChange={handleChange("password")} 
                    className="form-control" 
                    value={password} 
                />
            </div>
            <button onClick={handleSubmit} className="btn btn-success">Submit</button>
        </form>
    )

    return(
        <Layout title="Home Page" description="Node React Shopping Cart" className="container-fluid">     
           <div className="container col-md-8 mt-4 offset-md-2 ">
                <h2>Profile Update</h2> 
                    {profileUpdate(name, email, password)}
          </div>
          {redirectUser(success)}
        </Layout>
       );


};

export default Profile;
