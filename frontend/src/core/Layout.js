import React from 'react';
import Menu from './Menu'
import '../index.css'

function Layout({description="Description",className,children}){
   return(
    <div>
        <Menu/>
       {/* <h2 className="container col-md-8 offset-md-4">{title}</h2> */}
        <div className={className}>{children}</div>
     </div> 
   )}

export default Layout;