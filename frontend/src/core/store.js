import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import Cards from './Cards';
import { getCategories , getFilteredProduct } from './apiCore';
import Checkbox from './Checkbox';
import { prices } from './priceRange'
import RadioButton from './RadioButton'
import ControlledCarousel from './Carousel';

const Store = () =>{
   const [prodFilters,setProdFilters] = useState({
      filters : { category: [], price: []}
   })
   const [categories,setCategories] = useState([]);
   const [error,setError]= useState(false);
   const [limit,setLimit]= useState(4);
   const [skip,setSkip]= useState(0);
   const [size,setSize]= useState(0);
   const [filteredResults,setfilteredResults]= useState([]);
   
    //load categories and set form data
    const init = () =>{
      getCategories().then(data =>{
          if(data.error){
             setError(data.error)
          }else{
              setCategories(data)
          }
      });
  };

  
  const loadFilteredResults = (newFilters) =>{
   //console.log(newFilters)
   getFilteredProduct(skip,limit,newFilters).then(data =>{
      if(data.error) {
         setError(data.error)
      } else {
         setfilteredResults(data.data);
         setSize(data.size);
         setSkip(0)
      }
   })
};

//loading more products
const loadMore = () =>{
   let toSkip = skip + limit;
   //console.log(newFilters)
   getFilteredProduct(toSkip,limit,prodFilters.filters).then(data =>{
      if(data.error) {
         setError(data.error)
      } else {
         setfilteredResults([...filteredResults,...data.data]);
         setSize(data.size);
         setSkip(toSkip)
      }
   });
};

  const loadMoreButton = () =>{
     return (
        size >0 && size >= limit && (
           <button onClick={loadMore} className="btn btn-success mb-5 ml-5" >Load more</button>
        )
     )
  }

  //when component mount
   useEffect(()=>{
      init();
      loadFilteredResults(skip , limit ,prodFilters.filters );
   }, []);


   const handleFilters = (filters,filterBy) =>{
      //console.log("STORE",filters,filterBy);
      const newFilters = {...prodFilters}
      newFilters.filters[filterBy] = filters;

      if(filterBy == "price") {
         let priceValues = handlePrice(filters)
         newFilters.filters[filterBy] = priceValues;
      }
      loadFilteredResults(prodFilters.filters)
      setProdFilters(newFilters);
   }

   //for returning price array
   const handlePrice = value =>{
      const data = prices
      let array = []

      for(let key in data) {
         if(data[key]._id === parseInt(value)) {
            array = data[key].array
         }
      }
      return array;
   };

    return(
        <Layout title="Home Page" description="Node React Shopping Cart" className="container-fluid">
              <ControlledCarousel />
             <div className="row">
                  {/* category filter */}
                 <div className="col-2" style={{marginTop:'100px'}}>
                    <h5 className="text-secondary" style={{fontFamily:'fantacy'}}>Category</h5>
                    <ul>
                    <Checkbox categories={categories}
                              handleFilters={filters=>
                                   handleFilters(filters,'category')}/>
                    </ul>

                    {/* price filter */}
                    <h5 className="text-secondary" style={{fontFamily:'fantacy'}}>Price Range</h5>
                     <div>
                     <RadioButton prices={prices}
                                 handleFilters={filters=>
                                    handleFilters(filters,'price')}/>
                     </div>
                 </div>

                     {/* vertical line */}
                  <div className="mt-3" style={{borderLeft:'1px solid grey',height:'800 px',marginLeft:'1px'}} />
                 
                   <div className="col-9" style={{marginTop:'50px'}} >
                    {/* <h3 className="mb-4 mt-3" style={{fontFamily:'fantasy'}}>Products</h3> */}
                     <div className="row">
                        
                        {filteredResults.map((product,i) =>(
                            <div  key={i} className="col-3 mb-3">
                               <Cards  key={i} product={product}/>
                            </div>
                        ))}
                     </div>
                     <hr/>
                     {loadMoreButton()}
                   </div>
            </div>        
        </Layout>
       );

};

export default Store;