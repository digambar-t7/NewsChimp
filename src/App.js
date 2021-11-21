import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from "react-top-loading-bar";

export class App extends Component {
  pageSize = 3;

  // accessing the api key present stored in the .env.local file
  apiKey = process.env.REACT_APP_NEWS_API_KEY;

  state = {
    // declaring progress as state variable
    progress: 10,
  };

  // declaring a method to set the progress of the top loading bar
  setProgress = (progress) => {
    this.setState({
      progress: progress,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <LoadingBar color="#f11946" height={3} progress={this.state.progress} />
        <Navbar />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={this.setProgress}
                apiKey = {this.apiKey}
                key="general"
                pageSize={this.pageSize}
                country="in"
                category="general"
              />
            }
          />

          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={this.setProgress}
                apiKey = {this.apiKey}
                key="business"
                pageSize={this.pageSize}
                country="in"
                category="business"
              />
            }
          />

          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={this.setProgress}
                apiKey = {this.apiKey}
                key="entertainment"
                pageSize={this.pageSize}
                country="in"
                category="entertainment"
              />
            }
          />

          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={this.setProgress}
                apiKey = {this.apiKey}
                key="health"
                pageSize={this.pageSize}
                country="in"
                category="health"
              />
            }
          />

          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={this.setProgress}
                apiKey = {this.apiKey}
                key="science"
                pageSize={this.pageSize}
                country="in"
                category="science"
              />
            }
          />

          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={this.setProgress}
                apiKey = {this.apiKey}
                key="sports"
                pageSize={this.pageSize}
                country="in"
                category="sports"
              />
            }
          />

          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={this.setProgress}
                apiKey = {this.apiKey}
                key="technology"
                pageSize={this.pageSize}
                country="in"
                category="technology"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
