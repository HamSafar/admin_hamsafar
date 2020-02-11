import React, { Component } from 'react';
import { GET_PROFILE, UPDATE_PROFILE } from './actions'

import './account.scss'

class Account extends Component {

    state = {
        username: null, name: null, placeHeader: null, placePicture: null, placeDetail: null, placeTagTitle: null, placeId: null
    }    

    handleSubmit = (e, updateProfile, adminId, placeId, toUpdate) => {
        e.preventDefault()

        const {
            adminName, 
            placeHeader, placeDetail
        } = toUpdate

        updateProfile({ variables: {
            adminId, adminName,
            placeId, placeHeader, placeDetail
        }})

        // clear state in future
    }

    render() {

        const adminId = this.props.user.id
        const placeIndex = this.props.place.index

        return <Query query={GET_PROFILE} variables={{ adminId, placeIndex }} >
            {({ loading, error, data: { adminData, placeData }}) => {

                if (loading) return <p>Loading...</p>
                if (error) return <p>Error! {console.log(error)}</p>

                const {
                    name: adminName, username: adminUsername
                } = adminData

                const {
                    id: placeId, title: placeTitle, header: placeHeader, detail: placeDetail, pictures: { path: placePicPath }, tag: { title: placeTagTitle }
                } = placeData

                var adminNameInput, placeHeaderInput, placeDetailInput

                return <Mutation mutation={UPDATE_PROFILE} variables={{}}>
                    {updateProfile => (

                        <div className="Account">
                            <form onSubmit={e => 
                                this.handleSubmit(e, updateProfile, adminId, placeId, { 
                                    adminName: adminNameInput.value, 
                                    placeHeader: placeHeaderInput.value, 
                                    placeDetail: placeDetailInput.value 
                                })}
                            >
                                <div className="placePicture">
                                    <img src={placePicPath} />
                                </div>
                                <div className="inputs">
                                    نام کاربری
                                    <input name="username" value={adminUsername} disabled="disabled" ></input>
                                    نام شما
                                    <input name="name" value={adminName} ref={node => { adminNameInput = node }} ></input>
                                    محل
                                    <input name="placeTitle" value={placeTitle} disabled="disabled" ></input>
                                    نام محل
                                    <input name="placeHeader" value={placeHeader} ref={node => { placeHeaderInput = node }} ></input>
                                    تگ محل حاضر
                                    <input name="placeTagTitle" value={placeTagTitle} disabled="disabled" ></input>
                                    متن برای محل
                                    <input name="placeDetail" value={placeDetail} ref={node => { placeDetailInput = node }} ></input>
                                    <button type="submit">Submit Changes</button>
                                </div>
                            </form>
                        </div>
                    )}
                </Mutation>
            }}
        </Query>
    }
}

export default Account;