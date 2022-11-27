import React,{useState} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { createCategory } from './ApiAdmin';
import { Link } from 'react-router-dom';

const AddCategory= () =>{
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    //destructure user and token from localstorage
    const {user,token} = isAuthenticated();
  
    const handleChange = (e) =>{
        setError("");
        setName(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setError('');
        setSuccess(false);

        //make request to API to create category
        createCategory(user._id,token,{name}).then(data =>{
            if(data.error){
                setError(true);
            }
            else{
               setError("") ;
               setSuccess(true);
            }
        });

    };

    //category form
    const newCategoryForm = () =>(
        <form onSubmit={handleSubmit} className="mt-5"> 
            <div className="form-group">
                <label> Name</label>
                <input type="text" onChange={handleChange}
                       value={name} required autoFocus
                       className="form-control" 
                       placeholder="Enter Category">
                </input>
            </div>
            <button type="submit" className="btn btn-outline-success mr-">Create Category</button>
        </form>
    );

    //success
    const showSuccess = () =>{
        if (success) {
        return <h4 className="text-success">{name} is created..</h4>
        // return (
        //     <table className="table">
        //         <tr>
        //             <th>Category Name</th>
        //             <th>Update</th>
        //             <th>Delete</th>
        //         </tr>
        //         <tr>
                    
        //             <td>{name}</td>
        //         </tr>
        //     </table>
        // )
        }
    };

     //Error
     const showError = () =>{
        if (error){
        return <h4 className="text-danger">{error}</h4>
        }
    };

    //link for dashboard
   const goBack = () =>(
        <div className="mt-5 ">
            <Link to="/admin/dashboard" className="text-warning" style={{fontWeight:'bold',backgroundColor:'darkgreen',border:'solid 6px green'}}>Back To Dashboard</Link>
        </div>
   );

    return (
       
        <Layout>      
              <div className="container col-md-6 mt-4 offset-md-2 ">
               <h2>Add New Category</h2>
                   
                   {showError()}
                  {newCategoryForm()} 
                    <br/>
                  {showSuccess()}
                  {goBack()} 
                  <br/> <br/><br/><br/>
              </div>
      </Layout>
    
    )

}

export default AddCategory;