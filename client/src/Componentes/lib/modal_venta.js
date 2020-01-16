import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {numberFormat} from '../lib/format';
class modalVenta extends Component{
  constructor(props){
    super(props)
    this.state = {
     
    };
  
}
componentDidMount() {
  this.props.hideModal();
}

  render(){
    
  return(
    
    <Modal show={this.props.state.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <p><b>Total:</b> ${numberFormat(Math.round(this.props.state.total))}</p>
              <p><b>Cantidad:</b> {this.props.state.cantidad}</p>
            </div>
            <div className="col-6">
           
            <div className="custom-control custom-radio custom-control-inline">
            <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" value="Boleta"
               checked={this.props.state.selectedOption === "Boleta"}
               onChange={this.props.radioChange}/>
            <label className="custom-control-label" htmlFor="customRadioInline1">Boleta</label>
          </div>
          <div className="custom-control custom-radio custom-control-inline">
            <input type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" value="Factura"
               checked={this.props.state.selectedOption === "Factura"}
               onChange={this.props.radioChange}/>
            <label className="custom-control-label" htmlFor="customRadioInline2">Factura</label>
          </div>
          <div className="custom-control custom-radio custom-control-inline">
            <input type="radio" id="customRadioInline5" name="customRadioInline1" className="custom-control-input" value="Sin_boleta"
               checked={this.props.state.selectedOption === "Sin_boleta"}
               onChange={this.props.radioChange}/>
            <label className="custom-control-label" htmlFor="customRadioInline5">Sin boleta</label>
          </div>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.hideModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={this.props.handlevender}>
            Vender
          </Button>
        </Modal.Footer>
      </Modal>
  )}
}

export default modalVenta;