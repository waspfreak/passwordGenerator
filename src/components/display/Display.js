import React, {useState, useRef} from 'react';
import Button from '../container/button/Button';
import Container from '../container/Container';
import './Display.css';
import {generatePassword, copyToClipBoard} from '../../ultils/Helper';
import Tooltip from '../tooltip/Tooltip';

const Display = () => {
  const [password, setPassword] = useState(''); //i can use this state as a props from container
  const [rangeValue, setRange] = useState();
  const [passwordProps, setPasswordProps] = useState();
  const [tooltip, setTooltip] = useState();
  const [type, setType] = useState('password');

  const passwordRef = useRef(null);
  let pwdDescription = '';

  const generateNewPassword = () => {
    const pwd =
      rangeValue > 3
        ? generatePassword(passwordProps, rangeValue)
        : generatePassword(passwordProps, 3);

    // const pwd = generatePassword(passwordProps, rangeValue); //passwordProps get this props from Container
    setPassword(pwd);
  };

  const setBackgroundColor = (password) => {
    if (password && password.length >= 0 && password.length <= 5) {
      pwdDescription = 'Bad Password';
      return '#cb4734';
    } else if (password && password.length >= 6 && password.length <= 10) {
      pwdDescription = 'Weak Password';
      return '#f07d58';
    } else if (password && password.length > 10) {
      pwdDescription = 'Strong Password';
      return '#55a95d';
    } else {
      return '#cb473e';
    }
  };

  const copyClipBoard = (e) => {
    e.preventDefault();
    copyToClipBoard(passwordRef.current);
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 2000);
  };

  const onSelectTag = (e) => {
    setType(e.target.value);
  };
  // console.log(type);

  const btnReload = {
    className: 'copy-btn',
    iconClass: 'fas fa-sync-alt',
    handleClick: generateNewPassword,
  };

  return (
    <>
      <div>
        <select
          name='type'
          value={type}
          onChange={onSelectTag}
          className='form-control form-control-sm'
          style={selectTagStyle}>
          <option value='password'>Random Password</option>
          <option value='pin'>PIN</option>
        </select>
      </div>
      <div className='row'>
        <div
          className='col-12 password-display-container'
          style={{backgroundColor: setBackgroundColor(password)}}>
          <div style={{width: '100%'}}>
            <div className='password-display'>
              <input
                ref={passwordRef}
                readOnly
                value={password}
                type='text'
                className='password-display-input'
              />
            </div>
            <div className='password-description'>
              <>
                {password && password.length > 10 ? (
                  <>
                    <i className='fas fa-check-circle'></i> {pwdDescription}
                  </>
                ) : (
                  <>
                    <i className='fas fa-exclamation-circle'></i>{' '}
                    {pwdDescription}
                  </>
                )}
              </>
            </div>
          </div>
          <div className='password-display-icons'>
            <Button
              className='copy-btn'
              handleClick={copyClipBoard}
              iconClass='far fa-copy'
            />
            <Button {...btnReload} />
            <Tooltip
              message='Copied'
              position='left'
              displayTooltip={tooltip}
            />
          </div>
        </div>
      </div>
      <Container
        type={type}
        setPassword={setPassword}
        setRange={setRange}
        setPasswordProps={setPasswordProps}
        passwordRef={passwordRef}
      />
    </>
  );
};

const selectTagStyle = {
  backgroundColor: 'inherit',
  color: '#506175',
  width: '20%',
  height: 'auto',
  marginLeft: '-4px',
};

export default Display;
