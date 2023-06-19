function AddressInput({onChange})
{
    return(
        <div className="form-group">
        
        <textarea 
            className="form-control" 
            name="address" 
            placeholder="Address" 
            onChange={onChange}
        />

        </div>

    );
}

export default AddressInput;