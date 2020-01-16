import React, {Component} from 'react';
import Select from 'react-select';
import * as amortiguadoresAction from '../../redux/actions/amortiguadoresAction';
import {connect} from 'react-redux';
import { toast } from "react-toastify";
class IngresoProducto extends Component{
    constructor(props){
        super(props)
        this.state={

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e,event){
        if(event === undefined){
            e.persist();
            this.setState({
                [e.target.name]:e.target.value
            })
        }else{
            this.setState({
                [event.name] : e
            })
            if(event.name === "marca"){
                this.props.traerModelo(e.idMarca)
            }
        }
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.guardarProducto(this.state);
        var mensaje = this.props.amortiguadoresReducers.mensaje_producto;
        toast.success('producto Ingresado') 
    }
    componentDidMount(){
        this.props.traerMarca();
        this.props.traerPosicion();
        this.props.traerAnio();
        this.props.traerProveedor();
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="col-12">
                            <h1 className="text-center">Ingreso Producto</h1>
                            <hr></hr>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Codigo de barra</label>
                            <input type="text" className="form-control" placeholder="Codigo de barra" name="codigo_barra" value={this.state.codigo_barra} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>sku</label>
                            <input type="text" className="form-control" placeholder="Sku" name="sku" value={this.state.sku} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Precio Unidad</label>
                            <input type="text" className="form-control" placeholder="Precio unidad" name="precio_unidad" value={this.state.precio_unidad} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Marca</label>
                            <Select 
                                name="marca"
                                value={this.state.marca}
                                onChange={this.handleChange}
                                options={this.props.amortiguadoresReducers.marcas}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Modelo</label>
                            <Select 
                                name="modelo"
                                value={this.state.modelo}
                                onChange={this.handleChange}
                                options={this.props.amortiguadoresReducers.modelos}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Posicion</label>
                            <Select 
                                name="posicion"
                                value={this.state.posicion}
                                onChange={this.handleChange}
                                options={this.props.amortiguadoresReducers.posicion}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Año desde</label>
                            <Select 
                                name="anio_desde"
                                value={this.state.anio_desde}
                                onChange={this.handleChange}
                                options={this.props.amortiguadoresReducers.anio}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Año hasta</label>
                            <Select 
                                name="anio_hasta"
                                value={this.state.anio_hasta}
                                onChange={this.handleChange}
                                options={this.props.amortiguadoresReducers.anio}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Proveedor</label>
                            <Select 
                                name="proveedor"
                                value={this.state.proveedor}
                                onChange={this.handleChange}
                                options={this.props.amortiguadoresReducers.proveedor}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Tipo</label>
                            <input type="text" className="form-control" placeholder="Tipo" name="tipo" value={this.state.tipo} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Stock</label>
                            <input type="text" className="form-control" placeholder="Stock" name="stock" value={this.state.stock} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-4 text-center p-4">
                            <button className="btn btn-lg btn-primary">Ingresar</button>
                          
                        </div>
                        <div className="col-12"><hr></hr></div>
                    </div>
                </form>
                
            </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(IngresoProducto);