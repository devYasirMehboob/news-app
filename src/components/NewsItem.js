import '../App.css';
import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title , description, imageUrl, url} = this.props;
        return (
            <>
                <div className="card newsCard">
                    <div className='newsImage'>
                        <img src={imageUrl} className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={url} className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </>
        )
    }
}
