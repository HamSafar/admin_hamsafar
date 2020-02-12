import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faSpinner } from '@fortawesome/free-solid-svg-icons'

import './Error.scss'

const Error = ({ error, size, color }) => {
    return ( 
        <div className="Error">
            <div className="content">
                <FontAwesomeIcon icon={faExclamationTriangle} size={size} color={color} />
                <p>{error.toString()}</p>
            </div>
        </div>
    );
}
 
export default Error;