import React, { Component } from 'react';
import { gql } from 'apollo-boost'
import client from '../../../../../gqlCli'

import './account.scss'

class Account extends Component {

    state = {
        username: null, name: null, placeHeader: null, placePicture: null, placeDetail: null, placeTagTitle: null, placeId: null
    }

    updateWithRes = (res,state) => {
        const i = this.props.place.index

        const newState = (state === "LOAD") ? { 
            name: res.data.adminData.name || null,
            username: res.data.adminData.username || null,
            placeId: res.data.placesData && res.data.placesData.length && res.data.placesData[i].id || null, //for mount only - read only
            placeTitle: res.data.placesData && res.data.placesData.length && res.data.placesData[i].title || null,
            placeHeader: res.data.placesData && res.data.placesData.length && res.data.placesData[i].header || null,
            placePicture: res.data.placesData && res.data.placesData.length && res.data.placesData[i].pictures.length > 0 ? res.data.placesData[i].pictures[0].path : null,
            placeDetail: res.data.placesData && res.data.placesData.length && res.data.placesData[i].detail || null,
            placeTagTitle: res.data.placesData && res.data.placesData.length && res.data.placesData[i].tag? res.data.placesData.length && res.data.placesData[i].tag.title : null,
        } : {
            name: res.data.adminData.name || null,
            username: res.data.adminData.username || null,
            placeId: res.data.placesData.id || null, //for mount only - read only
            placeTitle: res.data.placesData.title || null,
            placeHeader: res.data.placesData.header || null,
            placePicture: res.data.placesData.pictures.length > 0 ? res.data.placesData.pictures[0].path : null,
            placeDetail: res.data.placesData.detail || null,
            placeTagTitle: res.data.placesData.tag? res.data.placesData.tag.title : null,
        }

        this.setState({ ...this.state, ...newState })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const adminId = this.props.user.id
        const { 
            /* username, */ name, placeId,
            placeHeader, /* placePicture, */ placeDetail 
        } = this.state // controlled form

        const q = placeId? (
            gql`
                mutation EditProfile($adminId: String!, $name: String!, $placeId: String!, $placeHeader: String!, $placeDetail: String!) {
                    adminData: editAdminById(adminId: $adminId, name: $name) {
                        name
                        username
                    }
                    placeData: editPlace(placeId: $placeId, header: $placeHeader, detail: $placeDetail) {
                        id
                        title
                        header
                        detail
                        pictures {
                            path
                        }
                        tag {
                            title
                        }
                    }
                }
            `
        ) : (
            gql`
                mutation EditProfile($adminId: String!, $name: String!) {
                    adminData: editAdminById(adminId: $adminId, name: $name) {
                        name
                        username
                    }
                }
            `
        )

        client.mutate({
            variables: { adminId, placeId, name, header: placeHeader, detail: placeDetail },
            mutation: q
        }).then(res => {
            this.updateWithRes(res,"UPDATE")
        }).catch(e => 
            console.log("Error editing Profile", e)    
        )
    }

    componentDidMount() {
        const adminId = this.props.user.id
        const placeIndex = this.props.place.index

        if(adminId) client.query({
            variables: { adminId, placeIndex },
            query: gql`
                query Profile($adminId: String!, $placeIndex: Int!) {
                    adminData: adminById(adminId: $adminId) {
                        name
                        username
                    }
                    placeData: allAdminsPlacesBySizeAndOffset(adminId: $adminId, size: 1, offset: $placeIndex) {
						id
                        title
                        header
                        detail
						pictures {
                            path
                        }
						tag {
                            title
                        }
					}
                }
            `
        }).then(res => { console.log("account res", res)
            this.updateWithRes(res,"LOAD")
        }).catch(e => 
            console.log('Error in getting Profile', e)
        )
    }

    handleChange = (e) => {
        switch(e.target.name) {
            case 'name': this.setState({ name: e.target.value }); return;
            case 'placeHeader': this.setState({ placeHeader: e.target.value }); return;
            case 'plcaeDetail': this.setState({ placeDetail: e.target.value }); return;
            case 'username': this.setState({ username: e.target.value }); return;
            case 'placeTagTitle': this.setState({ placeTagTitle: e.target.value }); return;
            default: console.log("accout: field disabled!"); return;
        }
    }

    render() {

        const { 
            username, name, /* profilePicture, */ placeHeader, /* placePicture, */ placeTagTitle, placeDetail 
        } = this.state

        return (
            <div className="Account">
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div className="placePicture">
                        <img src="https://cdnw.elicdn.com/Blog/wp-content/uploads/2019/02/32423.jpg" />
                    </div>
                    <div className="inputs">
                        <input name="username" value={username} enabled="false" onChange={e => this.handleChange(e)} ></input>
                        <input name="name" value={name} onChange={e => this.handleChange(e)} ></input>
                        <input name="placeHeader" value={placeHeader} onChange={e => this.handleChange(e)} ></input>
                        <input name="placeTagTitle" value={placeTagTitle} enabled="false" onChange={e => this.handleChange(e)}  ></input>
                        <input name="placeDetail" value={placeDetail} onChange={e => this.handleChange(e)} ></input>
                        <button type="submit">Submit Changes</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Account;