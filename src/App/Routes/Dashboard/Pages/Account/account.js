import React, { Component } from 'react';

class Account extends Component {
    render() {
        return (
            <div className="Account">
                <div className="gallery">
                    <img src="https://cdnw.elicdn.com/Blog/wp-content/uploads/2019/02/32423.jpg" />
                </div>
                <form>
                    <input name="phone"></input>
                    <input name="name"></input>
                    <input name="profileImage"></input>
                    <input name="placeTitle"></input>
                    <input name="placeImage"></input>
                    <input name="placeDetail"></input>
                    <input name="placeTagTitle" enabled="false"></input>
                </form>
            </div>
        );
    }
}

export default Account;