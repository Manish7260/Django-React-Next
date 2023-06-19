function RadioInput({name, firstValue, secondValue,onChange})
{
    return(
        <>
        <div className="form-check">

        <input 
            type="radio"
            className="form-check-input" 
            name={name} 
            value={firstValue}
            onChange={onChange} 
        />
        <label className="form-check-label">{firstValue}</label>
        </div>

        <div className="form-check">
        <input 
            type="radio"
            className="form-check-input" 
            name={name} 
            value={secondValue}
            onChange={onChange}
        />
        <label className="form-check-label">{secondValue}</label>
        
        </div>
        </>
    );
}

export default RadioInput;