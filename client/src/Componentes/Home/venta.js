import React,{Component} from 'react';
import Select from 'react-select';
import * as amortiguadoresAction from '../../redux/actions/amortiguadoresAction';
import * as carroAction from '../../redux/actions/carroActions';
import {connect} from 'react-redux';
import { toast } from "react-toastify";
import {numberFormat} from '../lib/format';
import ModalVenta from '../lib/modal_venta';
import RButtom from './lib/rButtom';
class Ventas extends Component {
    constructor(props){
        super(props)
        this.state={
            marca:[{value:'',label:''}],
            modelo:[{value:'',label:''}],
            anio:[{value:'',label:''}],
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
    
    componentDidMount(){
        this.props.traerPosicionCompra();
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
        
        if(this.state.selectedOption1 === 'Buscador'){
            let filter={
                id_modelo: this.state.modelo.id_modelo,
                id_marca: this.state.marca.idMarca,
                id_anio: this.state.anio.value,
                id_posicion: this.state.posicion.id
            }
            if( !filter.id_marca && !filter.id_modelo && !filter.id_anio && !filter.id_posicion){
                return toast.error('debe ingresar datos para buscar');
            }else if (filter.id_marca && !filter.id_modelo && !filter.id_anio && !filter.id_posicion){
                this.props.filtrado(this.state.marca.value);
            }else if(filter.id_marca && filter.id_modelo && !filter.id_anio && !filter.id_posicion){
                this.props.filtrado(`${this.state.marca.value}-${this.state.modelo.value}`);
            }else if(filter.id_marca && filter.id_modelo && filter.id_anio && !filter.id_posicion){
                this.props.filtrado(`${this.state.marca.value}-${this.state.modelo.value}-${this.state.anio.value}`);
            }else if(filter.id_marca && filter.id_modelo && filter.id_anio && filter.id_posicion){
                this.props.filtrado(`${this.state.marca.value}-${this.state.modelo.value}-${this.state.anio.value}-${this.state.posicion.id}`);
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
                toast.success('Producto Agregado');
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
                            {this.props.carroReducers.cart.map((datos,key)=>{
                                return(
                                    <div className="col-4 pb-2" key={key}>
                                    <div className="card mb-3" style={{maxWidth: "500px"} } key={key}>
                                        <div className="row no-gutters">
                                            <div className="col-md-4">
                                                <img src={require('../../img/'+datos.img_provedor)} className="card-img" alt="Foto_proveedor"/>
                                                <button className="btn btn-danger" onClick={(e)=> this.trashBtn(datos.id,e)}>Eliminar</button>
                                            </div>
                                            <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">Marca: {datos.marca}</h5>
                                                <p className="card-text">Modelo: {datos.modelo}</p>
                                                <p className="card-text">{datos.anio_desde}/{datos.anio_hasta}</p>
                                                <p className="card-text">{datos.forma}</p>
                                                <p className="card-text">Cantidad: {datos.count}</p>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                     )
                             })}
                            
                             <div className="col-12"><hr></hr></div>
                        
                            <hr></hr>
                            {this.props.amortiguadoresReducers.amortiguadores_venta.map((datos,key)=>{
                                return(
                                    <div className="col-4 pb-2" key={key}>
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
                                    </div>
                                     )
                             })}
                        
                        
                        
                    </div>
                </form>
                <div className="fixed-bottom row border bg-light">
                            <div className="col-4"></div>
                            <div className="col-4"><b>Cantidad:{this.props.carroReducers.cantidad_cart}</b></div>
                            <div className="col-2"><b>Total: ${numberFormat(Math.round(this.props.carroReducers.total))}</b></div>
                            {this.props.carroReducers.cart.length  > 0 &&
                                <div className="col-2"><button className="btn btn-primary" onClick={this.showModal}>Vender</button></div>
                            }
                            {this.props.carroReducers.cart.length === 0 &&
                                <div className="col-2"><button className="btn btn-primary" onClick={this.showModal} disabled>Vender</button></div>
                            }
                            
                        </div>
                <ModalVenta state={this.state} hideModal={this.hideModal} handlevender={this.handlevender} radioChange={this.radioChange}/>
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
export default connect(mapStateToProps,mapDispatchToProps)(Ventas);