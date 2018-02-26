import React, { Component } from "react";
import { Link } from "react-router-dom";
import { updateCommentArea, postComment } from "./CommentsActions";
import Cookies from "cookies-js";
import axios from "axios";
// import Websocket from 'react-websocket';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:'',
      names:''
    };

    // this.handleData = this.handleData.bind(this);
    this.handleCommentInput = this.handleCommentInput.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }


  // handleData(data) {
  //   console.log(data)
  //   let result = JSON.parse(data);
  //   this.setState({count: this.state.count + result.movement});
  // }

  handleCommentInput(event) {
    // event.preventDefault()
    const { dispatch } = this.props;
    const value = event.target.value;
    // console.log(value, "jsx file handleCommentInput");
    dispatch(updateCommentArea(value));
  }

  handleCommentSubmit(event) {
    const { dispatch } = this.props;
    const comment = this.props.comment;
    const projectId = "5a90c4b98dedb129978dfcd5";
    const userId = "5a9056aaeebd1a0d455ebad6"
    axios.post(`http://localhost:3000/api/projects/${projectId}/comment`, {
      "text": comment,
      "date": new Date(),
      "projectId": projectId,
      "userId": userId
    })
    .then(function (response) {
      console.log('Post success')
    })
    .catch(function (error) {
      console.log(error);
    });
    dispatch(postComment());
  }


  componentWillMount() {
    const projectId = "5a90c4b98dedb129978dfcd5";
    let data = [];
    axios
      .get(`http://localhost:3000/api/projects/${projectId}/comment`)
      .then(res => {
        data = res.data
        return Promise.all(res.data.reverse().map(item => axios.get(`http://localhost:3000/api/users/${item.userId}`)))
      })
      .then(promises => {
        const names = promises.map(item => item.data.firstName)
        const text = data.map(item => item.text)
        // console.log({ text, names }) 
        // text.map(item => console.log(item))
        this.setState({
          text:text.map(item => item),
          names:names.map(item => item)
        })
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Hello World - PitchDetail</h1>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">Project Comments</div>
              <div className="card-body">
                <div className="form-group">
                {/* <Websocket url='ws://echo.websocket.org' onMessage={this.handleData}/> */}
                  <label htmlFor="exampleFormControlTextarea1">Comment:</label>
                  <textarea
                    onChange={this.handleCommentInput}
                    value={this.props.comment}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  />
                  <button
                    onClick={this.handleCommentSubmit}
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ marginTop: 10 + "px", marginLeft: 75 + "%" }}
                  >
                    Send
                  </button>
                </div>
                <hr />

                {
                !!this.state.text && this.state.text.map((item, index)=>{
                  if(index <= 5){
                return (
                <div key={index} className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>{item}</p>
                  <footer className="blockquote-footer">{this.state.names[index]}</footer>
                </blockquote>
                </div>
                )
              }
              })
              }
              
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}