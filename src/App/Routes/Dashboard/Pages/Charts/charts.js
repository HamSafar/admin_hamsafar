import React, { Component } from 'react';

// var today = new ../Manage/table

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
        const { prefs: { theme } } = this.props
        return (
            <div className="Charts">
                <div className="chartWrapper">
                    
                </div>
            </div>
        );
    }
}

export default Charts;