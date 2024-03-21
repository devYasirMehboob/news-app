import '../App.css';
import React from 'react'

const NewsItem = (props) => {
        let { title, description, imageUrl, url, author, date, source} = props;
        return (
            <>
                <div className="card newsCard mb-3">
                    <span className="position-absolute d-inline-block translate-middle text-dark badge rounded bg-warning" style={{zIndex: '100', top:'0', left: '90%'}}>
                       {source}
                    </span>
                    <div className='newsImage'>
                        <img src={imageUrl} className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text">
                            <small className="text-body-secondary">
                                By {!author ? 'Unknown' : author} <br/> 
                                {new Date(date).toGMTString()}
                               
                            </small>
                        </p>
                        <a href={url} className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </>
        )
    }

export default NewsItem;