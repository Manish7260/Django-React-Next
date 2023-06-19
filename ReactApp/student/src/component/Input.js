function Input({type="text" ,name, placeholder, onChange, ref})
{
    return(
        <div className="form-group">

        <input 
            type={type}
            className="form-control" 
            name={name} 
            placeholder={placeholder}
            onChange={onChange}
            autoComplete="off"
        />
        
        </div>
    );
}

export default Input;