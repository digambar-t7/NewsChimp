import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 9,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults:0
    };
  }

  // this method is need for infinite scroll function
  fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles : this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page : this.state.page + 1
    });
  }

  capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  async componentDidMount() {
    this.updateNews();
  }

  updateNews = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(20);
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      page : this.state.page+1
    });
    this.props.setProgress(100);
  };

  render() {
    return (
      <>
        <h1 style={{ marginTop: "4rem" }} className="text-center">
          Top {this.capitalizeFirstLetter(this.props.category)} Headlines from NewsChimp
        </h1>

        <hr />

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4><Spinner/></h4>}
        >
          {/* target item for infinite scroll */}
          <div className="container">

          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 60) : ""}
                    desc={
                      element.description
                      ? element.description.slice(0, 130)
                        : ""
                    }
                    image={element.urlToImage}
                    url={element.url}
                    author={element.author?element.author:'Unknown'}
                    time={new Date(element.publishedAt).toGMTString()}
                    source={element.source.name}
                    />
                </div>
              );
            })}
          </div>
            </div>
          {/* end of target item for infinite scroll */}
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
