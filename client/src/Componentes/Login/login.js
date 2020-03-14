import React,{Component} from 'react';
import amortiguadores from '../../img/iconos/Amortigudores-de-carros.jpg'
import {connect} from 'react-redux';
import * as loginAction from '../../redux/actions/loginAction';

class Login extends Component{
  constructor(props){
    super(props)
    this.state={
      pase: false,
      inputLogin:'',
      clave:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onclick_ingreso = this.onclick_ingreso.bind(this);
  }
    //const[state,setState] = useState({});
   
    handleChange (event){
        event.persist();
        this.setState({[event.target.name]: event.target.value });
    };
    onclick_ingreso (event){
      event.preventDefault();
        this.props.login(this.state)
   
      //  console.log(this.props)
        //this.props.history.push ('/');
         
        
       
    }
   
    render(){
    return(
        <div className="login">
      <a className="hiddenanchor" id="signup"></a>
      <a className="hiddenanchor" id="signin"></a>

      <div className="login_wrapper">
        <div className="animate form login_form">
          <section className="login_content">
            <form onSubmit={this.onclick_ingreso}>
              <h1>Amortiguadores G&F</h1>
              <div>
                <input type="text" className="form-control" name="inputLogin" value={this.state.inputLogin} onChange={this.handleChange} placeholder="Nombre de usuario o email" />
              </div>
              <div>
                <input type="password" className="form-control" name="clave" value={this.state.clave} onChange={this.handleChange} placeholder="Contraseña"/>
              </div>
              <div>
                <button type="submit" className="btn btn-info btn-lg">Ingresar</button>
                
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>        
    )
  }
}
const mapStateToProps = (reducers) =>{
    return reducers.loginReducers;
}
export default connect(mapStateToProps,loginAction) (Login); 