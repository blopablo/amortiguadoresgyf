import React,{Component} from 'react';
import Select from 'react-select';
import * as amortiguadoresAction from '../../redux/actions/amortiguadoresAction';
import * as carroAction from '../../redux/actions/carroActions';
import {connect} from 'react-redux';
import { toast } from "react-toastify";
import {numberFormat} from '../lib/format';
import ModalVenta from '../lib/modal_venta';
import RButtom from './lib/rButtom';
import {Link} from 'react-router-dom';

class IndexHome extends Component {
    constructor(props){
        super(props)
        this.state={
            marca:[{value:'',label:''}],
            modelo:[{value:'',label:''}],
            anio:[{value:'',label:''}],
            anio_desde:[{value:'',label:''}],
            posicion:[{value:'',label:''}],
            show:false,
            selectedOption: '',
            selectedOption1:'Buscador'
            
    };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlevender = this.handlevender.bind(this);
        this.radioChange = this.radioChange.bind(this);
        this.checkChange = this.checkChange.bind(this);
        this.buscarPorCodigo = this.buscarPorCodigo.bind(this);
    }
    showModal = () => {
        this.setState({ show: true ,
                        total:this.props.carroReducers.total,
                        cantidad:this.props.carroReducers.cantidad_cart});
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    dalete_cart = () =>{
        this.props.delate_cart();
    }
    
    componentDidMount(){
        this.props.traerPosicionCompra();
        this.props.traerMarca();
        this.props.traerPosicion();
        this.props.traerAnio();
        this.props.traerProveedor();
    }
    handleChange(e,event, valor){
        if(event === undefined){
            e.persist();
            this.setState({
                [e.target.name]:e.target.value
            })
            if(e.target.name === `porcentaje${valor.id}`){
                 this.props.amortiguadoresReducers.amortiguadores_venta.forEach((item)=>{
                     if(e.target.value === "-")
                     {
                        if(item.id === valor.id){
                            item.precio =valor.precio_unitario;
                            item.porcentaje = 0;
                        }
                    }else{
                        if(item.id === valor.id){
                            item.precio =valor.precio_unitario;
                            item.precio = (valor.precio_unitario*e.target.value/100)+valor.precio_unitario;
                            item.porcentaje = e.target.value;
                        }
                    }
                 })
            }
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
        
        if(this.state.selectedOption1 === 'Buscador'){
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
        }else{
           
            this.props.buscarCodigo(this.state.buscarCodigo);
            //this.setState({buscarCodigo:''})
        }
        //props.filtrado(this.state.marca.value);
        //this.props.guardarProducto(this.state);
        //toast.success('producto Ingresado') 
        
    }
    handlevender(e){
        e.preventDefault();
        //this.setState({carro: this.props.carroReducers.cart})
        this.props.ventaAmortiguadores(this.state,this.props.carroReducers.cart);
        this.setState({ show: false });
        toast.success(`Venta realizada con exito`) 
    }
    radioChange(e) {
        this.setState({
          selectedOption: e.currentTarget.value
        });
      }
 
    checkChange(e) {
        this.setState({
            selectedOption1: e.currentTarget.value
        });
        
      }
    async trashBtn(id){
        let tempProducto = [...this.props.carroReducers.cart];
        const index = tempProducto.find(item=>item.id === id);    
        this.props.carroReducers.cart.splice(index,1);
        this.props.agregarItem(this.props.carroReducers.cart);
        toast.error('Producto Eliminado');
    }
    async addToCart(id,precio){
        /*  let tempProducto = [...detalle];
          const index = tempProducto.indexOf(getItem(id));*/
        let producto = this.props.amortiguadoresReducers.amortiguadores_venta.find(item=>item.id === id);
        const price = precio;        
        const cartFind =  this.props.carroReducers.cart.find(item=>item.id === id);
        
            if(cartFind ===undefined){
                producto.count = 1;//this.state.cantidad;
                producto.total = price *producto.count ;
                this.props.carroReducers.cart.push(producto);
                this.props.agregarItem(this.props.carroReducers.cart);
                
            }else{
                await this.props.carroReducers.cart.forEach((item)=>{
                    if(item.id === producto.id){
                        item.count += 1;
                        item.total = price*item.count;
                    }
                })
                // props.carroReducers.cart.push(producto);
                this.props.agregarItem(this.props.carroReducers.cart);
            }
            this.props.amortiguadoresReducers.amortiguadores_venta.forEach((item)=>{
               if(item.id === id){
                   item.stock -=1; 
               }
               
            })
            toast.success('Producto Agregado');
    }
    buscarPorCodigo(e){
        e.persist();
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="col-12">
                            <h1 className="text-center">Ventas</h1>
                            <hr></hr>
                        </div>
                        <RButtom state={this.state} checkChange={this.checkChange}/>
                        {this.state.selectedOption1 === "Codigo" &&
                        <div className="col-10">
                        <div className="form-group">
                            <label>Codigo</label>
                            <input type="text" className="form-control" id="buscarCodigo" name="buscarCodigo" value={this.state.buscarCodigo} onChange={this.buscarPorCodigo}/>
                            
                        </div>
                        </div>
                        }
                        {this.state.selectedOption1 === "Buscador" &&
                        <>
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
                        </>
                        }
                        <div>
                            <button className="btn btn-primary m-4 pt-2">Buscar</button>
                        </div>
                        
                            <hr></hr>
                            
                             <div className="col-12"><hr></hr></div>
                        
                            <hr></hr>
                            {this.props.amortiguadoresReducers.amortiguadores_venta.map((datos,key)=>{
                                return(
                                    <div className="col-md-4 col-sm-4  profile_details" key={key}>
                                    <div className="well profile_view">
                                      <div className="col-sm-12">
                                        <h4 className="brief"><i>{datos.marca} - {datos.modelo} {datos.anio_desde}/{datos.anio_hasta}</i></h4>
                                        <div className="left col-md-7 col-sm-7">
                                          <h2>${numberFormat(Math.round(datos.precio))}</h2>
                                          <p><strong>Forma: </strong> {datos.forma} </p>
                                          <ul className="list-unstyled">
                                            <li><i className="fa fa-tasks"></i> Stock:{datos.count} </li>
                                          </ul>
                                        </div>
                                        <div className="right col-md-5 col-sm-5 text-center">
                                        {datos.img_provedor !== null &&
                                          <img src={require('../../img/'+datos.img_provedor)} alt="" className=" img-fluid"/>
                                        }
                                          {datos.img_provedor === null &&
                                          datos.marcaProvedor
                                          }
                                        </div>
                                      </div>
                                      <div className=" profile-bottom text-center">
                                        <div className=" col-sm-6 emphasis pb-2">
                                        <select class="form-control" name={`porcentaje${datos.id}`} value={this.state.porcentaje} onChange={(e)=> this.handleChange(e,undefined,datos)}>
                                                <option>-</option>
                                                <option>10</option>
                                                <option>20</option>
                                                <option>30</option>
                                                <option>40</option>
                                                <option>50</option>
                                                <option>60</option>
                                            </select>
                                           
                                        </div>
                                        <div className=" col-sm-6 emphasis  pb-2">
                                        
                                        <button type="button" className="btn btn-primary btn-sm" onClick={(e)=> this.addToCart(datos.id,datos.precio)}>
                                            <i className="fa fa-shopping-cart"> </i> Agregar
                                          </button>
                                        
                                        </div>
                                            
                                      </div>
                                    </div>
                                  </div>
                                    
                                    /*<div className="col-4 pb-2" key={key}>
                                        <div className="card mb-3 " style={{maxWidth: "500px"} } key={key}>
                                            <div className="row no-gutters">
                                                <div className="col-md-4">
                                                    {datos.img_provedor !== null &&
                                                        <img src={require('../../img/'+datos.img_provedor)} className="card-img" alt="Foto_proveedor"/>}
                                                    {datos.img_provedor === null &&
                                                        <p className="card-text">{datos.marcaProvedor}</p>}
                                                        <p className="card-text pl-3"><b className="text-warning">${numberFormat(Math.round(datos.precio_unitario))} C/U</b></p>
                                                        <p className="card-text pl-3"><b className="text-warning">${numberFormat(Math.round(datos.precio_par))} PAR</b></p>
                                                </div>
                                                <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{datos.marca}</h5>
                                                    <p className="card-text">{datos.modelo}</p>
                                                    <p className="card-text">{datos.anio_desde}/{datos.anio_hasta}</p>
                                                    <p className="card-text">{datos.forma}</p>
                                                    {datos.stock > 0 &&
                                                    <button className="btn btn-success pl-2" onClick={(e)=> this.addToCart(datos.id,datos.precio_unitario)} >Agregar</button>
                                                    }
                                                    <b className="pl-2">Stock:{datos.stock}</b>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>*/
                                     )
                             })}
                        
                        
                        
                    </div>
                </form>
                <div className="fixed-bottom row border bg-light">
                            <div className="col-4"></div>
                            <div className="col-4"><b>Cantidad:{this.props.carroReducers.cantidad_cart}</b></div>
                            <div className="col-2"><b>Total: ${numberFormat(Math.round(this.props.carroReducers.total))}</b></div>
                            {this.props.carroReducers.cart.length  > 0 &&
                                <div className="col-2"><Link className="btn btn-primary" to='/detalle_venta'>Vender</Link></div>
                            }
                            {this.props.carroReducers.cart.length === 0 &&
                                <div className="col-2"><Link className="btn btn-primary" to='/detalle_venta'>Vender</Link></div>
                            }
                            
                        </div>
                <ModalVenta state={this.state} hideModal={this.hideModal} handlevender={this.handlevender} radioChange={this.radioChange} dalete_cart={this.dalete_cart}/>
            </div>
        )
    }
}
const mapStateToProps = ({amortiguadoresReducers,carroReducers}) =>{
    return {
        amortiguadoresReducers,
        carroReducers
    };
}
const mapDispatchToProps = {
    ...amortiguadoresAction,
    ...carroAction
}
export default connect(mapStateToProps,mapDispatchToProps)(IndexHome);

