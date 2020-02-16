import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const MenuButton = (props) => {

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
    const [item, setItem] = React.useState((props.list[props.index] || null))

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (listItem, i) => {
        setItem((listItem || item))
        setAnchorEl(null);
        if(listItem && listItem !== item)
            props.setIndex(i)
    };

    const renderMenuItems = (list) => 
        list.length && list.map((item,i) => 
            <MenuItem onClick={() => handleClose(item, i)} key={i}>
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
                onClose={() => handleClose(null)}
            >
                
                { renderMenuItems(props.list) }
            </Menu>
        </ThemeProvider>
    );
}

export default MenuButton