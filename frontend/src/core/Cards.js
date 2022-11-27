import React,{useState,useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem,updateItem , removeItem} from './cartProcess'
import { Icon, InlineIcon } from '@iconify/react';
import shoppingCartOutlined from '@iconify/icons-ant-design/shopping-cart-outlined';


const Cards = ({
     product,
     showAddToCartButton = false,
     cartUpdate=false ,
     showRemoveProductButton = false,
     setRun = f => f, // default value of function
     run = undefined // default value of undefined 
    }) =>{
    const [count, setCount] = useState(product.count);
    const [redirect, setRedirect] = useState(false)
    
    const addToCart = () => {
        addItem(product,() =>{
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect =>{
        if(redirect) {
           return <Redirect to="/cart" /> 
        }
    }

    const showAddCartButton = (showAddToCartButton) =>{
       if( product.quantity > 0 ){
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className="btn btn-warning mt-3">
                   <Icon icon={shoppingCartOutlined} width="40px" />
                    Add to Cart
                </button>
            )
        )}
    };

    const showRemoveButton = (showRemoveProductButton) =>{
        return (
            showRemoveProductButton && (
                <button 
                    onClick={() => {
                      removeItem(product._id)
                      setRun(!run); // run useEffect in parent Cart
                    }} 
                    className="btn btn-danger mt-3 mb-2 ml-3" style={{width:'200px'}}>
                    Delete
                </button>
            )
        )
    }

    const showToStock = (quantity) =>{
       return quantity > 0 ?
          (<span className="badge badge-secondary badge-pill mb-4 ml-3" style={{width:'100px'}}>In Stock</span> 
       ) : (
           <span className="badge badge-danger badge-pill mb-4 ml-3" style={{width:'100px'}}>Out of Stock</span>
           );
       
     };

     const handleChange = (productId) => event => {
        setRun(!run); // run useEffect in parent Cart 
        setCount(event.target.value < 1 ? 1 : event.target.value)      //atleast 1 product is must
         if(event.target.value >= 1) {
             updateItem(productId,event.target.value)
         }
     }

    //  to incre/decre quantity
     const showCartUpdateOptions = cartUpdate => {
         return cartUpdate && <div>
             <div className="input-group mb-3 ml-2">
                 <div className="input-group-prepend">
                     <span className="input-group-text">Quantity</span>
                 </div>
                 <input type="number" className="form-control"style={{marginRight:'350px'}} 
                        value={count}
                        onChange={handleChange(product._id)}
                     />
             </div>
         </div>
     }


    return(
        <div className="card">
            {shouldRedirect(redirect)}
          <Link to= {`/product/${product._id}`}>   
               <div className="card-image">
               <ShowImage item={product} url="product" />
               </div>
         </Link>     
         <div className="card-header"><b>{product.name}</b></div>
        <div className="card-body">
           <p className="mt-2">
               {product.description.substring(0,500)}
           </p>
           <p>₹{product.price}</p>
           <p>Category:{product.category && product.category.name}</p>
         </div>

           {showToStock(product.quantity)}

           {showAddCartButton(showAddToCartButton)}   {/*Add to cart button */}

           {showCartUpdateOptions(cartUpdate)} 

           {showRemoveButton(showRemoveProductButton)}
    </div> 
        
    )
}

export default Cards


    
