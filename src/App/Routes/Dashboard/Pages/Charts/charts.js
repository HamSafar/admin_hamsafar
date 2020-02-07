import React, { Component } from 'react';

// var today = new ../Manage/table

import './charts.scss'
import Line from './graphs/line'
import data from './data.json'

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
            } 
        }
    }

    render() {
        const { prefs: { theme } } = this.props

        return (
            <div className="Charts">
                <div className="chartWrapper">
                    <Line data={data} theme={theme} />
                </div>
            </div>
        );
    }
}

export default Charts;