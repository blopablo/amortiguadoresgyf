import React, { Component } from 'react';
import Spinner from '../lib/Spinner';
import * as amortiguadoresAction from '../../redux/actions/amortiguadoresAction';
import {connect} from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import ModalEditarProducto from '../lib/modal_editar_producto';

class Productos extends Component{
    constructor(){
        super()
        this.state = {proveedor:'',
                    marca: '',
                    modelo: '',
                    show:false,
                datos:{}}
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        this.props.traerProveedor();
    }
    showModal = (e,datos) => {
        this.setState({ datos:datos,show: true });     
               
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };
    mostrarAmortiguadores(){
        if(this.props.amortiguadoresReducers.cargando){
             return <Spinner />;
         }else
        if (this.props.amortiguadoresReducers.amortiguadores.length === 0){
            return(
             <div className="text-center">
             <h3>no hay amortiguadores con esa descripcion</h3>
             </div>
            );
        }
    }
    handleSubmit(e,datos){
        e.preventDefault();
        this.props.editarAnio(this.state,datos.id)
        toast.success('editado con exito')
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
            
            if(event.name === "proveedor"){
                this.setState({
                    modelo:'',
                    marca:''
                })
            }
            if(event.name === "marca"){
                this.props.traerModelo(e.idMarca)
                this.setState({
                    modelo:''
                })
            }
            
            
        }
    }
    buscar(e){
        e.preventDefault();
        this.props.buscar(this.state);
        
    }
    render(){
        return(
            <div className="row">
                <div className="form-group col-md-3">
                    <label>Proveedor</label>
                    <Select 
                        name="proveedor"
                        value={this.state.proveedor}
                        onChange={this.handleChange}
                        options={this.props.amortiguadoresReducers.proveedor}
                    />
                </div>
                <div className="form-group col-md-3">
                    <label>Marca</label>
                    <Select 
                        name="marca"
                        value={this.state.marca}
                        onChange={this.handleChange}
                        options={this.props.amortiguadoresReducers.marcas}
                    />
                </div>
                        
                <div className="form-group col-md-3">
                    <label>Modelo</label>
                    <Select 
                        name="modelo"
                        value={this.state.modelo}
                        onChange={this.handleChange}
                        options={this.props.amortiguadoresReducers.modelos}
                    />
                </div>
                <div className="form-group col-md-3 p-4">
                    <button className="btn btn-primary" onClick={this.buscar.bind(this)}>Buscar</button>
                </div>
                {this.props.amortiguadoresReducers.cargando === true&&
                <Spinner/>}
                {this.props.amortiguadoresReducers.amortiguadores.length === 0 &&
                     <div className="text-center col-12">
                     <h3>no hay amortiguadores con esa descripcion</h3>
                     </div>
                }
                {this.props.amortiguadoresReducers.amortiguadores.length > 0 &&
                    <table className="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Precio Par</th>
                        <th scope="col">Año Desde</th>
                        <th scope="col">Año Hasta</th>
                        <th scope="col">Posición</th>
                        <th scope="col">Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.props.amortiguadoresReducers.amortiguadores.map((datos,key)=>{
                   
                        return(
                            
                        <tr key={key}>
                        <th ><img src={require('../../img/'+datos.img_provedor)} alt="Foto_proveedor"/></th>
                        <td>{datos.marca}</td>
                        <td>{datos.modelo}</td>
                        <td>{Math.round(datos.precio_unitario)}</td>
                        <td>{Math.round(datos.precio_par)}</td>
                        <td>{datos.anio_desde === null &&
                            <input type="number" className="form-control" value={datos.anio_desde} name="anio_desde" onChange={this.handleChange}/>
                            }{datos.anio_desde !== null &&
                                datos.anio_desde
                            }</td>
                        <td>{datos.anio_hasta === null &&
                                <input type="number" className="form-control" value={datos.anio_hasta} name="anio_hasta" onChange={this.handleChange}/>
                            }
                           {datos.anio_hasta !== null &&
                                datos.anio_hasta
                            }</td>
                        <td>{datos.forma}</td>
                        <td>{datos.tipo}</td>
                        <td><button className="btn btn-primary" onClick={e=>this.handleSubmit(e,datos)}>Guardar</button>
                        <button className="btn btn-success mt-1" onClick={e=>this.showModal(e,datos)}>Editar</button></td>
                        
                      </tr>
                      
                      )
                      
                    })}
                       
                    </tbody>
                  </table>
                }
              
              <ModalEditarProducto state={this.state} hideModal={this.hideModal}/>
              
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
export default connect(mapStateToProps,mapDispatchToProps)(Productos);