
import React, { Component } from "react";
import MaterialTable from "material-table";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

class Table extends Component {

    theme =  createMuiTheme({
        palette: {
            type: (this.props.theme ? 'light' : 'dark'),
        },
        shape: {
            borderRadius: '1rem'
        }
    })

    render() {
        return (
            <div style={{ maxWidth: '100%' }}>
                <ThemeProvider theme={this.theme}
                >
                    <MaterialTable
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
                        title="Demo Title"
                    />
                </ThemeProvider>
            </div>
        );
    }
}

export default Table;