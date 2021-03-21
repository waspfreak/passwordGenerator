import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import './Slider.css';

const Slider = ({step, min, max, value, defaultLength, onChangeValue}) => {
  const rangeRef = useRef();
  let [range, setRange] = useState();

  const activeRangeColor = '#4aa1f3';
  const rangeBackground = '#d7dcdf';

  const handleChange = (max) => (e) => {
    onChangeValue(e);
    const value = e.target.value;
    const progress = (value / max) * 100 + '%';
    setRange(value);
    const newBackgroundStyle = `linear-gradient(90deg, ${activeRangeColor} 0% ${progress}, ${rangeBackground} ${progress} 100%)`;
    rangeRef.current.style.background = newBackgroundStyle;
  };

  if (range !== defaultLength || !range) {
    range = defaultLength;
  }

  const progressiveValue = range;
  const progress = (progressiveValue / max) * 100 + '%';
  const styleInput = {
    background: `linear-gradient(90deg, ${activeRangeColor} 0% ${progress}, ${rangeBackground} ${progress} 100%)`,
  };

  return (
    <div className='slider-container'>
      <div className='slider'>
        <input
          ref={rangeRef}
          className='range-slider'
          type='range'
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={handleChange(max)}
          style={styleInput}
        />
        <span className='range-slider-value'> {progressiveValue}</span>
      </div>
    </div>
  );
};

Slider.propTypes = {
  step: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultLength: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default Slider;
