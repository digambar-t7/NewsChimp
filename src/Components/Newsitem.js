import React, { Component } from "react";

export class Newsitem extends Component {
  render() {

    // extracting some fields|variables from props
    let {title,desc,image,url} = this.props;

    return (
      <>
        <div className="card" style={{width: "18rem"}}>
          <img src={image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {desc}
            </p>
            <a href={url} rel="noreferrer" target='_blank' style={{textDecoration:"none"}}>
              read more...
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default Newsitem;
