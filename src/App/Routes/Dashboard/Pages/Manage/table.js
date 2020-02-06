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
        },
        typography: {
            fontFamily: 'Vazir',
        },
        direction: (this.props.lang? 'rtl':'ltr')
    })

    render() {
        const { columns, data, title } = this.props
        return (
            <div style={{ maxWidth: '100%' }}>
                <ThemeProvider theme={this.theme} >
                    <MaterialTable
                        columns={columns}
                        data={data}
                        title={title}
                    />
                </ThemeProvider>
            </div>
        );
    }
}

export default Table;