import React ,{Component} from 'react';
import * as amortiguadoresAction from '../../redux/actions/amortiguadoresAction';
import {connect} from 'react-redux';
class Home extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.traerMarca();
        this.props.traerPosicion();
        this.props.traerAnio();
        this.props.traerProveedor();
    }
    
    
    render(){
        
        return (
           <div><img src={require('../../img/iconos/logo_G&F.png')}style={{width:"100%"}}/></div>
        )
    }
}
const mapStateToProps = ({amortiguadoresReducers}) =>{
    return {
        amortiguadoresReducers
    };
}
const mapDispatchToProps = {
    ...amortiguadoresAction
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);
