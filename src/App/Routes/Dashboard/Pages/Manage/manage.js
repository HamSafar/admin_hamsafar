import React, { Component } from 'react';

import Table from './Table'
import './manage.scss'
import MenuButton from './MenuButton'

import columns from './columns.json'

//db
import comments from './db/comments.json'
import places from './db/places.json'
import events from './db/events.json'
import ads from './db/ads.json'

const titles = [
    { title: [ "Comments", "نظرات" ] },
    { title: [ "Places", "مکان های من"] }, //doesn't need current place to be sent as args
    { title: [ "My Advertises", "تبلیفات های من" ] },
    { title: [ "My Events", "رویداد های من" ] }
]

// This is a Container
class Manage extends Component {

    state = {
        index: 0, //change it with flyout-select-menu
        data: ''
    }

    changeData = (data) => this.setState({ data })

    render() {
        
        const { prefs: { theme, lang } } = this.props
        const { index } = this.state
        return (
            <div className="Manage">
                <div className="options" style={{ direction: lang? 'rtl':'ltr' }}>
                    <MenuButton titles={titles} lang={lang} theme={theme}  />
                </div>
                <div className="tableWrapper" style={{ direction: lang? 'rtl':'ltr' }}>
                    <Table theme={theme} lang={lang}
                        title={titles[index].title[lang]}
                        columns={columns.comments} 
                        data={comments} //get this data from getData
                    />
                </div>
                <div className="adButton"></div>
            </div>
        );
    }
}

export default Manage;