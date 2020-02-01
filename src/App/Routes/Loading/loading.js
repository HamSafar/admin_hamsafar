import React from 'react';
import { withRouter } from 'react-router-dom'

import './loading.scss'

const Loading = (props) => {

    if(props.user.isAuth)
        props.history.push('/dashboard')
    else props.history.push('/login')

    return (
        <div className="Loading">
            Loading...
        </div>
    );
}

export default withRouter(Loading);