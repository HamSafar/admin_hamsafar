import React, { Component } from 'react';
import './styles.scss'

class NotFound extends Component {


    componentDidMount() {
        const { prefs: { lang }, strings: { notFound } } = this.props
        document.title = notFound.title[lang]
    }

    render() {
        const { prefs: { lang }, strings: { notFound } } = this.props

        return (
            <div className="NotFound">
                <div className="container">
                    <span className="title">404</span>
                    <span>{notFound.content[lang]}</span>
                </div>
            </div>
        );
    }
}

export default NotFound;