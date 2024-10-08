import "../App.css"
import React from "react"

const TextInput = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} />
    </div>
  )
}

export default TextInput
