import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import {  } from './PitchDetailActions'
import axios from 'axios';
import Cookies from 'cookies-js'

export default class PitchDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1>Hello World - PitchDetail</h1>

          <div className= 'row'> 

          <div className='col'>
                  <div className="card ">
            <div className="card-header">
              Project
            </div>
            <div className="card-body">
              <h4 className="card-title">cobraEDGE</h4>
              <h6>Project Id:</h6>
              <p className="card-text">5a81ee95270f8f13fc08adf8</p>
              <h6>Description:</h6>
              <p className="card-text">We need a way to eat only the edge of cobras. Hurry. Time is of the essence.</p>
              <h6>Date:</h6>
              <p className="card-text">2/12/2018</p>
              <h6>Status:</h6>
              <p className="card-text">Pending</p>
              <h6>Existing Product:</h6>
              <p className="card-text">false.</p>
              <h6>Technologies used:</h6>
              <p className="card-text">Google, Yahoo, NSA, FBI.</p>
              <h6>Goal:</h6>
              <p className="card-text">Help Children in 3rd world countries and send people to Mars.</p>
              <h6>Key Features:</h6>
              <p className="card-text">Donuts.</p>
              <h6>Example Products:</h6>
              <p className="card-text">Bopit.</p>
              <a href="#" className="btn btn-primary">Edit</a>
              <a href="#" className="btn btn-primary" style = {{marginLeft: 10 +"px"}}>Save</a>
            </div>
            <div className="card-footer text-muted">
              2 days ago
            </div>
            </div>
            </div>
            <div className="col">
            <div className="card">
            <div className="card-header">
              Comment
            </div>
            <div className="card-body">
            <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Comment:</label>
            <textarea onChange={this.handleCommentInput} value='' className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <button onClick={this.handleCommentSubmit} type="button" className="btn btn-primary btn-lg" style = {{marginTop: 10 +"px", marginLeft:75 + '%' }}>Send</button>
          </div>
          <hr/>
          <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer className="blockquote-footer">Company</footer>
          </blockquote>
          </div>
          <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer className="blockquote-footer">Admin</footer>
          </blockquote>
          </div>
          <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer className="blockquote-footer">Company</footer>
          </blockquote>
          </div>
          <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer className="blockquote-footer">Admin</footer>
          </blockquote>
          </div>

            </div>
          </div>
              </div>
          </div>
        </div>
    );
  }
};