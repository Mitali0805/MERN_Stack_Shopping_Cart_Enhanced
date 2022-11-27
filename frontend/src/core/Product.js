import React,{useState,useEffect} from 'react';
import Layout from './Layout';

import { read , listRelated} from './apiCore';
import Cards from './Cards'

const Product = (props) =>{

    const [product,setProduct] = useState({})
    const [relatedProduct,setrelatedProduct] = useState([])
    const [error,setError] = useState(false)

    const loadSingleProduct = productId =>{
        read(productId).then(data =>{
            if(data.error) {
                setError(data.error);
            } else {
                setProduct(data);
               
                //fetch related products
                listRelated(data._id).then(data =>{
                    if(data.error) {
                        setError(data.error)
                    }else{
                        setrelatedProduct(data)
                    }
                })
            }
        })
    }


    //for grabbing productId from route parameters when component mount
    useEffect(() =>{
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    },[props])      //run useEffect whenever props(productId) changes

    return(
        <Layout  className="container-fluid">
            <h2 className="mb-4 mt-3" style={{fontFamily:'fantasy',textAlign:'center'}}>E-Shopping Zone</h2>
            <div className="row">
            <div className="col-6">
               { product && product.description && 
               <Cards product={product} 
               
               showAddToCartButton={true}  /> }
            </div>
            <div className="col-2"></div>
            <div className="col-4">
                <h4>Similar Products</h4>
                {relatedProduct.map((p,i) => (
                    <div className="mb-3">
                        <Cards key={i} product={p} showAddToCartButton={true}/>
                    </div>
                ))}
            </div>
            </div>
        </Layout>
       );
}

export default Product