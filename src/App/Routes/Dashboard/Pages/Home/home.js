import React, { Component } from 'react';

import Radar from './graphs/radar'
import Line from './graphs/line'
import Bar from './graphs/bar'

import './home.scss'
import data from './data.json'
import colors from '../../../../../static/colors.scss'

// Container
class Home extends Component {
    render() {
        const { prefs: { lang, theme } } = this.props
        
        return (
            <div className="Home">
                <div className="content">
                    <div className="HeadPanel">
                        <div className="panelBox" style={{ backgroundColor: `${colors.accentTeal}99` }}>
                            <div className="panelStats">
                                2100
                                <span>
                                    total sessions
                                </span>
                                <div className="panelDetails">
                                    
                                </div>
                            </div>
                            <div className="lineContainer" >
                                <Line data={data.line0} theme={theme} lang={lang} color={colors.accentTeal} />
                            </div>
                        </div>
                        <div className="panelBox" style={{ backgroundColor: `${colors.accentPurple}99` }}>
                            <div className="panelStats">
                                1228
                                <span>
                                    total visitors
                                </span>
                                <div className="panelDetails">
                                    
                                </div>
                            </div>
                            <div className="lineContainer">
                                <Line data={data.line1} theme={theme} lang={lang} color={colors.accentPurple} />
                            </div>
                        </div>
                        <div className="panelBox" style={{ backgroundColor: `${colors.accentGreen}99` }}>
                            <div className="panelStats">
                                6.92
                                <span>
                                    time spent, hr
                                </span>
                                <div className="panelDetails">
                                    
                                </div>
                            </div>
                            <div className="lineContainer">
                                <Line data={data.line2} theme={theme} lang={lang} color={colors.accentGreen} />
                            </div>
                        </div>
                    </div>
                    <div className="BodyPanel">
                        <div className="barContainer">
                            <Bar data={data.bar} theme={theme} lang={lang} />
                        </div>
                    </div>
                </div>
                <div className="SidePanel" 
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