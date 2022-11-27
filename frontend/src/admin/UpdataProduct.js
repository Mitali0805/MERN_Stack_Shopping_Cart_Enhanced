import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { getProduct , getCategories ,updateProduct} from './ApiAdmin';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


const UpdateProduct = ({match}) =>{
   
    //usestate
    const [values, setValues] = useState({
        name:'', description:'', price:'', shipping:'', quantity:'',
        photo:'', category:'', categories:[],
        loading:false, error:false,
        createdProduct:'',
        redirectToProfile:false,
        formData:''
    });

    //destructure
    const { user, token} = isAuthenticated();
    const
     {   name, description, price, shipping, quantity,
        category, categories,
        loading, error,
        createdProduct,
        redirectToProfile,
        formData
     } = values;

     const init = (productId) => {
         getProduct(productId).then(data =>{
             if(data.error) {
                 setValues({...values, error: data.error})
             } else {
                //populate the state 
                setValues({
                    ...values,
                    name:data.name,
                    description:data.description,
                    price:data.price,
                    category:data.category,
                    shipping:data.shipping,
                    quantity:data.quantity,
                    formData: new FormData()
                })
                //load Categories
                initCategories();
             }
         })
     }

     //load categories and set form data
     const initCategories = () =>{
         getCategories().then(data =>{
             if(data.error){
                 setValues({...values,error:data.error})
             }else{
                 setValues({
                            categories:data , 
                            formData:new FormData()
                        });
             }
         });
     };

     //lifecycle method
     useEffect(() =>{
         init(match.params.productId);
     }, [])

     const handleChange = name => event =>{       //higher order fun
         const value = name === 'photo' ? event.target.files[0] : event.target.value;   // event.target.files[0] =>only one photo is uploaded
         formData.set(name,value);
         setValues({...values,[name]:value})
     };

     const handleSubmit = event =>{

        event.preventDefault();
        setValues({...values,error:"",loading:true});

       updateProduct(match.params.productId,user._id, token, formData).then(data =>{
            if(data.error) {
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    name:'',
                    description:'',
                    photo:'',
                    price:'',
                    quantity:'',
                    loading:false,
                    redirectToProfile:true,
                    error:false,
                    createdProduct: data.name
                });
            }
        });

     };

     const NewProductForm = () =>(

         <form className="mb-3" onSubmit={handleSubmit}>
             <div className="form-group">
                <label>Product Name</label>
                <input onChange={handleChange('name')} 
                       type="text" value={name} 
                       className="form-control"
                />
             </div>

             <div className="form-group">
                <b>Product Image</b> <br/>
                <label className="btn btn-success">
                <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
             </div>   


             <div className="form-group">
                <label>Product Description</label>
                <textarea onChange={handleChange('description')} 
                        name="description" value={description} 
                       className="form-control"
                />
             </div>

             <div className="form-group">
                <label>Price</label>
                <input onChange={handleChange('price')} 
                       type="number"  value={price} 
                       className="form-control"
                />
             </div>

             <div className="form-group">
                <label>Product Category</label>
                <select onChange={handleChange('category')} 
                        className="form-control"
                >
                    <option>Select category</option>
                         {categories && 
                            categories.map((c,i) =>(
                              <option key={i} value={c._id}>{c.name}</option>
                        ))}

                </select>    
             </div>

             <div className="form-group">
                <label>Quantity</label>
                <input onChange={handleChange('quantity')} 
                       type="number" value={quantity} 
                       className="form-control"
                />
             </div>

             <div className="form-group">
                <label>Shipping</label>
                <select onChange={handleChange('shipping')} 
                        className="form-control" 
                >
                    <option>Select Shipping option</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>    
                </select>    
             </div>

             <button  type="submit" className="btn btn-outline-success">Update Product</button>
             
         </form>
     );
     
     //Error
     const showError = () =>(
         <div className="alert alert-danger" style={{display:error ? '' : 'none'}}>
             {error}
         </div>
     )

     //Success
     const showSuccess = () =>(
        <div className="alert alert-success" style={{display:createdProduct ? '' : 'none'}}>
            <h4>{`${createdProduct}`} is updated</h4>
        </div>
    )

    const redirectHome = () =>{
        if(redirectToProfile){
            if(!error){
           return <Redirect to="/" />;
        }
      } 
     }

    //Loading
    const showLoading = () =>(
        loading && (<div className="alert alert-success"><h4>Loading..</h4></div>)
    )

    return(
        <Layout>      
              <div className="container col-md-8 mt-4 offset-md-2 ">
               <h2>Update Product</h2>
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {redirectHome()}

                  {NewProductForm()} 
              </div>
      </Layout>
    )
}

export default UpdateProduct;