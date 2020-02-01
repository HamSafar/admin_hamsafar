import React, { Component } from 'react';

import './home.scss'
import data from './data.json'

import Radar from './graphs/radar'

class Home extends Component {
    render() {
        const { prefs: { lang, theme } } = this.props
        return (
            <div className="Home">
                <div className="content">
                    <div className="">
                        
                    </div>
                </div>
                <div className="sidePanel" 
                    style={ lang? 
                        { borderTopRightRadius: '1rem', left: 0 }:
                        { borderTopLeftRadius: '1rem', right: 0 }
                    }
                >
                    <div className="radarContainer">
                        <Radar data={data.radar} theme={theme} lang={lang} />
                    </div>
                    <div className="statistics">

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;