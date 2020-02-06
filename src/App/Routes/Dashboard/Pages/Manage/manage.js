import React, { Component } from 'react';

import Table from './table'
import './manage.scss'

import columns from './columns.json'

//db
import comments from './comments.json'
import places from './places.json'
import events from './events.json'
import ads from './ads.json'

const titles = [
    { title: [ "Comments", "نظرات" ] },
    { title: [ "Places", "مکان های من"] }, //doesn't need current place to be sent as args
    { title: [ "My Advertises", "تبلیفات های من" ] },
    { title: [ "My Events", "رویداد های من" ] }
]

// This is a Container
class Manage extends Component {

    state = {
        index: 0 //change it with flyout-select-menu
    }

    render() {
        const { prefs: { theme, lang } } = this.props
        const { index } = this.state
        return (
            <div className="Manage">
                <div className="options"></div>
                <div className="tableWrapper">
                    <Table theme={theme} 
                        title={titles[index].title[lang]}
                        columns={[
                            { title: "Adı", field: "name" },
                            { title: "Soyadı", field: "surname" },
                            { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
                            {
                                title: "Doğum Yeri",
                                field: "birthCity",
                                lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
                            }
                        ]} 
                        data={[
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }
                        ]} 
                    />
                </div>
                <div className="adButton"></div>
            </div>
        );
    }
}

export default Manage;