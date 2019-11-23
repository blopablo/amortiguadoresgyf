import React, {Component} from 'react';
import Select from 'react-select';
import * as amortiguadoresAction from '../../redux/actions/amortiguadoresAction';
import {connect} from 'react-redux';
class IngresoProducto extends Component{
    constructor(props){
        super(props)
        this.state={

        }
        this.handleChange = this.handleChange.bind(this);
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
    componentDidMount(){
        this.props.traerMarca();
        this.props.traerPosicion();
        this.props.traerAnio();
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
                            <input type="text" className="form-control" placeholder="Sku"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Precio Unidad</label>
                            <input type="text" className="form-control" placeholder="Precio unidad"/>
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
                            <label>Tipo</label>
                            <input type="text" className="form-control" placeholder="Tipo" value={this.state.tipo} onChange={this.handleChange
                            }/>
                        </div>
                        <div className="form-group col-md-12 text-center">
                            <button className="btn btn-lg btn-primary">Ingresar</button>
                            <hr></hr>
                        </div>
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