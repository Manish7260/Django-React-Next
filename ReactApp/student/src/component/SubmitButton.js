function SubmitButton({children})
{
    return(
        <div className="form-group">
        
        <button 
            type="submit" 
            className="btn btn-primary">
            {children}
        </button>
        
        </div>
    );
}

export default SubmitButton;