import React, { Component } from 'react';

class HomeComponent extends Component {
    render() {
        return (
            <div className="container">
                <h2>Login Successfull</h2>
                <div>Click button to verify tokken</div>
                <button className="btn btn-primary">Verify Token</button>
            </div>
        );
    }
}

export default HomeComponent;