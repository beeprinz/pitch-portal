import React, { Component } from 'react';

export default class PitchDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">Pitch Portal</a>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
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
  <label for="exampleFormControlTextarea1">Comment:</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  <button type="button" className="btn btn-primary btn-lg" style = {{marginTop: 10 +"px", marginLeft:75 + '%' }}>Send</button>
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










        <footer className="pt-4 my-md-5 pt-md-5 border-top">
          <div className="row">
            <div className="col-12 col-md">
              <img className="mb-2" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="24" height="24" />
              <small className="d-block mb-3 text-muted">© 2017-2018</small>
            </div>
            <div className="col-6 col-md">
              <h5>Features</h5>
              <ul className="list-unstyled text-small">
                <li><a className="text-muted" href="#">Cool stuff</a></li>
                <li><a className="text-muted" href="#">Random feature</a></li>
                <li><a className="text-muted" href="#">Team feature</a></li>
                <li><a className="text-muted" href="#">Stuff for developers</a></li>
                <li><a className="text-muted" href="#">Another one</a></li>
                <li><a className="text-muted" href="#">Last time</a></li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Resources</h5>
              <ul className="list-unstyled text-small">
                <li><a className="text-muted" href="#">Resource</a></li>
                <li><a className="text-muted" href="#">Resource name</a></li>
                <li><a className="text-muted" href="#">Another resource</a></li>
                <li><a className="text-muted" href="#">Final resource</a></li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>About</h5>
              <ul className="list-unstyled text-small">
                <li><a className="text-muted" href="#">Team</a></li>
                <li><a className="text-muted" href="#">Locations</a></li>
                <li><a className="text-muted" href="#">Privacy</a></li>
                <li><a className="text-muted" href="#">Terms</a></li>
              </ul>
            </div>
          </div>
        </footer>

        </div>
    );
  }
};