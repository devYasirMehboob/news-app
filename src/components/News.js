import React, { Component, useState } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const myStyle = {
    overflow:'hidden'
};
class YourComponent extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'sports'
    }
    static propTypes = {
        category: PropTypes.string,
        country: PropTypes.string,
        pageSize: PropTypes.number

    }
    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.capitalize(this.props.category)} - News Umbrella`;
    }
    updateNews = async () => {
        this.props.setProgress(20);
        const { page } = this.state;
        const { pageSize, category, apiKey } = this.props;
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        this.setState({ loading: true });
        const response = await fetch(url);
        this.props.setProgress(50);
        const data = await response.json();
        this.props.setProgress(70);

        this.setState({
            loading: false,
            articles: data.articles,
            totalResults: data.totalResults
        });
        this.props.setProgress(100);
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1, });
        const { page } = this.state;
        const { pageSize, category, apiKey } = this.props;
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            articles: this.state.articles.concat(data.articles),
            totalResults: data.totalResults
        });
    };
    async componentDidMount() {
        this.updateNews();
        if (this.props.apiKey) {
            this.updateNews();
        } else {
            console.error("API key is not defined.");
        }
    }
    render() {
        return (
                <div className='container my-3'>
                    <h2 className='text-center my-4'>News Umbrella - Top {this.capitalize(this.props.category)} HeadLines</h2>
                    {this.state.loading && <Loading />}
                    <InfiniteScroll style={myStyle}
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Loading />}>
                        <div className='row'>
                            {this.state.articles.map((element) => (
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
}

export default YourComponent;
