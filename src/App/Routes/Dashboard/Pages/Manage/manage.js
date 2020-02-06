import React, { Component } from 'react';

import Table from './table'
import './manage.scss'
import content from './content.json'

// This is a Container
class Manage extends Component {

    render() {
        const { prefs: { theme } } = this.props
        return (
            <div className="Manage">
                <div className="options"></div>
                <div className="tableWrapper">
                    <Table theme={theme} 
                        title="Name"
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