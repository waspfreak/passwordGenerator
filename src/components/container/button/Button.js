import React from 'react';
import PropTypes from 'prop-types';

const Button = ({label, className, iconClass, handleClick}) => {
  return (
    <>
      <button className={className} label={label} onClick={handleClick}>
        <i className={iconClass}></i>
        {label}
      </button>
    </>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  iconClass: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Button;
