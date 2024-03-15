import React, { Component } from 'react';
import NewsItem from './NewsItem'; 
class YourComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [], 
            loading: false,
            page: 1,
           
        };
    }

        async componentDidMount() {
            const url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1b9178b9fff04fdca8f5d5a3ad98c467&pageSize=21";
            const response = await fetch(url);
            const data = await response.json();
            this.setState({
                articles: data.articles,
                totalResults: data.totalResults
            });
        }
        handlePrevClick = async () =>{
            console.log('you click prev');
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1b9178b9fff04fdca8f5d5a3ad98c467&page=${this.state.page - 1}&pageSize=21`;
            const response = await fetch(url);
            const data = await response.json();
            this.setState({
                page: this.state.page - 1,
                articles: data.articles,
            });
        }
    
        handleNextClick = async () =>{
            if(this.state.page + 1 > Math.ceil(this.state.totalResults/21)){
               const nextButtonEnd = true;
            }else{
                console.log('you click next');
                const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1b9178b9fff04fdca8f5d5a3ad98c467&page=${this.state.page + 1}&pageSize=21`;
                const response = await fetch(url);
                const data = await response.json();
                this.setState({
                    page: this.state.page + 1,
                    articles: data.articles,
                });
            }
        }

    render() {
        return (
            <>
            <div className='container my-3'>
                <h2>News Umbrella - HeadLines</h2>
                <div className='row'>
                    {this.state.articles.map((element) => (
                        <div className='col-md-4 my-2' key={element.url}>
                            <NewsItem
                                title={element.title ? element.title.slice(0, 40) : ''}
                                description={element.description ? element.description.slice(0, 80) : ''}
                                imageUrl={element.urlToImage?element.urlToImage:'https://ichef.bbci.co.uk/news/1024/branded_news/8900/production/_132927053_mediaitem132927052.jpg'}
                                url={element.url}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='container d-flex justify-content-between my-3'>
                <button disabled={this.state.page <=1 } type="button" className="btn btn-dark" onClick={this.handlePrevClick}>
                    &larr; Prevous</button>
                <button disabled={this.nextButtonEnd} type="button" className="btn btn-dark" onClick={this.handleNextClick}>
                    Next &rarr;</button>
            </div>
        </>
        );
    }
}

export default YourComponent;
