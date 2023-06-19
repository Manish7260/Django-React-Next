function Button({type, value, disabled, inputClass = "btn btn-primary btn-lg"}) {
    return (
        <div className="mt-4 pt-2">
          <input
            className={inputClass}
            type={type}
            value={value}
            disabled={disabled}
          />
        </div>
      );   
}

export default Button;