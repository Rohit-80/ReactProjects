const RenderSelect = ({ name, label, options, error, onChange, value }) => {

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} value={value} onChange={(e) => {
        onChange(e);
      }} className="form-control">
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default RenderSelect;