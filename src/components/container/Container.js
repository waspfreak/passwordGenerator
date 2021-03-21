import React, {useState, useEffect, useMemo} from 'react';
import Checkbox from '../checkbox/Checkbox';
import Slider from '../slider/Slider';
import Button from './button/Button';
import './Container.css';
import {
  generatePassword,
  setPasswordLength,
  copyToClipBoard,
} from '../../ultils/Helper';
import Tooltip from '../tooltip/Tooltip';

const CHECKBOX_LIST = [
  {
    id: 0,
    name: 'uppercase',
    label: 'Uppercase',
    isChecked: true,
  },
  {
    id: 1,
    name: 'lowercase',
    label: 'Lowercase',
    isChecked: true,
  },
  {
    id: 2,
    name: 'symbols',
    label: 'Symbols',
    isChecked: true,
  },
  {
    id: 3,
    name: 'numbers',
    label: 'Numbers',
    isChecked: true,
  },
];

const Container = ({
  setPassword,
  setRange,
  setPasswordProps,
  passwordRef,
  type,
}) => {
  const [rangeValue, setRangeValue] = useState('8');
  const [checkbox, setCheckbox] = useState({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true,
  });
  const [checked, setChecked] = useState(false);
  const [checkedName, setCheckedName] = useState('');
  const [tooltip, setTooltip] = useState();
  const [minMaxValue, setMinMaxValue] = useState({
    min: 1,
    max: 60,
  });

  const {uppercase, lowercase, symbols, numbers} = checkbox;
  const {min, max} = minMaxValue;

  const geRangeValues = (value) => {
    setPasswordLength(value);
    setRange(value);
    setRangeValue(value);
  };

  useEffect(() => {
    geRangeValues(rangeValue);
    passwordGenerated(checkbox, rangeValue);
    checkboxCount();

    // eslint-disable-next-line
  }, [uppercase, lowercase, symbols, numbers]);

  const checkboxCount = () => {
    const checkedCount = Object.keys(checkbox).filter((key) => checkbox[key]);
    const disabled = checkedCount.length === 1;
    const name = checkedCount[0];
    if (disabled) {
      setChecked(disabled);
      setCheckedName(name);
    } else {
      setChecked(false);
      setCheckedName('name');
    }
  };

  const passwordGenerated = (checkbox, rangeValue) => {
    const pwd =
      rangeValue > 3
        ? generatePassword(checkbox, rangeValue)
        : generatePassword(checkbox, 3);
    setPassword(pwd); //SetPasswrod is Proptypes from Container i will use this value in Display
    setPasswordProps(checkbox); //setPasswordProps to checkbox value for use in display
    console.log(pwd);
  };

  const onChangeSlider = (e) => {
    // console.log(e.target.value);
    geRangeValues(e.target.value);
    passwordGenerated(checkbox, e.target.value);
  };

  const onChangeCheckBox = (e) => {
    if (type !== 'pin') {
      let {name, checked} = e.target;
      CHECKBOX_LIST.map((checkbox) => {
        if (checkbox.name === name) {
          checkbox.isChecked = checked;
          setCheckbox((prevState) => ({
            ...prevState,
            [name]: checkbox.isChecked,
          }));
          setPasswordLength(rangeValue);
          setRangeValue(rangeValue);
        }
        return '';
      });
    }

    //console.log(CHECKBOX_LIST);
    //console.log(checkbox, name);
  };

  const copyClipBoard = (elementRef) => (e) => {
    e.preventDefault();
    copyToClipBoard(elementRef);
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 2000);
  };

  const updateCheckBoxes = () => {
    if (type === 'pin') {
      CHECKBOX_LIST.map((checkbox) => {
        const name = checkbox.name;
        if (name !== 'numbers') {
          checkbox.isChecked = false;
          const checkboxProps = {
            name: name,
            checkedName: name,
            checked: true,
            isChecked: checkbox.isChecked,
            min: 0,
            max: 15,
            length: 3,
          };
          checkBoxProperties(checkboxProps);
        }
        return '';
      });
    } else {
      CHECKBOX_LIST.map((checkbox) => {
        const name = checkbox.name;
        checkbox.isChecked = true;
        const checkboxProps = {
          name,
          checkedName: '',
          checked: false,
          isChecked: checkbox.isChecked,
          min: 1,
          max: 60,
          length: 12,
        };
        checkBoxProperties(checkboxProps);
      });
    }
  };

  const checkBoxProperties = (checkBoxProps) => {
    const {
      name,
      checked,
      isChecked,
      checkedName,
      min,
      max,
      length,
    } = checkBoxProps;
    setCheckbox((prevState) => ({
      ...prevState,
      [name]: isChecked,
    }));
    setChecked(checked);
    setCheckedName(checkedName);
    setPasswordLength(length);
    setMinMaxValue({min, max});
    setRangeValue(length);
    setRange(length);
  };

  useMemo(updateCheckBoxes, [type]);

  const SliderProps = {
    step: 1,
    min: parseInt(min, 10),
    max: parseInt(max, 10),
    value: parseInt(rangeValue, 10),
    onChangeValue: onChangeSlider,
    defaultLength: parseInt(rangeValue, 10),
  };
  return (
    <div className=' password-settings'>
      <h3>Use the Slider, and select from the options.</h3>

      <div className='row' style={{display: 'block'}}>
        <div
          className='col-md-12'
          style={{position: 'relative', overflow: 'overlay'}}>
          <div className='form-group'>
            <br />
            <Slider {...SliderProps} />
          </div>
        </div>

        <div className='col-md-12'>
          <div className='row checkbox-container'>
            {CHECKBOX_LIST.map((checkbox) => (
              <Checkbox
                key={checkbox.id}
                name={checkbox.name}
                checked={checkbox.isChecked}
                value={checkbox.isChecked}
                label={checkbox.label}
                onChange={onChangeCheckBox}
                disabled={
                  checked && checkbox.isChecked && checkedName === checkbox.name
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className='text-center'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <Button
              label='Copy Password'
              className='btn password-btn'
              handleClick={copyClipBoard(passwordRef.current)}
            />
            <Tooltip
              message='Copied'
              position='right'
              displayTooltip={tooltip}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
