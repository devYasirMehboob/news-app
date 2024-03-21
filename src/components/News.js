import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const myStyle = {
    overflow: 'hidden'
};
const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    //    document.title = `${capitalize(props.category)} - News Umbrella`;
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(20);
        const { pageSize, category, apiKey, page } = props;
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        setLoading(true);
        const response = await fetch(url);
        props.setProgress(50);
        const data = await response.json();
        props.setProgress(70);
        setLoading(false);
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        props.setProgress(100);
    }
    const fetchMoreData = async () => {
        const { pageSize, category, apiKey } = props;
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page+1}&pageSize=${pageSize}`;
        setPage(page+1);
        const response = await fetch(url);
        const data = await response.json();
        setArticles(articles.concat(data.articles));
        setTotalResults(data.totalResults);
    };

    useEffect(() => {
        updateNews();
        if (props.apiKey) {
            updateNews();
        } else {
            console.error("API key is not defined.");
        }
    }, [])
    return (
        <div className='container my-4'>
            <h2 className='text-center mt-5 mb-4 pt-5'>News Umbrella - Top {capitalize(props.category)} HeadLines</h2>
            {loading && <Loading />}
            <InfiniteScroll style={myStyle}
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Loading />}>
                <div className='row'>
                    {articles.map((element) => (
                        <div className='col-md-4 my-2' key={element.url}>
                            <NewsItem
                                title={element.title ? element.title.slice(0, 40) : ''}
                                description={element.description ? element.description.slice(0, 80) : ''}
                                imageUrl={element.urlToImage ? element.urlToImage : 'https://ichef.bbci.co.uk/news/1024/branded_news/8900/production/_132927053_mediaitem132927052.jpg'}
                                url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}

News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'sports'
}
News.propTypes = {
    category: PropTypes.string,
    country: PropTypes.string,
    pageSize: PropTypes.number

}
export default News;
