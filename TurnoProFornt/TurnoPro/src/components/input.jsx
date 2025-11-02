import { useState } from "react"

const Input = ({value, type, placeholder, label, onChange}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () =>{
        setShowPassword(!showPassword)
    }
 const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-3 position-relative">
      {label && <label className="form-label text-light">{label}</label>}
      <div className="input-group">
        <input
          type={inputType}
          className="form-control bg-dark text-light border-secondary"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            type="button"
            className="btn btn-outline-secondary bg-dark text-light border-secondary"
            onClick={togglePassword}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;