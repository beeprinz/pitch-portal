import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { updateCommentArea, postComment, intitialRender } from "./CommentsActions";
import Cookies from "cookies-js";
import axios from "axios";
import Moment from 'react-moment';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:'',
      names:'',
      comment:'',
      date:''
    };

    this.renderComments = this.renderComments.bind(this);
    this.handleCommentInput = this.handleCommentInput.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  renderComments() {
    console.log('render stuff')
    const projectId = "5a9a00b2c196dc198837e5b0";
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
        const date = data.map(item => item.date)
        this.setState({
          text: text.map(item => item),
          names: names.map(item => item),
          date: date.map(item => item)
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  handleCommentInput(event) {
    const { dispatch } = this.props;
    const value = event.target.value;
    this.setState({
      comment:value
    })
    // dispatch(updateCommentArea(value));
  }

  handleCommentSubmit(event) {
    const { dispatch } = this.props
    const comment = this.state.comment
    const projectId = "5a9a00b2c196dc198837e5b0"
    const userId = "5a989f3f832c164290401a85"
    let data = [];

    axios.post(`http://localhost:3000/api/projects/${projectId}/comment`, {
      "text": comment,
      "date": new Date(),
      "projectId": projectId,
      "userId": userId
    })
    .then((response) => {
      console.log(response)
      this.renderComments()
      this.setState({
        comment:''
      })
    })
    .catch(function (error) {
      console.log(error);
    })
    // dispatch(postComment());
  }

  componentWillMount(){
    this.renderComments()
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
                  <label htmlFor="exampleFormControlTextarea1">Comment:</label>
                  <textarea
                    onChange={this.handleCommentInput}
                    value={this.state.comment}
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
                  if(index <= 4){
                return (
                <div key={index} className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>{item}</p>
                  <footer className="blockquote-footer">{this.state.names[index]}{" "}  
                  <Moment format="MM/DD/YYYY hh:mm a">{this.state.date[index]}</Moment>
                  </footer>
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