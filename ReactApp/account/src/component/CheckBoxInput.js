function CheckBoxInput({type="text", name, label, inputClass, labelClass="form-label", onChange})
{
  return (
    <>
      <label className={labelClass}>
        {label}
        <input
          type={type}
          name={name}
          className={inputClass}
          onChange={onChange}
        />
      </label>
    </>
  );
}

export default CheckBoxInput;