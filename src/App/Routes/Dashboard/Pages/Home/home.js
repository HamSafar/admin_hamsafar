import React, { Component } from 'react';

import Radar from './graphs/radar'
import Line from './graphs/line'
import Bar from './graphs/bar'

import { Meter } from 'grommet';

import './home.scss'
import data from './data.json'
import colors from '../../../../../static/colors.scss'

// Container
class Home extends Component {
    render() {
        const { prefs: { lang, theme } } = this.props

        const { checkInPer, viewPer } = { checkInPer: 60, viewPer: 80 } //color by percentage please
 
        return (
            <div className="Home">
                <div className="content">
                    <div className="HeadPanel">
                        <div className="panelBox" style={{ backgroundColor: theme? 'rgb(51, 42, 124)':`${colors.accentTeal}99` }}>
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
                        <div className="panelBox" style={{ backgroundColor: theme? 'rgb(71, 62, 144)':`${colors.accentPurple}99` }}>
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
                        <div className="panelBox" style={{ backgroundColor: theme? 'rgb(91, 82, 164)':`${colors.accentGreen}99` }}>
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
                        <div className="statBox checkInStats" style={{ background: theme? 'rgb(51, 42, 124)':'rgb(246, 81, 100)' }}>
                            <div className="statTitle">
                                Checkins
                            </div>
                            <div className="statMeter">
                                <Meter type="circle" round={true} size="xxsmall" thickness="xsmall"
                                    values={[{
                                        color: '#fff',
                                        value: checkInPer,
                                        onClick: () => {}
                                    }]}
                                    aria-label={checkInPer}
                                />
                                <span> 82 </span>
                            </div>
                            <div className="statContent">
                                <span>max 132</span>
                                <div className="statNow">
                                    69
                                </div>
                            </div>
                        </div>
                        <div className="statBox viewStats" style={{ background: theme? 'rgb(51, 42, 124)':'rgb(112, 51, 255)' }}>
                            <div className="statTitle">
                                Views
                            </div>
                            <div className="statMeter">
                                <Meter type="circle" round={true} size="xxsmall" thickness="xsmall"
                                    values={[{
                                        color: '#fff',
                                        value: viewPer,
                                        onClick: () => {}
                                    }]}
                                    aria-label={viewPer}
                                />
                                <span> 75 </span>
                            </div>
                            <div className="statContent">
                                <span>max 99</span>
                                <div className="statNow">
                                    89
                                </div>
                            </div>
                        </div>
                        <div className="statBox viewStats" style={{ background: theme? 'rgb(51, 42, 124)':'rgb(78, 124, 255)' }}>
                            <div className="statTitle">
                                Comment
                            </div>
                            <div className="statMeter">
                                <Meter type="circle" round={true} size="xxsmall" thickness="xsmall"
                                    values={[{
                                        color: '#fff',
                                        value: viewPer,
                                        onClick: () => {}
                                    }]}
                                    aria-label={viewPer}
                                />
                                <span> 60 </span>
                            </div>
                            <div className="statContent">
                                <span>max 99</span>
                                <div className="statNow">
                                    89
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;