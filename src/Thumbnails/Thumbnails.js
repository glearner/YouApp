import React from 'react';


let thumbnails = (props)=>{
  return  <div className="row thumbnail" style={{marginTop:15,cursor:'pointer'}}> 
                            <div className="col-md-6">
                                <img 
                                src={props.src} 
                                width="80%" height="100px" alt="..." 
                                onClick = {props.clicked}
                                className="img-responsive"/>
                             </div>
                            <div className="col-md-6">
                                    <p onClick={props.thumbnailed}>{props.title}</p>
                            </div>
                            <hr/>
                  </div>
}

export default thumbnails;