import React from 'react';

import './Header.css';

const Header = () => {
    return (
        <div className="row">
            <div className="col-md-12 header">
                <h1 className="h1">Random Password Generator</h1>
                <div className="col-md-12">
                    <h4>
                        Create strong passwords with Ultimo Password
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default Header;