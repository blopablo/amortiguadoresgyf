import React from 'react';
import {Link} from 'react-router-dom';
const sideBar = () =>{
    return(
            <div className="col-2">
                <div className="list-group" id="list-tab" role="tablist">
                   <Link className="list-group-item list-group-item-action" to='/'>Home</Link>
                </div>
            </div>
    )
}

export default sideBar;