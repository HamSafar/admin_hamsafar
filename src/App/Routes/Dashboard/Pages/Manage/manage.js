import React, { Component } from 'react';

import Table from './table'
import './manage.scss'

// This is a Container
class Manage extends Component {

    render() {
        const { prefs: { theme } } = this.props
        return (
            <div className="Manage">
                <div className="options"></div>
                <div className="tableWrapper">
                    <Table data={{}}columns={{}} theme={theme} />
                </div>
                <div className="adButton"></div>
            </div>
        );
    }
}

export default Manage;