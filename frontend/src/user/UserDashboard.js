import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index'
import { NavLink } from 'react-router-dom';
import {getPurchaseHistory,getFeedback,updateFeedback} from './apiUser'
import data from '@iconify/icons-ant-design/shopping-cart-outlined';

function Dashboard(){

    const [history , setHistory] = useState([])
    const [feedbackValue, setFeedback] = useState([]);  


    const {user:{_id,name,email,role}} = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId,token).then(data =>{
            if(data.error) {
                console.log(data.error);
            } else {
               setHistory(data)  
            }
        })
    }

    const loadFeedback = () => {
        getFeedback(_id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setFeedback(data);
            }
        });
      };     

      
    useEffect(()=>{
        init(_id, token);
        loadFeedback();
    },[])

    const handleFeedbackChange = (event,orderId) =>{
        console.log('update feedback');
        updateFeedback(_id, token, orderId, event.target.value).then(data =>{
            if(data.error) {
                console.log('Status updated Failed')
            } else {
                init(_id,token);                           }
         })
      };

      const showFeedback = (o) => (         
          <div className="form-group">
             <h6 className="mark mb-4">Feedback:{o.feedback}</h6>
              <textarea className="form-control" 
              onChange={(event) => handleFeedbackChange(event, o._id)} 
              />
               {/* <option>Update Feedback</option> 
               {feedbackValue.map((feedback,index) => (
                  <option key={index} value={feedback}>
                      {feedback}
                 </option>
                 ))} */}
            {/* </select> */}
        </div>    
        
      )

    const userLinks = () =>{
        return (
            <div className="card mb-5 mt-5">
                <h4 className="card-header bg-secondary">User</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        {/* <NavLink to="/profile/update">My Profile</NavLink> */}
                        <NavLink to={`/profile/${_id}`} activeStyle={{textDecoration:'none', color:'navy',fontSize:'20px'}}>My Profile</NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to="/cart">My Cart</NavLink>
                    </li>
                </ul>
            </div>
        )
    };

    const userInfo =() =>{
     return(
      <div className="card mb-5 mt-5">
        <h3 className="card-header bg-secondary">User Information</h3>
        <ul className="list-group">
            <li className="list-group-item"><h6>{name}</h6></li>
            <li className="list-group-item"><h6>{email}</h6></li>
            <li className="list-group-item"><h6>{role === 0 ? 'User' : 'Admin'}</h6></li>
        </ul>
      </div>
      )};

      const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header bg-secondary">My Orders</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div style={{backgroundColor:'azure'}}>
                                    <hr />
                                    <h6>Order ID: {h._id} </h6>
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ₹{p.price}
                                                </h6>
                                           </div>
                                        );
                                    })}
                                    <h6>Purchased date: { h.createdAt} </h6>
                                    <h6>Status: { h.status} </h6> 
                                    {h.status=="Delivered"? <h6>{showFeedback(h)}</h6> : '' }       {/**If order is delivered then only u can give feedback */}
                                 </div> 
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };
    

    return(
       <Layout className="container">
         <div className ="row">
             <div className="col-3 offset-1">
               {userLinks()}  
             </div>

             <div className="col-7">
                {userInfo()}  
                {purchaseHistory(history)}  
             </div>
         </div>
      </Layout>
    )
}

export default Dashboard;