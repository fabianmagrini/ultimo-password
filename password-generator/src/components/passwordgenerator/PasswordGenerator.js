import React, { useState, useRef } from 'react';

import './PasswordGenerator.css';
import { Settings } from './settings/Settings';
import Button from '../button/Button';
import Tooltip from '../tooltip/Tooltip';
import { generatePassword, copyToClipBoard } from '../../utils/PasswordHelper';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [rangeValue, setRange] = useState();
    const [passwordProps, setPasswordProps] = useState();
    const [tooltip, setTooltip] = useState(false);
    const [type] = useState('password');
    const passwordRef = useRef(null);
    let pwdDescription = '';

    const generateNewPassword = () => {
        const pwd = rangeValue > 3 ? generatePassword(passwordProps, rangeValue) : generatePassword(passwordProps, 3);
        setPassword(pwd);
    }

    const copyClipBoard = e => {
        e.preventDefault();
        copyToClipBoard(passwordRef.current);
        setTooltip(true);
        setTimeout(() => {
            setTooltip(false);
        }, 2000);
    }

    const setBackgroundColor = password => {
        if (password && password.length === 1 && password.length <= 5) {
            pwdDescription = 'Bad password';
            return '#072448';
        } else if (password && password.length >= 6 && password.length <= 10) {
            pwdDescription = 'Weak password';
            return '#072448';
        } else if (password && password.length > 10) {
            pwdDescription = 'Strong password';
            return '#072448';
        } else {
            pwdDescription = 'Bad password';
            return '#072448';
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-12 password-display-container"
                    style={{ backgroundColor: setBackgroundColor(password) }}
                >
                    <div style={{ width: '100%' }}>
                        <div className="password-display">
                            <input 
                                ref={passwordRef}
                                type="text"
                                value={password}
                                className="password-display-input"
                                readOnly
                            />
                        </div>

                        <div className="password-description">
                            {
                                password && password.length > 10 ?
                                <>
                                    <i className="fas fa-check-circle"></i> { pwdDescription }
                                </> :
                                <>
                                    <i className="fas fa-exclamation-circle"></i> { pwdDescription }
                                </>
                            }
                        </div>
                    </div>

                    <div className="password-display-icons">
                        <Button
                            className="copy-btn"
                            iconClass="far fa-copy"
                            handleClick={copyClipBoard}
                        />
                        <Button
                            className="generate-btn"
                            iconClass="fas fa-sync-alt"
                            handleClick={() => generateNewPassword()}
                        />

                        <Tooltip 
                            message="Copied"
                            position="left"
                            displayTooltip={tooltip}
                        />
                    </div>
                </div>
            </div>

            <Settings 
                type={type}
                setPassword={setPassword}
                setRange={setRange}
                setPasswordProps={setPasswordProps}
            />

        </>
    )
}

export default PasswordGenerator;