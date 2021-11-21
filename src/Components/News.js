import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  // this method is need for infinite scroll function
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(page + 1);
  };

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  useEffect(() => {
    document.title = capitalizeFirstLetter(props.category) + "| NewsChimp";
    updateNews();
  }, []);

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    // props.setProgress(20);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setPage(page + 1);
    props.setProgress(100);
  };

  return (
    <>
      <h1 style={{ marginTop: "4rem" }} className="text-center">
        Top {capitalizeFirstLetter(props.category)} Headlines from NewsChimp
      </h1>

      <hr />

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <h4>
            <Spinner />
          </h4>
        }
      >
        {/* target item for infinite scroll */}
        <div className="container">
          <div className="row">
            {articles.map((element) => {
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
                    author={element.author ? element.author : "Unknown"}
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
};

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 9,
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
