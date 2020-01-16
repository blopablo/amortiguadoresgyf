import React from 'react';


const RButtom = ({state,checkChange}) =>{
    return(
        
        <div className="col-12">
            <div className="custom-control custom-radio custom-control-inline">
        <input type="radio" id="customRadioInline4" name="customRadioInline4" className="custom-control-input" value="Buscador"
           checked={state.selectedOption1 === "Buscador"}
           onChange={checkChange}/>
        <label className="custom-control-label" htmlFor="customRadioInline4">Buscador</label>
      </div>
        <div className="custom-control custom-radio custom-control-inline">
        <input type="radio" id="customRadioInline3" name="customRadioInline4" className="custom-control-input" value="Codigo"
           checked={state.selectedOption1 === "Codigo"}
           onChange={checkChange}/>
        <label className="custom-control-label" htmlFor="customRadioInline3">Codigo</label>
      </div>
     
        </div>
    )
}

export default RButtom;