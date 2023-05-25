import React, { Component } from "react";
import NewItem from "./NewItem";

export class News extends Component {
  constructor() {
    super();
    console.log("Hello i am a cosntructor from news components");
    this.state = {
      // articles : this.articles,
      articles: [],
      loading: false,
      page : 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/everything?q=tesla&from=2023-04-25&sortBy=publishedAt&apiKey=0508abb542a44451a33bf3d1c2c95885&page=1&pageSize=20;";
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles, totalResults : parseData.totalResults });
  }

  handlePrevClick = async ()=>{
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2023-04-25&sortBy=publishedAt&apiKey=0508abb542a44451a33bf3d1c2c95885&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);

    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
    });
  }

  handleNextClick = async ()=>{
    console.log("next");
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2023-04-25&sortBy=publishedAt&apiKey=0508abb542a44451a33bf3d1c2c95885&page=${
      this.state.page + 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);

    this.setState({
      page: this.state.page + 1,
      articles: parseData.articles,
    });
  }
  }

  render() {
    return (
      <div className="container my-3">
        <h2>Gj05 News - Top Headlines</h2>

        <div className="row  ">
          {this.state.articles.map((element) => {
            // console.log(element)
            return (
              <div className="col-md-3" key={element.url}>
                <NewItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageurl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <a
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark btm-sm"
            onClick={this.handlePrevClick}>
            &larr; Previous
          </a>
          <a
            type="button"
            className="btn btn-dark btm-sm"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </a>
        </div>
      </div>
    );
  }
}

export default News;
