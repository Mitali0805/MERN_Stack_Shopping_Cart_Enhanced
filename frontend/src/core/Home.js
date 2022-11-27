import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import {Nav,Navbar} from 'react-bootstrap'

import { getProducts } from './apiCore';
import Cards from './Cards'
import Search from './Search';

function Home(){
   const [productsBySell,setproductsBySell] = useState([]);
   const [productsByArrival,setproductsByArrival] = useState([]);
   const [error,setError] = useState(false);

   const loadProductsBySell = () => {
      getProducts('sold').then(data =>{
         if(data.error) {
            setError(data.error)
         } else {
            setproductsBySell(data)
         }
      })
   };

   const loadProductsByArrival = () => {
      getProducts('createdAt').then(data =>{
         if(data.error) {
            setError(data.error)
         } else {
            setproductsByArrival(data)
         }
      })
   };

   //run above 2 method when component mount
   useEffect(()=>{
      loadProductsByArrival()
      loadProductsBySell()
   },[])

   return(
    <Layout title="Home Page" description="Node React Shopping Cart" className="container-fluid">
          <b className="text-Success" style={{fontFamily:'fantasy',fontSize:'30px',backgroundColor:'grey',padding:'5px'}}>E-Shopping Zone</b>
          <Search/>
       
      {/* New Arrival */}
       <h3 className="mb-4 mt-5" style={{fontFamily:'revert'}}>New Arrivals</h3>
           <div className="row" style={{marginLeft:"100px"}}>
           {productsByArrival.map((product,i) =>(
              <div  key={i} className="col-3 mb-3">
                 <Cards product={product}/>
               </div>  
            ))}
           </div>

      {/* Best Sellers */}
      <h3 className="mb-4" style={{fontFamily:"revert"}}>Best Sellers</h3>
         <div className="row" style={{marginLeft:"100px"}}>
           {productsBySell.map((product,i) =>(
              <div  key={i} className="col-3 mb-3">
              <Cards product={product}/>
            </div>
            ))}
          </div>  
    </Layout>
   );
}

export default Home;