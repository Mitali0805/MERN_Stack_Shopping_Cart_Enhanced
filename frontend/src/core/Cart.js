import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import { getCart } from './cartProcess';
import Cards from './Cards'
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

const Cart = () =>{
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);      //to avoid infinite loop

    useEffect(()=>{                             //when change in items useEffect run
        setItems(getCart());
    },[run]);

    //show items from local storage
    const showItems = items => {
        return (
            <div>
                <h4 className="mt-2">Total Items:{`${items.length}`}</h4>
                <hr/>
                {items.map((product,i) => (
                  <Cards 
                      key={i} 
                      product={product}
                      cartUpdate = {true}    //to update quantity
                      showRemoveProductButton = {true}
                      setRun={setRun}
                      run={run}
                  />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h5 className="mt-2">Your Cart is Empty<br/><br/>
          <Link to="/store">Continue Shopping Here...</Link>
        </h5>
    )

    return(
        <Layout description="Node React Shopping Cart" className="container-fluid">
           <div className="row">
              <div className="col-5">
                  {items.length > 0 ? showItems(items) : noItemsMessage()}
              </div>
                <div className="col-1" style={{borderLeft:'2px solid grey',height:'800 px',marginLeft:'150px'}}></div>
              <div className="col-3">
                <h3 className="mt-2">Cart Summary</h3>
                <hr/>
                <Checkout setRun={setRun} products={items}/>
              </div>
           </div>
        </Layout>
       );
};

export default Cart;