import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';

const PrivateRoute = ({component:Component,...rest}) =>(
    <Route 
       {...rest} 
       render={props => 
           isAuthenticated() ? (                    //if authenticated we return components with props
              <Component {...props}/>
     ) : (
            <Redirect                               //otherwise redirect to signin
               to={{
                   pathname:"/signin",
                   state:{from:props.location}
                }}
             />
    )
   } 
 />
);

export default PrivateRoute;