import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import './Loading.scss'

const Loading = ({ size, color }) => {
    return (
        <div className="Loading">
            <CircularProgress size={size} color={color} />
        </div>
    )
}
 
export default Loading;