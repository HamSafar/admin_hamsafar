import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Mailbox extends Component {
    render() {
        return (
            <div>
                <Link to="/home" target='_self' > Go </Link>
            </div>
        );
    }
}

export default Mailbox;