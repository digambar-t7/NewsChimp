import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country : 'in',
    category : 'general',
    pageSize : 9
  }

  static propTypes = {
    country : PropTypes.string,
    category : PropTypes.string,
    pageSize : PropTypes.number
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      page : 1,
      loading: false,
    };
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=69278872befb40d381a1342f606c0edd&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading : true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles : parsedData.articles,
      totalResults : parsedData.totalResults,
      loading : false
    })
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=69278872befb40d381a1342f606c0edd&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;    
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles : parsedData.articles,
      page : this.state.page-1,
      loading : false
    })
    console.log(this.state.page)
  }

  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=69278872befb40d381a1342f606c0edd&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles : parsedData.articles, 
      page : this.state.page+1,
      loading : false
    })
    console.log(this.state.page)   
  }

  render() {
    return (
      <div className="container my-3">
        <h1 style={{ marginTop: "4rem" }} className='text-center' >
          Headlines for the day({this.props.category})
        </h1>

        {this.state.loading && <Spinner/>}
        
        <hr />

        <div className="row">
          {this.state.articles.map((element)=>{
          return <div className="col-md-4 my-3" key={element.url}>
            <Newsitem title={element.title?element.title.slice(0,60):''} desc={element.description?element.description.slice(0,130):''} image = {element.urlToImage} url={element.url} author = {element.author} time={new Date(element.publishedAt).toGMTString()} source = {element.source.name} />
          </div>
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button className="btn btn-primary" disabled={this.state.page<=1} onClick={this.handlePrevClick}>&larr;Previous</button>
          <button className="btn btn-primary" disabled={this.state.page+1 === Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick}>Next&rarr;</button>
        </div>

      </div>
    );
  }
}

export default News;
