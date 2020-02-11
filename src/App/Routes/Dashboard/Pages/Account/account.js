import React, { Component } from 'react';

import './account.scss'

class Account extends Component {

    handleSubmit = (e, toUpdate) => {
        e.preventDefault()

        const {
            adminData: { id: adminId },
            placeData: { id: placeId }
        } = this.props.data

        const {
            adminName, placeHeader, placeDetail
        } = toUpdate

        this.props.updateProfile({ variables: { adminId, adminName, placeId, placeHeader, placeDetail } })

        // CLEAR
    }

    render() {

        const {
            adminData: { name: adminName, username: adminUsername },
            placeData: { 
                title: placeTitle, header: placeHeader, 
                pictures: { path: placePicturePath },
                tag: { title: placeTagTitle }
            }
        } = this.props.data

        var adminNameInput, placeHeaderInput, placeDetailInput

        return (
            <div className="Account">
                <form onSubmit={e => 
                    this.handleSubmit( e, { 
                        adminName: adminNameInput.value, 
                        placeHeader: placeHeaderInput.value,
                        placeDetail: placeDetailInput.value,
                    })}
                >
                    <div className="placePicture">
                        <img src={placePicturePath} />
                    </div>
                    <div className="inputs">
                        admin username
                        <input name="adminUsername" value={adminUsername} disabled="disabled" ></input>
                        admin name
                        <input name="adminName" value={adminName} ref={node => {adminNameInput = node}} ></input>
                        place title
                        <input name="placeTitle" value={placeTitle} disabled="disabled" ></input>
                        place header
                        <input name="placeHeader" value={placeHeader} ref={node => {placeHeaderInput = node}} ></input>
                        place tag title
                        <input name="placeTagTitle" value={placeTagTitle} disabled="disabled" ></input>
                        place detail
                        <input name="placeDetail" value={placeDetail} ref={node => {placeDetailInput = node}} ></input>
                        <button type="submit">Submit Changes</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Account;