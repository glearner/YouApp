import React from 'react';


let Search = (props)=>{
    return(
        <div  style={{margin:10}}>
          <input type="text" 
          placeholder="   Search Video Here"
           style={{margin:10,width:'40%'}}  
           onChange={props.change}/>
          <button
           type="button"
            className="btn btn-success"
             onClick={props.click}>Search</button>
          </div>
    );
}


export default Search;
