import React, { Component } from 'react';
import { gql } from 'apollo-boost'
import client from '../../../../../gqlCli'

import './account.scss'

class Account extends Component {

    state = {
        username: '', name: '', placeTitle: '', placePicture: '', placeDetail: '', placeTagTitle: ''
    }

    updateWithRes = res => {
        const newState = { 
            name: res.data.profile.name || '',
            username: res.data.profile.username || '',
            placeTitle: res.data.placesData.title || '',
            placePicture: res.data.placesData.pictures.length > 0 ? res.data.placesData.pictures[0].path : '',
            placeDetail: res.data.placesData.detail || '',
            placeTagTitle: res.data.placesData.tag? res.data.placesData.tag.title : '',
        }
        this.setState({ ...this.state, ...newState })
    }

    handleSubmit = () => {
        const adminId = this.props.adminId
        const { 
            username, name,
            placeTitle, placePicture, placeDetail, placeTagTitle 
        } = this.profile

        client.mutate({
            variables: { adminId },
            mutation: gql`
                mutation EditAdmin($adminId: String!) {
                    editAdmin: editAdminById(adminId: $adminId, name: $name) {
                        name
                    }
                }
            `
        }).then(res => {
            this.updateWithRes(res)
        }).catch(e => 
            console.log("Error editing Profile", e)    
        )
    }

    UNSAFE_componentWillMount() {
        const adminId = this.props.adminId
        client.query({
            variables: { adminId },
            query: gql`
                query Profile($adminId: String!) {
                    profile: adminById(adminId: $adminId) {
                        name
                        username
                    }
                    placesData: allAdminsPlacesBySizeAndOffset(adminId: $adminId, size: 1, offset: $placeIndex) {
						title
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
        }).then(res => {
            this.updateWithRes(res)
        }).catch(e => 
            console.log('Error in getting Profile', e)
        )
    }

    render() {

        const { 
            username, name, /* profilePicture, */ placeTitle, /* placePicture, */ placeTagTitle, placeDetail 
        } = this.state

        return (
            <div className="Account">
                <form>
                    <div className="placePicture">
                        <img src="https://cdnw.elicdn.com/Blog/wp-content/uploads/2019/02/32423.jpg" />
                    </div>
                    <input name="username" value={username}></input>
                    <input name="name" value={name}></input>
                    <input name="placeTitle" value={placeTitle}></input>
                    <input name="placeTagTitle" value={placeTagTitle} enabled="false"></input>
                    <input name="placeDetail" value={placeDetail}></input>
                </form>
            </div>
        );
    }
}

export default Account;