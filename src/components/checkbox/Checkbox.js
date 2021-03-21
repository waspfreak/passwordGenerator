import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

const Checkbox = ({label, value, checked, name, onChange, disabled}) => {
  return (
    <>
      <div className='col-md-3'>
        <label className='container'>
          <h1>{label}</h1>
          <input
            name={name}
            type='checkbox'
            checked={checked}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className='checkbox-input'
          />
          <span
            className='checkmark'
            style={{opacity: disabled ? '0.7' : '1'}}></span>
        </label>
      </div>
    </>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Checkbox;
