import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as loginAction from '../../redux/actions/loginAction';
class Ventas extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        
    }
    render(){
        return(
            <div className="container">
                <h1 className="text-center">Venta Diaria</h1>
                <h5 className="text-center">{this.props.usuario.nombre} {this.props.usuario.apellido} - {this.props.usuario.cargo}</h5>

                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapStateToProps = (reducers) =>{
    return reducers.loginReducers;
}
export default connect(mapStateToProps,loginAction) (Ventas); 
