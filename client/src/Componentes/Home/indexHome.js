import React,{Component} from 'react';
import ModulosInicio from './modulosInicio';
import {connect} from 'react-redux';
import * as loginAction from '../../redux/actions/loginAction';
import { Link } from 'react-router-dom';

class IndexHome extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        
        
    }
    render(){
        
        return(
            <div className="">
                {this.props.usuario.rol !==undefined &&
                <ModulosInicio/>}
                {this.props.usuario.rol === undefined &&
                <Link className="list-group-item list-group-item-action" to='/'>Login</Link>}
            </div>
        )
    }
}
const mapStateToProps = (reducers) =>{
    return reducers.loginReducers;
  }
export default connect(mapStateToProps,loginAction) (IndexHome); 
