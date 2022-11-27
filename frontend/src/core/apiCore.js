import API from '../config'
import queryString from 'query-string'

//for accessing all products
export const getProducts = sortBy =>{
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=10`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
};

 
//for accessing all categories
export const getCategories = () =>{
    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
}

//filter product based on price &category
export const getFilteredProduct = (skip, limit,filters = {}) =>{
   const data = {
       limit , skip , filters
   }
    return fetch(`${API}/products/by/search`,{
         method:"POST" ,
         headers:{
            Accept:'application/json' ,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
         mode:"cors"
      })
      .then(response =>{
          return response.json()
      })
      .catch(err =>{
          console.log(err);
      })
  };

  //search product bar
  export const list = params =>{
     const query = queryString.stringify(params)  //querString =>to send query to backend
    
     console.log('query',query);
     return fetch(`${API}/products/search?${query}`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
};

//to read single product
export const read = (productId) =>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
}

//Braintree Token
export const getBraintreeClientToken = (userId, token) =>{
    return fetch(`${API}/braintree/getToken/${userId}`,{
        method:"GET",
        headers:{
            Accept:'application/json' ,
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
         }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
};

//payment process
export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json' ,
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
         },
         body: JSON.stringify(paymentData),
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
};

//create order
export const createOrder = (userId, token, createOrderData) => {
return fetch(`${API}/order/create/${userId}`,{
    method:"POST",
    headers:{
        Accept:'application/json' ,
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
     },
     body: JSON.stringify({order:createOrderData})
})
.then(response =>{
    return response.json();
})
.catch(err =>console.log(err));
};


//for accessing all related product
export const listRelated = (productId) =>{
    return fetch(`${API}/products/related/${productId}`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
}