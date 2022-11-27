import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { listOrders , getStatusValues, updateOrderStatus} from './ApiAdmin';
import { Link } from 'react-router-dom';
import moment from 'moment'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);  

//destructure
  const {user, token } = isAuthenticated()

  const loadOrders = () => {
    listOrders(user._id, token).then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            setOrders(data)
        }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            setStatusValues(data);
        }
    });
  };

  useEffect(() =>{
    loadOrders();
    loadStatusValues();
  },[])

  const showOrderslength = () => {
      if(orders.length > 0) {
          return (
          <h4 className="text-info display-4">Total Orders : {orders.length}</h4>
          )
      } else {
          return (
              <h2 className="text-danger display-2">No Orders</h2>
          )
      }
  };

  const showInput = (key,value) => (
     <div className="input-group mb-1 mr-sm-2">
         <div className="input-group-prepend mt-2">
             <div className="input-group-text">{key}</div>
         </div>
         <input type="text" value={value} className="form-control" readOnly />
     </div> 
  );

  const handleStatusChange = (event, orderId) => {
      //console.log('update order status')
      updateOrderStatus(user._id, token, orderId, event.target.value).then(data =>{
         if(data.error) {
             console.log('Status updated Failed')
         } else {
             loadOrders();
         }
      })
  }

  const showStatus = o => (
      <div className="form-group">
          <h6 className="mark mb-4">Status: {o.status}</h6>
          <select className="form-control"
                  onChange={(event) => handleStatusChange(event, o._id)}     
          >
              <option>Change Status</option>
               {statusValues.map((status,index) => (
                   <option key={index} value={status}>
                       {status}
                   </option>
               ))}
          </select>
      </div>
  )

  return (
       
    <Layout>      
          <div className="container col-md-6 mt-4 offset-md-2 ">
             {showOrderslength()}
           
            {orders.map((o, oIndex) => {
               return (
                   <div className="mt-5" key={oIndex} style={{borderBottom:'5px solid black'}}>
                       <h4 className="mb-5">
                            <span className="bg-secondary">Order ID: {o._id}</span>
                       </h4>

                       <table className="table">
                           <tr>
                               <th>Status</th>
                               <th>Transaction ID </th>
                               <th>Amount</th>
                               {/* <th>Ordered by</th> */}
                               <th>Ordered On</th>
                               <th>Delivery Address</th>
                               <th>User Feedback</th>
                            </tr>
                            <tr>
                               <td>{showStatus(o)}</td>
                               <td>{o.transaction_id}</td>
                               <td>₹{o.amount}</td>
                               {/* <td>{o.user.name}</td> */}
                               <td>{moment(o.createdAt).fromNow()}</td>
                               <td>{o.address}</td>
                               <td>{o.feedback}</td>
                            </tr>   
                      </table>
                      <h5>Total Products in order: {o.products.length }</h5>

                      {o.products.map((p,pIndex) =>(
                          <div className="mb-4" key={pIndex} style={{padding:"20px",border:"1px solid"}}>
                              {showInput('Product Name',p.name)}
                              {showInput('Product Price',p.price)}
                              {showInput('Product total',p.count)}
                              {showInput('Product ID',p._id)}
                          </div>
                      ))}
                   </div>
               ) 
            })}

          </div>
  </Layout>

)
}

export default Orders;

