import React,{useState,useEffect} from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import searchIcon from '@iconify/icons-fe/search';

import { getCategories , list} from './apiCore';
import Cards from './Cards'

const Search = () => {

    const [data,setData] = useState({
        categories: [],
        category:'',
        search:'',
        results:[],
        searched:false
    });

    //destructure data fields
    const { categories, category, search, results, searched} = data;

    const loadCategories = () =>{
        getCategories().then(data =>{
            if(data.error) {
                console.log(data.error)
            } else {
                setData({...data, categories:data})
            }
        })
    }

    //run loadCategories() whenever component mounts
    useEffect(()=>{
        loadCategories();
    }, []);

    const searchData = () =>{
        //console.log(search,category)
        if(search) {
            list({search: search || undefined, category:category})
            .then(response => {
                if(response.error) {
                    console.log(response.error)
                } else {
                    setData({...data, results: response ,searched:true})
                }
            });
        }

    };

    const handleSearch = (event) =>{
        event.preventDefault();
        searchData();
    };

    const handleChange = (name) => e =>{
        setData({...data, [name]:e.target.value, searched:false });
    };

    const searchMessage = (searched, results) => {
        if(searched && results.length > 0 ) {
            return `Found ${results.length} products`
        }
        if(searched && results.length < 1 ) {
            return `No products found`;
        } 
    }

    const searchedProducts = (results = []) =>{
        return(
            <div>
                <h5 className="mt-4 mb-4">
                    {searchMessage(searched,results)}
                </h5>
                <div className="row">
                {results.map((product,i) =>(
                    <Cards key={i} product={product}/>
                ))}
            </div>
            </div>
        )  
    };

    const searchForm =() =>(
        <form onSubmit={handleSearch}>
            <span className="input-group-text" style={{marginLeft:"115px",marginTop:'-42px',border:'5px solid #ffd900',height:'40px'}}>
             <div className="input-group input-group-sm">
                 <div className="input-group-prepend" style={{marginLeft:'-10px',marginRight:'-5px'}}>
                    <select className="btn mr-2" onChange={handleChange("category")}>
                        <option value="All">All categories</option>
                        {categories.map((c,i) =>(
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                        ))}
                    </select>
                 </div>

                <input 
                    type="search"
                    className="form-control mr-0" 
                    onChange={handleChange("search")}
                    style={{width:"500px",height:'34px'}}
                    />
             </div>
             <div className="btn input-group-append" style={{border:'none',marginLeft:'-12px',marginRight:'-25px'}}>
                 <button className="input-group-text mr-0" style={{backgroundColor:'#ffd900'}}>
                  <Icon icon={searchIcon} width="23px" height="23px" />
                 </button>
             </div>
            </span>
        </form>
    )

    return (
        <div className="row">
            <div className="container">
                {searchForm()}
                {/* {JSON.stringify(results)} */}
            </div>
            <div className="container col-3 mb-3">
                <br/>
                {searchedProducts(results)}
            </div>
        </div>
    )
}

export default Search;