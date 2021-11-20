import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    // extracting some fields|variables from props
    let { title, desc, image, url, author, time, source } = this.props;

    return (
      <>
        <div className="card">
          <img src={image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} at {time}
              </small>
            </p>
            <a href={url} rel="noreferrer" target="_blank">
              read more...
            </a>
          </div>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
        </div>
      </>
    );
  }
}

export default Newsitem;
