function Input({type="text", name, label, inputClass, labelClass="form-label", onChange})
{
    return(
      <>
          <label 
            className="form-label"
            >{label}</label>
          
          <input 
            type={type} 
            name={name} 
            className={inputClass} 
            onChange={onChange}
            autoComplete="off"
          />
        </>
    );
}

export default Input;