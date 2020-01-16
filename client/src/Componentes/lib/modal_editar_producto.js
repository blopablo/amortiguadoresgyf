import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class modal_editar_producto extends Component{
    constructor(props){
        super(props)
       
            this.state = {
                anio_desde: '',
                datos:{}
            }
        
      
    }
    componentDidMount() {
      this.props.hideModal();
      
      if(this.props.state.show === true){
        this.setState({datos:this.props.state.datos})
        console.log(this.state)
    }
    }
    handleChange(e){
        e.persist();
        console.log(e.target.name)
        //this.props.state.datos={...this.props.state.datos,[e.target.name] : e.target.value}
        
    }
    
    
    render(){
        
        console.log(this.props.state.datos)
    return(
        
            <Modal show={this.props.state.show} onHide={this.props.hideModal}>
        
            <Modal.Header closeButton>
            {this.props.state.datos !== undefined &&
                <Modal.Title className="text-center">{this.props.state.datos.marca} - {this.props.state.datos.modelo}</Modal.Title>
            }
            </Modal.Header>
            <Modal.Body>
            <div className="row">
            {this.props.state.datos !== undefined &&
            <>
            <input type="text" name="anio_desde" value={this.props.state.datos.anio_desde} name="anio_desde" onChange={this.handleChange.bind(this)}/>
            <input type="text" name="anio_desde" value={this.props.state.datos.anio_hasta} name="anio_hasta" onChange={this.handleChange.bind(this)}/>
            <input type="text" name="anio_desde" value={this.props.state.datos.precio_unitario} name="precio_unitario" onChange={this.handleChange.bind(this)}/>
            
            </>
            }

            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.props.hideModal} >
                Cerrar
            </Button>
            <Button variant="primary">
                Vender
            </Button>
            </Modal.Footer>
        
      </Modal>
    )}
}

export default React.memo(modal_editar_producto);