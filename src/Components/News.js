import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      page : 1,
      loading: false,
    };
  }

  async componentDidMount(){
    let url = 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=69278872befb40d381a1342f606c0edd&page=1&pageSize=12';
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles : parsedData.articles,
      totalResults : parsedData.totalResults
    })
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=69278872befb40d381a1342f606c0edd&page=${this.state.page-1}&pageSize=12`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles : parsedData.articles2,
      page : this.state.page-1
    })
    console.log(this.state.page)
  }

  handleNextClick = async () => {
    if (this.state.page <= Math.ceil(this.state.totalResults/12)){
      let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=69278872befb40d381a1342f606c0edd&page=${this.state.page+1}&pageSize=12`; 
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles : parsedData.articles, 
        page : this.state.page+1
      })
      console.log(this.state.page)
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h2 style={{ textDecoration: "underline", marginTop: "4rem" }}>
          Headlines for the day
        </h2>
        
        <div className="row">
          {this.state.articles.map((element)=>{
          return <div className="col-md-4 my-3" key={element.url}>
            <Newsitem title={element.title.slice(0,60)+'...'} desc={element.description.slice(0,130)} image = {element.urlToImage} url={element.url} />
          </div>
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button className="btn btn-primary" disabled={this.state.page<=1} onClick={this.handlePrevClick}>&larr;Previous</button>
          <button className="btn btn-primary" onClick={this.handleNextClick}>Next&rarr;</button>
        </div>

      </div>
    );
  }
}

export default News;
