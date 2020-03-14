import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as billAction from '../../redux/actions/billAction';
import {connect} from 'react-redux';
import {numberFormat} from '../lib/format';
class modal_view_bill extends Component{
    constructor(props){
        super(props)
       
            this.state = {
            }
        
            this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
      this.props.hideModal();
      if(this.props.state.show === true){
        this.setState({datos:this.props.state.datos})
        
    }
    }
    handleChange(e,event){
       
    if(event === undefined){
         e.persist();
    this.setState({
        [e.target.name]:e.target.value
    })
    if(e.target.name === 'precio_unitario'){
        this.setState({
            precio_par:e.target.value*2
        })
    }
    }else{
        this.setState({
            [event.name] : e
        })
    }
       
    }
    render(){
        
        
    return(
        
            <Modal show={this.props.state.show} onHide={this.props.hideModal}>
        
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Vista Productos</Modal.Title>
           
            </Modal.Header>
            <Modal.Body>
            <div className="row">
            {this.props.billReducers.product_view.map((data,key)=>{
                return(
                    <div className="col-md-12 col-sm-12  profile_details" key={key}>
                    <div className="well profile_view">
                      <div className="col-sm-12">
                        <h4 className="brief"><i>{data.marca} - {data.modelo} {data.anio_desde}/{data.anio_hasta}</i></h4>
                        <div className="left col-md-7 col-sm-7">
                          <h2>${numberFormat(Math.round(data.precio))} C/U</h2>
                          <p><strong>Forma: </strong> {data.forma} </p>
                          <p><strong>Tipo: </strong> {data.tipo} </p>
                        </div>
                        <div className="right col-md-5 col-sm-5 text-center">
                        {data.img_provedor !== null &&
                          <img src={require('../../img/'+data.img_provedor)} alt="" className=" img-fluid"/>
                        }
                          {data.img_provedor === null &&
                          data.marcaProvedor
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                )
            })}

            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.props.hideModal} >
                Cerrar
            </Button>
            </Modal.Footer>
        
      </Modal>
    )}
}

const mapStateToProps = ({billReducers}) =>{
    return {
        billReducers
    };
}
const mapDispatchToProps = {
    ...billAction
}
export default connect(mapStateToProps,mapDispatchToProps)(modal_view_bill);