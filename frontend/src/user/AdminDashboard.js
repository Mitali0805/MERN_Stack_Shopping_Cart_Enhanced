import React from 'react';

import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index'
import { NavLink } from 'react-router-dom';

function AdminDashboard(){

    const {user:{_id,name,email,role}} = isAuthenticated();

    const adminLinks = () =>{
        return (
            <div className="card mb-5 mt-5">
                <h4 className="card-header bg-secondary">Admin</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <NavLink to="/create/category">Create Category</NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to="/create/product">Create Product</NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to="/admin/products">Manage Product</NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to="/admin/orders">View All Orders</NavLink>
                    </li>
                </ul>
            </div>
        )
    };

    const adminInfo =() =>{
     return(
      <div className="card mb-5 mt-5">
        <h3 className="card-header bg-secondary">Admin Information</h3>
        <ul className="list-group">
            <li className="list-group-item">{name}</li>
            <li className="list-group-item">{email}</li>
            <li className="list-group-item">{role === 0 ? 'User' : 'Admin'}</li>
        </ul>
      </div>
      )};

    return(
       <Layout className="container">
         <div className ="row">
             <div className="col-3 offset-1">
               {adminLinks()}  
             </div>

             <div className="col-7 mb-5">
                {adminInfo()}  
               <br/><br/><br/>
             </div>
         </div>
      </Layout>
    )
}

export default AdminDashboard;