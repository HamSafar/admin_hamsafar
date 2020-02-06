import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function SimpleMenu(props) {

    const theme =  createMuiTheme({
        palette: {
            type: (props.theme ? 'light' : 'dark'),
        },
        shape: {
            borderRadius: '1rem'
        },
        typography: {
            fontFamily: 'Vazir',
        },
        direction: (props.lang? 'rtl':'ltr')
    })

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderMenuItems = () => 
        props.titles.map((title,i) => 
            <MenuItem onClick={handleClose} key={i}>{title.title[props.lang]}</MenuItem>
        )

    return (
        <ThemeProvider theme={theme} >
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                { props.lang ? 'انتخاب موضوع' : 'Select Field' }
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                
                {renderMenuItems()}
            </Menu>
        </ThemeProvider>
    );
}