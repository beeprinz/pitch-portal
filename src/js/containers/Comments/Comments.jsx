import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { updateCommentArea , postComment } from './CommentsActions'
import Cookies from 'cookies-js'
import axios from 'axios';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null
    }

    this.handleCommentInput=this.handleCommentInput.bind(this);
    this.handleCommentSubmit=this.handleCommentSubmit.bind(this);
  }

  handleCommentInput(event){
    const { dispatch } = this.props;
    const value = event.target.value;
    console.log(value,'jsx file handleCommentInput');
    dispatch(updateCommentArea(value))
  }

  handleCommentSubmit(event){
    // event.preventDefault()
    const { dispatch } = this.props
    const comment = this.props.comment
    console.log(comment, 'jsx file handleCommentSubmit')
    dispatch(postComment(comment))
  }
  
  componentDidMount(){
    console.log('This will mount the comments from the database')
    const tempUser = '5a81ea9b270f8f13fc08adef'
    axios.get(`http://localhost:3000/api/users/${tempUser}/comments`)
    .then((res) => {

      this.setState({
        comments: res.data
      })
    })
    .catch(function(err){
        console.log(err)
    })
  }

  render() {
    console.log(this.state.comments,'this.state')
    const test = this.state.comments;

    return (

      <div className="container">

        <h1>Hello World - PitchDetail</h1>

          <div className= 'row'> 

            <div className="col">
            <div className="card">
            <div className="card-header">Project Comments
            </div>
            <div className="card-body">
            <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Comment:</label>
            <textarea onChange={this.handleCommentInput} value='' className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <button onClick={this.handleCommentSubmit} type="button" className="btn btn-primary btn-lg" style = {{marginTop: 10 +"px", marginLeft:75 + '%' }}>Send</button>
          </div>
          <hr/>

              {
                !!this.state.comments && this.state.comments.map((item)=>{
                return (
                <div key={item.id} className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>{item.text}</p>
                  <footer className="blockquote-footer">Company</footer>
                </blockquote>
                </div>
                )
              })
              }



            </div>
          </div>
              </div>
          </div>
        </div>
    );
  }
};