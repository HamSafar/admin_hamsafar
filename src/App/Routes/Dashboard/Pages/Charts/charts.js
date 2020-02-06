import React, { Component } from 'react';

import Table from './graphs/table'
// var today = new Date();

import './charts.scss'

class Charts extends Component {
    state = {
        dateAndTime: {
            from: {
                year: null,
                month: null,
                day: null,
                hour: null
            }, 
            to: {
                year: null,
                month: null,
                day: null,
                hour: null,
            },
        },
    }

    render() {
        const { pref: { theme } } = this.props
        return (
            <div className="Charts">
                <div className="chartWrapper">
                    <Table theme={theme} />
                </div>
            </div>
        );
    }
}

export default Charts;