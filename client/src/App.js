import React from 'react';
import SideBar from './Componentes/sidebar';
import NavBar from './Componentes/navBar';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import IndexHome from './Componentes/Home/indexHome';
import IngresoProducto from './Componentes/Home/ingresoProducto';
function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <div className="row">
          <NavBar/>
          <SideBar/>
          <div className="col-10">
            <Switch>
                <Route exact path="/" component={IndexHome} />
                <Route exact path="/ingreso" component={IngresoProducto}/>
            </Switch>
          </div>
        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
