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
    const [item, setItem] = React.useState((props.list[0] || null))

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (listItem) => {
        console.log(listItem)
        const currentItem = item
        setItem((listItem.__proto__ === 'Object' ? currentItem : currentItem));
        setAnchorEl(null);
    };

    const renderMenuItems = (list) => 
        list.length && list.map((item,i) => 
            <MenuItem onClick={() => handleClose(item)} key={i}>
                { item.title }
            </MenuItem>
        )

    return (
        <ThemeProvider theme={theme} >
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                { item ? item.title : props.title[props.lang] }
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                
                { renderMenuItems(props.list) }
            </Menu>
        </ThemeProvider>
    );
}