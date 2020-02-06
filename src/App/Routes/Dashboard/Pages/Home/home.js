import React, { Component } from 'react';

import Radar from './graphs/radar'
import Line from './graphs/line'
import Bar from './graphs/bar'

import { Meter } from 'grommet';

import './home.scss'
import data from './data.json'
import colors from '../../../../../static/colors.scss'

import getAllData from './getAllData'

// Container get Some checkins comments books views
class Home extends Component {

    state = {
        data: ''
    }

    changeData = (data) => this.setState({ data })

    UNSAFE_componentWillMount() {
        const { user } = this.props
        getAllData(this.changeData, user.id)
    }

    render() {
        const { prefs: { lang, theme }, strings } = this.props

        const { checkIns, views, books } = { checkIns: 60, views: 80, books: 40 } // by a week
        const { maxCheckIns, maxViews, maxBooks } = { maxCheckIns: 70, maxViews: 123, maxBooks: 90 }

        var { checkInPer, viewPer, bookPer } = { 
            checkInPer: (checkIns/maxCheckIns*100.), 
            viewPer: (views/maxViews*100.),
            bookPer: (books/maxBooks*100.) 
        }
 
        return (
            <div className="Home">
                <div className="content">
                    <div className="HeadPanel">
                        <div className="panelBox" style={{ backgroundColor: theme? 'rgb(51, 42, 124)':`${colors.accentTeal}99` }}>
                            <div className="panelStats">
                                10.07%
                                <span>
                                    {strings.processes.checkins[lang]}
                                </span>
                                <div className="panelDetails">
                                    +21 % 
                                </div>
                            </div>
                            <div className="lineContainer" >
                                <Line data={data.line0} theme={theme} lang={lang} color={colors.accentTeal} />
                            </div>
                        </div>
                        <div className="panelBox" style={{ backgroundColor: theme? 'rgb(71, 62, 144)':`${colors.accentPurple}99` }}>
                            <div className="panelStats">
                                2.79%
                                <span>
                                    {strings.processes.books[lang]}
                                </span>
                                <div className="panelDetails">
                                    -12 %
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
                                    {strings.processes.views[lang]}
                                </span>
                                <div className="panelDetails">
                                    +3 %
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
                        <div className="totalCounts">
                            <div className="totalBox" style={{ background: theme? 'rgb(81, 72, 154)':'rgb(222, 67, 83)' }}>
                                {strings.totals.total_comments[lang]}
                                <span> 25 </span>
                            </div>
                            <div className="totalBox" style={{ background: theme? 'rgb(81, 72, 154)':'rgb(115, 202, 240)' }}>
                                {strings.totals.total_books[lang]}
                                <span> 81 </span>
                            </div>
                            <div className="totalBox" style={{ background: theme? 'rgb(81, 72, 154)':'rgb(122, 197, 38)' }}>
                                {strings.totals.total_views[lang]}
                                <span> 122 </span>
                            </div>
                            <div className="totalBox" style={{ background: theme? 'rgb(81, 72, 154)':'rgb(235, 142, 0)' }}>
                                {strings.totals.total_checkins[lang]}
                                <span> 68 </span>
                            </div>
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
                        <div className="statTitle">
                            {strings.stats.title[lang]}
                        </div>
                        <div className="statBox" style={{ background: theme? 'rgb(51, 42, 124)':'rgb(246, 81, 100)' }}>
                            <div className="statTitle">
                                {strings.stats.checkins[lang]}
                            </div>
                            <div className="statMeter">
                                <Meter type="circle" round={true} size="xxsmall" thickness="xsmall"
                                    values={[{
                                        color: '#fff',
                                        value: checkInPer,
                                        onClick: () => {}
                                    }]}
                                />
                                <span> {parseInt(checkInPer)} </span>
                            </div>
                            <div className="statContent">
                                <span>max {maxCheckIns}</span>
                                <div className="statNow">
                                    {checkIns}
                                </div>
                            </div>
                        </div>
                        <div className="statBox" style={{ background: theme? 'rgb(51, 42, 124)':'rgb(112, 51, 255)' }}>
                            <div className="statTitle">
                                {strings.stats.views[lang]}
                            </div>
                            <div className="statMeter">
                                <Meter type="circle" round={true} size="xxsmall" thickness="xsmall"
                                    values={[{
                                        color: '#fff',
                                        value: viewPer,
                                        onClick: () => {}
                                    }]}
                                />
                                <span> {parseInt(viewPer)} </span>
                            </div>
                            <div className="statContent">
                                <span>max {maxViews}</span>
                                <div className="statNow">
                                    {views}
                                </div>
                            </div>
                        </div>
                        <div className="statBox" style={{ background: theme? 'rgb(51, 42, 124)':'rgb(78, 124, 255)' }}>
                            <div className="statTitle">
                                {strings.stats.booked[lang]}
                            </div>
                            <div className="statMeter">
                                <Meter type="circle" round={true} size="xxsmall" thickness="xsmall"
                                    values={[{
                                        color: '#fff',
                                        value: bookPer,
                                        onClick: () => {}
                                    }]}
                                />
                                <span> {parseInt(viewPer)} </span>
                            </div>
                            <div className="statContent">
                                <span>max {maxBooks}</span>
                                <div className="statNow">
                                    {books}
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