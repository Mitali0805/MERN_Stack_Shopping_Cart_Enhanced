import React,{Fragment} from 'react'
import{ signout,isAuthenticated } from '../auth/index'

import {NavLink,withRouter} from 'react-router-dom'
import {Nav,Navbar} from 'react-bootstrap'
import { Icon, InlineIcon } from '@iconify/react';
import shoppingCartOutlined from '@iconify/icons-ant-design/shopping-cart-outlined';
import {itemTotal} from './cartProcess'
import './Menu.css'

function Menu ({history}){  
       return(
        <div>
             <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
             {/* <Navbar.Brand><Icon icon={shoppingCartOutlined} width="40px" /></Navbar.Brand> */}
                <Navbar.Brand className="active">
                    <NavLink to="/" exact strict activeStyle={{color:'black',fontWeight:'bolder'}} style={{color:'white',textDecoration:'none'}}>Home</NavLink>
                </Navbar.Brand>

                <Navbar.Brand className="active">
                    <NavLink to="/store" exact strict activeStyle={{color:'black',fontWeight:'bolder'}} style={{color:'white',textDecoration:'none'}}>E-Store</NavLink>
                </Navbar.Brand>
                    
                {/* To check for User */}
                <Nav className="mr-auto">
                <Navbar.Brand>    
                    { isAuthenticated() && isAuthenticated().user.role === 0 && (
                        
                        <NavLink to="/user/dashboard" exact strict activeStyle={{color:'black',fontWeight:'bolder'}} style={{color:'white',textDecoration:'none'}}>{isAuthenticated().user.name}</NavLink>
                    
                    )}
                </Navbar.Brand>

                {/* To check for Admin */}        
                <Navbar.Brand>    
                    { isAuthenticated() && isAuthenticated().user.role === 1 && (
                        
                        <NavLink to="/admin/dashboard" exact strict activeStyle={{color:'black',fontWeight:'bolder'}} style={{color:'white',textDecoration:'none'}}>Admin</NavLink>
                    
                    )}
                </Navbar.Brand>
              </Nav>  
            
               <Nav>                         
                 <Navbar.Collapse id="responsive-navbar-nav">
                    {! isAuthenticated() &&(
                        <Fragment>
                            <Navbar.Brand >
                                <NavLink to="/signin" exact strict activeStyle={{color:'black',fontWeight:'bolder'}} style={{color:'white',textDecoration:'none'}}>Signin</NavLink>
                            </Navbar.Brand>
                            <Navbar.Brand>
                                <NavLink to="/signup" exact strict activeStyle={{color:'black',fontWeight:'bolder'}} style={{color:'white',textDecoration:'none'}}>Signup</NavLink>
                            </Navbar.Brand>
                        </Fragment>
                    )}
                    
                    { isAuthenticated() && (
                        <Navbar.Brand>
                            <span onClick={() => 
                            signout(() =>{
                                history.push("/");
                            })
                            } 
                                exact strict
                                activeStyle={{color:'black',fontWeight:'bolder'}} 
                                style={{cursor:'pointer',color:'white'}}>Signout</span>
                       </Navbar.Brand>
                    )}
                    
                    {/* cart */}
                    {/* { isAuthenticated() && ( */}
                     <Navbar.Brand className="active">
                       <NavLink to="/cart" exact strict activeStyle={{color:'black',fontWeight:'bolder'}} style={{color:'white',textDecoration:'none'}}>
                          <Icon icon={shoppingCartOutlined} width="40px" />
                            <sup>{itemTotal()}</sup>  
                       </NavLink>
                     </Navbar.Brand>
                      {/* )}    */}
                </Navbar.Collapse>
            </Nav>
        </Navbar>         
         
        </div>
    )
}

export default withRouter(Menu)