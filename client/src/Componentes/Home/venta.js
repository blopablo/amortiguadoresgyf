import React,{Component} from 'react';


class Ventas extends Component {
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <form>
                    <div className="form-row">
                        <div className="col-12">
                            <h1 className="text-center">Ventas</h1>
                            <hr></hr>
                        </div>
                        
                        <div className="form-group col-md-8">
                            <input type="text" className="form-control" placeholder="codigo de barra"/>
                        </div>
                        <div>
                            <button className="btn btn-primary">Ingresar</button>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}

export default Ventas;