import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  render() {
    return (
      <div className='container my-3'>
          <h2 style={{textDecoration:'underline',marginTop:'4rem'}}>Headlines for the day</h2>
          <div className="row">
              <div className="col-md-4 my-3"><Newsitem/></div>
              <div className="col-md-4 my-3"><Newsitem/></div>
              <div className="col-md-4 my-3"><Newsitem/></div>
              <div className="col-md-4 my-3"><Newsitem/></div>
              <div className="col-md-4 my-3"><Newsitem/></div>
              <div className="col-md-4 my-3"><Newsitem/></div>
              <div className="col-md-4 my-3"><Newsitem/></div>
          </div>
      </div>
    );
  }
}

export default News;
