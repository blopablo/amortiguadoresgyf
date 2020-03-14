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

class Detalle_venta extends Component {
    constructor(props){
        super(props)
        this.state={
          porcentajes:true,
          selectedOption: '',
        };
        this.trashBtn = this.trashBtn.bind(this);
        this.minus = this.minus.bind(this);
        this.plus = this.plus.bind(this);
        this.confirmar = this.confirmar.bind(this);
        this.radioChange = this.radioChange.bind(this);
    }
    async trashBtn(id){
      /*let tempProducto = [...this.props.carroReducers.cart];
      const index = tempProducto.find(item=>item.id === id);    
      this.props.carroReducers.cart.splice(index,1);*/
      let i = this.props.carroReducers.cart.indexOf(id);
      this.props.carroReducers.cart.splice(i,1);
      this.props.agregarItem(this.props.carroReducers.cart);
      toast.error('Producto Eliminado');
      
  }
  async minus(e,id){
    e.persist();
    this.props.carroReducers.cart.forEach((item)=>{
      if(item.id === id ){
        item.count -= 1;
        item.total -= item.precio;
        if(item.count <= 0){
          this.trashBtn(item.id);
        }
        this.props.agregarItem(this.props.carroReducers.cart);
      }
    })
    
}
async plus(e,id){
  e.persist();
  this.props.carroReducers.cart.forEach((item)=>{
    if(item.id === id ){
      item.count += 1;
      item.total += item.precio;
      this.props.agregarItem(this.props.carroReducers.cart);
    }
  })

  
}
confirmar(e){
  e.preventDefault();
  this.props.carroReducers.cart.forEach((item)=>{
    if(item.porcentaje === undefined){
      toast.error(`Venta sin porcentaje`) 
      this.setState({porcentajes:false});
    }
  })
  if(this.state.porcentajes === true){

    if(this.state.selectedOption !== ""){
      this.props.ventaAmortiguadores(this.state,this.props.carroReducers.cart);
      toast.success(`Venta realizada con exito`);
      
    }else{
      toast.error(`Ingrese el tipo de pago`) 
    }
    
    
  }
}
  componentDidMount(){
    if(this.props.carroReducers.cart.length === 0 ){
      this.props.history.push ('/venta');
    }
  }
  componentDidUpdate(){
    if(this.props.carroReducers.cart.length === 0 ){
      this.props.history.push ('/venta');
    }
  }
  radioChange(e) {
    this.setState({
      selectedOption: e.currentTarget.value
    });
  }
    render(){
      
        return(
          
          <div class="">
            <div class="page-title">
              <div class="title_left">
                <h3>Detalles <small>Ventas</small></h3>
              </div>
            </div>
            
            <div class="clearfix"></div>

            <div class="row">
              <div class="col-md-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Productos</h2>
                    <ul class="nav navbar-right panel_toolbox">
                      <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                      </li>
                      
                    </ul>
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                    <table class="table table-striped projects">
                      <thead>
                        <tr>
                          <th style={{width: "1%"}}>#</th>
                          <th style={{width: "20%"}}>Marca-Modelo</th>
                          <th>Año</th>
                          <th>Proveedor</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th>Porcentaje</th>
                          <th style={{width: "20%"}}>#Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.props.carroReducers.cart.map((datos,key)=>{
                        return(
                          <tr key={key}>
                          <td>{key}</td>
                          <td>
                          {datos.marca} - {datos.modelo} 
                          </td>
                          <td>
                          {datos.anio_desde}/{datos.anio_hasta}
                          </td>
                          <td class="project_progress">
                              {datos.img_provedor !== null &&
                                <img src={require('../../img/'+datos.img_provedor)} alt="" className=" img-fluid" style={{width : "10rem"}}/>
                              }
                                {datos.img_provedor === null &&
                                datos.marcaProvedor
                                }
                                        
                          </td>
                          <td>
                            ${numberFormat(Math.round(datos.precio))}
                          </td>
                          <td>
                            {datos.count}
                          </td>
                          <td>
                            {datos.porcentaje}
                          </td>
                          <td>
                            <button type="button" className="btn btn-danger btn-xs" onClick={(e)=> this.trashBtn(datos)}>
                                  <i className="fa fa-shopping-cart"> </i> Eliminar
                              </button>
                              <button type="button" className="btn btn-primary btn-xs" onClick={(e)=> this.plus(e,datos.id)}>
                                  <i className="fa fa-plus-circle"> </i>
                              </button>
                              <button type="button" className="btn btn-primary btn-xs" onClick={(e)=> this.minus(e,datos.id)}>
                                  <i className="fa fa-minus-circle"> </i> 
                              </button>
                          </td>
                        </tr>
                        )
                      })
                      }
                        
                       
                      </tbody>
                    </table>
                    <div className="row">
                      <div className="col-1">
                        <Link className="btn btn-primary" to='/venta'>Volver</Link>
                      </div>
                      <div className="col-3">
                        <button className="btn btn-success" onClick={this.confirmar}>Confirmar</button>
                      </div>
                      <div className="col-6">
                          <div className="custom-control custom-radio custom-control-inline">
                          <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" value="Boleta"
                            checked={this.state.selectedOption === "Boleta"}
                            onChange={this.radioChange}/>
                          <label className="custom-control-label" htmlFor="customRadioInline1">Boleta</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <input type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" value="Factura"
                            checked={this.state.selectedOption === "Factura"}
                            onChange={this.radioChange}/>
                          <label className="custom-control-label" htmlFor="customRadioInline2">Factura</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <input type="radio" id="customRadioInline5" name="customRadioInline1" className="custom-control-input" value="Sin_boleta"
                            checked={this.state.selectedOption === "Sin_boleta"}
                            onChange={this.radioChange}/>
                          <label className="custom-control-label" htmlFor="customRadioInline5">Sin boleta</label>
                        </div>
                      </div>
                      <div className="col-2">
                      <h3>Total: <small>{this.props.carroReducers.total}</small></h3>
                      </div>
                     
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(Detalle_venta);