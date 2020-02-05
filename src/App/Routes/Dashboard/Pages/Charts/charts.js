import React, { Component } from 'react';

// var today = new Date();

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
                hour: null
            },
        },
    }

    render() {
        return (
            <div className="Charts">
                <form className="filters">
                    
                </form>
                <div className="chartWrapper">

                </div>
            </div>
        );
    }
}

export default Charts;