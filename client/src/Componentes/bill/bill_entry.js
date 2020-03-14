import React, { Component } from 'react';
import Spinner from '../lib/Spinner';
import * as billAction from '../../redux/actions/billAction';
import * as amortiguadoresAction from '../../redux/actions/amortiguadoresAction';
import {connect} from 'react-redux';
import {Table, Form, RButtom, ThemeProvider} from 'react-bootstrap';
import Select from 'react-select';
import { toast } from 'react-toastify';

class bill_entry extends Component{
    constructor(props){
        super(props)
        this.state={
            marca:[{value:'',label:''}],
            modelo:[{value:'',label:''}],
            anio:[{value:'',label:''}],
            anio_desde:[{value:'',label:''}],
            posicion:[{value:'',label:''}],
            date_moment:new Date(),
            data_product:{id_product:'',count:0},
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.check_list= this.check_list.bind(this);
        this.handleChangeCant = this.handleChangeCant.bind(this);
    }
    componentDidMount(){
        this.props.traerMarca();
        this.props.traerPosicion();
        this.props.traerAnio();
        this.props.traerPosicionCompra();
    }
    handleChange(e,event){
        if(event === undefined){
            e.persist();
            this.setState({
                [e.target.name]:e.target.value
            })
        }else{
            if(event.name === "marca"){
                this.setState({ marca:[{value:'',label:''}],
                modelo:[{value:'',label:''}],
                anio:[{value:'',label:''}],
                anio_desde:[{value:'',label:''}],
                posicion:[{value:'',label:''}]})
                this.props.traerModelo(e.idMarca)
                
            }
            this.setState({
                [event.name] : e
            })
           
        }
    }
    handleSubmit(e){
        e.preventDefault();
        
            let filter={
                id_modelo: this.state.modelo.id_modelo,
                id_marca: this.state.marca.idMarca,
                id_anio: this.state.anio_desde.value,
                id_posicion: this.state.posicion.id
            }
            
            if( !filter.id_marca && !filter.id_modelo && !filter.id_anio && !filter.id_posicion){
                return toast.error('debe ingresar datos para buscar');
            }
            if (filter.id_marca && !filter.id_modelo && !filter.id_anio && !filter.id_posicion){
                
                this.props.filtrado(this.state.marca.value);
            }
             if(filter.id_marca && filter.id_modelo && !filter.id_anio && !filter.id_posicion){
             
                this.props.filtrado(`${this.state.marca.value}-${this.state.modelo.value}`);
            }
             if(filter.id_marca && filter.id_modelo && filter.id_anio && !filter.id_posicion){
               
                this.props.filtrado(`${this.state.marca.value}-${this.state.modelo.value}-${this.state.anio_desde.value}`);
            }
             if(filter.id_marca && filter.id_modelo && filter.id_anio && filter.id_posicion){
               
                this.props.filtrado(`${this.state.marca.value}-${this.state.modelo.value}-${this.state.anio_desde.value}-${this.state.posicion.id}`);
            }
        
        
    }
    onSubmit(e){
        e.preventDefault();
        
        this.props.add_bill(this.state);
        this.setState({ marca:[{value:'',label:''}],
        modelo:[{value:'',label:''}],
        anio:[{value:'',label:''}],
        anio_desde:[{value:'',label:''}],
        posicion:[{value:'',label:''}],
        description:'',
        date_bill:'',
        number_factura:''})
        
    }
    check_list(e){
        if(e.target.checked){
           this.props.amortiguadoresReducers.amortiguadores_venta.forEach((element,key) => {
            if (key === parseInt(e.target.name)) {
                this.props.billReducers.bill_product.push(element);
            }
           });
           this.props.add_product()
        }else if(!e.target.checked){
            let id_eliminar = 0;
            this.props.amortiguadoresReducers.amortiguadores_venta.forEach((element,key) => {
                if (key === parseInt(e.target.name)) {
                   id_eliminar = element.id;
                }
               });
            const index = this.props.billReducers.bill_product.indexOf(id_eliminar);    
            this.props.billReducers.bill_product.splice(index,1);
            this.props.add_product();
        }
      
    }
    handleChangeCant(e){
        e.persist();
        let id_cant = 0;
        this.props.amortiguadoresReducers.amortiguadores_venta.forEach((element,key) => {
            if (key === parseInt(e.target.name)) {
                id_cant = element.id;
            }
           });
           this.props.billReducers.bill_product.forEach((element,key) => {
            if (element.id === id_cant) {
               element.canti = e.target.value;
               this.props.add_product();
            }
           });
    }
    render(){
        return(

            <div className="p-4 container" id="myTabContent">
                 <form className="form-horizontal form-label-left" onSubmit={this.onSubmit}>
                    <div className="form-row">
                    <div className="col-12 col-md-12 pb-2">
                            <h2 className="text-center">Datos Factura</h2>
                            <hr></hr>
                        </div>
                        <div className="col-6 col-md-6 pb-2">
                            <label>Numero de Factura</label>
                            <input type="text" name="number_factura" onChange={this.handleChange} className="form-control" placeholder="Numero Factura"/>
                        </div>
                        <div className="col-6 col-md-6 pb-2">
                            <label>Descripción</label>
                            <input type="text" name="description" onChange={this.handleChange} className="form-control" placeholder="descripcion"/>
                        </div>
                        <div className="col-6 col-md-6 pb-2">
                            <label>Fecha de la factura</label>
                            <input type="date" name="date_bill" onChange={this.handleChange} className="form-control" placeholder="descripcion"/>
                        </div>
                        <div className="col-6 col-md-6 pb-2">
                            <label>Monto Total</label>
                            <input type="number" name="mount" onChange={this.handleChange} className="form-control" placeholder="Monto"/>
                        </div>
                        <div className="col-12 col-md-12 pb-2">
                            <h2 className="text-center">Datos Producto</h2>
                            <hr></hr>
                        </div>
                        <div className="form-group col-md-2">
                            <label>Marca</label>
                            <Select 
                                name="marca"
                                value={this.state.marca}
                                onChange={this.handleChange}
                                options={this.props.amortiguadoresReducers.marcas}
                            />
                        </div>
                        
                        <div className="form-group col-md-2">
                            <label>Modelo</label>
                            <Select 
                                name="modelo"
                                value={this.state.modelo}
                                onChange={this.handleChange}
                                options={this.props.amortiguadoresReducers.modelos}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Año</label>
                            <Select 
                                name="anio_desde"
                                value={this.state.anio_desde}
                                onChange={this.handleChange}
                                options={this.props.amortiguadoresReducers.anio}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Posicion</label>
                            <Select 
                                name="posicion"
                                value={this.state.posicion}
                                onChange={this.handleChange}
                                options={this.props.amortiguadoresReducers.posicion_corta}
                            />
                        </div>
                        <div>
                            <button className="btn btn-primary m-4 pt-2" onClick={this.handleSubmit}>Buscar</button>
                        </div>
                    </div> 
                    <div className="tab-content" id="myTabContent">
                    <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Marca</th>
                                    <th>Año</th>
                                    <th>Proveedor</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.amortiguadoresReducers.amortiguadores_venta.map((datos,key)=>{
                                return(
                                <tr key={key}>
                                    <td>{['checkbox'].map(type => (
                                            <div key={`custom-inline-${type}${key}`} className="mb-3">
                                            <Form.Check
                                                custom
                                                inline
                                                label="check"
                                                type={type}
                                                id={`custom-inline-${type}-${key}`}
                                                name={`${key}`}
                                                checked={this.state.isGoing}
                                                onChange={this.check_list} 
                                            />
                                            </div>
                                        ))}
                                    </td>
                                    <td>{datos.marca}</td>
                                    <td>{datos.anio_desde}/{datos.anio_hasta}</td>
                                    <td> {datos.img_provedor !== null &&
                                          <img src={require('../../img/'+datos.img_provedor)} alt="" className=" img-fluid" style={{width:"10rem"}}/>
                                        }
                                          {datos.img_provedor === null &&
                                          datos.marcaProvedor
                                          }</td>
                                    <td> <input type="number" className="form-control" placeholder="Cantidad" name={key} onChange={this.handleChangeCant}/></td>
                                </tr>
                                )
                            })}
                            </tbody>
                    </Table>
            </div>  
                    <button className="btn btn-primary m-4 pt-2" type="submit">Guardar</button>      
                 </form>
              
            </div>
        )
    }
}
const mapStateToProps = ({billReducers,amortiguadoresReducers}) =>{
    return {
        billReducers,
        amortiguadoresReducers
    };
}
const mapDispatchToProps = {
    ...billAction,
    ...amortiguadoresAction
}
export default connect(mapStateToProps,mapDispatchToProps)(bill_entry);