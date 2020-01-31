import React, { Component } from 'react';

import './home.scss'

class Home extends Component {
    render() {
        const { prefs: { lang } } = this.props
        return (
            <div className="Home">
                <div className="overview">

                </div>
                <div className="sidePanel" 
                    style={ lang? 
                        {
                            borderTopRightRadius: '1rem',
                            left: 0
                        }:
                        {
                            borderTopLeftRadius: '1rem',
                            right: 0
                        }
                    }
                >
                </div>
            </div>
        );
    }
}

export default Home;