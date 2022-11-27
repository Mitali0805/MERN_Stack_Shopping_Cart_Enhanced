import React,{useState,useEffect} from 'react';
//matrial UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { getProducts , deleteProduct} from './ApiAdmin';
import { Link } from 'react-router-dom';

import { Icon, InlineIcon } from '@iconify/react';
import baselineDelete from '@iconify/icons-ic/baseline-delete';
import updateIcon from '@iconify/icons-mdi/update';
import editIcon from '@iconify/icons-zmdi/edit';



const ManageProducts = () => {
   
   const [products,setProducts] = useState([])

   const {user,token} = isAuthenticated()

   const [open, setOpen] = useState(false);
   const [opensnack, setOpenSnack] = useState(false);
   const [deleteProd, setDelete] = useState("")     //deleted product name
   const[deleteProdID,setDeleteID]=useState()

   const[ResponseMsg,SetResponseMsg]=useState("")  //snackbar msg
   
   const handleClickOpen = () => {
      setOpen(true);      
   };

   const handleClickOpenSnack = () => {
      setOpenSnack(true);      
   };

   const handleClose1 = () => {     //dialog box
      setOpen(false);
    };

   const handleClose = (event, reason) => {    //snack
      if (reason === 'clickaway') {
         return;
       }
       setOpenSnack(false);
   };


   const loadProducts = () =>{
      getProducts().then(data =>{
         if(data.error) {
            console.log(data.error)
         } else {
            setProducts(data)
         }
      })
   }

   const remove = (productid,productname)=>{
      setDeleteID(productid);  //delete dialog box
      setDelete(productname);  
   }

   const destroy = () => {
      deleteProduct(deleteProdID,user._id,token).then(data =>{
         if(data.error) {
            console.log(data.error)
         } else {
            console.log(data.message);            
            handleClose1();
            loadProducts();
            handleClickOpenSnack(true);
            SetResponseMsg(data.message)
        }
      });
   };
  
   function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
  
   useEffect(() =>{
    loadProducts();
   },[])

   return (
    <Layout title="Home Page" description="Node React Shopping Cart" className="container-fluid">
      <b style={{fontFamily:'fantasy',textAlign:'center',fontSize:'35px',backgroundColor:'grey',marginLeft:'500px'}}>Product Management</b>
       <div className="row">
          <div className="col-12">
             <h4 style={{color:'orange'}}>
                Total Products :{products.length}
             </h4>
             <table className="table table-striped">
                  {products.map((p,i) =>(
                      <tr key={i}>
                        <td>
                           <strong>{p.name}</strong>                           
                       </td>
                        <td>
                        <Link to={`/admin/product/update/${p._id}`}>
                              <span className="btn btn-info"><Icon width={20} icon={editIcon} /></span>
                           </Link>
                        </td>
                        {/* <td>
                               <span onClick={() => destroy(p._id,p.name)} className="btn btn-danger"><Icon width={20} icon={baselineDelete} /></span>
                        </td> */}
                        <td>                        
                           <span onClick={() =>{handleClickOpen();remove(p._id,p.name);}} className="btn btn-danger"><Icon width={20} icon={baselineDelete} /></span>
                         </td>
                         <Dialog
                           open={open}
                           onClose={handleClose1}
                           aria-labelledby="alert-dialog-title"
                        >                                                                   
                           <DialogTitle id="alert-dialog-title">{"Do you want to Delete "}{deleteProd}</DialogTitle>
                             <DialogActions>
                              <Button onClick={handleClose1} color="primary" autoFocus>
                                 No
                              </Button>
                              <Button onClick={() => destroy()} color="primary">
                                 Yes
                              </Button>
                           </DialogActions>
                        </Dialog>
                     </tr> 
                  ))}
             </table>
          </div>   
                     <Snackbar open={opensnack} autoHideDuration={6000} onClose={handleClose}>
                                 <Alert onClose={handleClose} severity="success">
                                   {ResponseMsg} 
                                 </Alert>
                     </Snackbar>                             
       </div>    
    </Layout>
   ) 
}

export default ManageProducts;