import React from 'react';
import PropTypes from 'prop-types';
import './Tooltip.css';

const Tooltip = ({message, position, displayTooltip}) => {
  return (
    <>
      {displayTooltip ? (
        <div className={`tooltip-bubble tooltip-${position}`}>
          <div className='tooltip-message'>{message}</div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

Tooltip.propTypes = {
  message: PropTypes.string,
  position: PropTypes.string,
  displayTooltip: PropTypes.bool,
};

export default Tooltip;
