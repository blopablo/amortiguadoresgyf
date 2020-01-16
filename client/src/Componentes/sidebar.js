import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as loginAction from '../redux/actions/loginAction';
const sideBar = (props) =>{
    return(
            <div className="col-2">
                <div className="list-group" id="list-tab" role="tablist">
                   <Link className="list-group-item list-group-item-action" to='/home'>Home</Link>
                   <Link className="list-group-item list-group-item-action" to='/caja'>Caja</Link>
                   {props.usuario.rol === '1' &&
                        <Link className="list-group-item list-group-item-action" to='/usuarios'>Usuarios</Link>
                    }
                </div>
            </div>
    )
}
const mapStateToProps = (reducers) =>{
    return reducers.loginReducers;
}
export default connect(mapStateToProps,loginAction) (sideBar); 
