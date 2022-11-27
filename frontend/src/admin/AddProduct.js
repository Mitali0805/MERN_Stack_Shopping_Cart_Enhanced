import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { createProduct , getCategories } from './ApiAdmin';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


const AddProduct = () =>{
   
    //usestate
    const [values, setValues] = useState({
        name:'', description:'', price:'', shipping:'', quantity:'',
        photo:'', category:'', categories:[],
        loading:false, error:'',
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

     //load categories and set form data
     const init = () =>{
         getCategories().then(data =>{
             if(data.error){
                 setValues({...values,error:data.error})
             }else{
                 setValues({...values,
                            categories:data , 
                            formData:new FormData()
                        });
             }
         });
     };

     //lifecycle method
     useEffect(() =>{
         init();
     }, [])

     const handleChange = name => event =>{       //higher order fun
         const value = name === 'photo' ? event.target.files[0] : event.target.value;   // event.target.files[0] =>only one photo is uploaded
         formData.set(name,value);
         setValues({...values,[name]:value})
     };

     const handleSubmit = event =>{

        event.preventDefault();
        setValues({...values,error:"",loading:true});

        createProduct(user._id, token, formData).then(data =>{
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

             <button  type="submit" className="btn btn-outline-success">Create Product</button>
             
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
            <h4>{`${createdProduct}`} is created</h4>
        </div>
    )

    const redirectHome = () =>{
        if(redirectToProfile){
           return <Redirect to="/" />;
        }
 
     }

    //Loading
    const showLoading = () =>(
        loading && (<div className="alert alert-success"><h4>Loading..</h4></div>)
    )

    return(
        <Layout>      
              <div className="container col-md-8 mt-4 offset-md-2 ">
               <h2>Add New Product</h2>
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {redirectHome()}

                  {NewProductForm()} 
              </div>
      </Layout>
    )
}

export default AddProduct;