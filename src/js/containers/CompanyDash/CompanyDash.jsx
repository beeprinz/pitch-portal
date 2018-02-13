import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProjectDetail } from './CompanyDashActions'
import axios from 'axios';

export default class CompanyDash extends Component {
  constructor(props) {
    super(props);
    this.state={
      projectId: '',
  
    }

    this.handleDetail = this.handleDetail.bind(this)

  }

  handleDetail(event) {
    const { dispatch } = this.props;
    const { value } = event.target;
    const projectId = '5a7e1db0101ad832bc251a08'
    // dispatch(getProjectDetail(dispatch))
    axios.get('http://localhost:3000/api/projects/' + projectId , {
      // "projectId": projectDetail.id,
      // "projectName": projectDetail.name
    }).then(function (response) {
      console.log(" THIS IS RESPONSE DATA " , response.data)
      dispatch(getProjectDetail(response.data))
    })

  }

// handleDelete(event) {
//   const { dispatch , projectId } = this.props;
// axios.delete()
//   dispatch(deleteProjectDetail(projectId))

// }


  render() {
    const { projectName } = this.props
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


        <h1 style={{ marginTop: 50 + "px", marginBottom: 30 + "px" }}>Hello World - CompanyDash</h1>
        <table className="table table-hover ">
          <thead className="thead-dark">
            <tr className="text-center">
              <th scope="col">ID#</th>
              <th scope="col">Project</th>
              <th scope="col">Time</th>
              <th scope="col">Status</th>
              <th scope="col">Buttons</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <th scope="row">1</th>
              <td>Pitch Portal</td>
              <td>3 weeks</td>
              <td>Pending</td>
              <td className="text-center">
                <button type="button" className="btn btn-outline-success" onClick={this.handleDetail}><a > Detail </a></button>
                <button type="button" className="btn btn-outline-warning" style={{ marginLeft: 10 + "px" }}><a href="/company/:companyname/pitchform">Edit</a></button>
                <button type="button" className="btn btn-outline-danger" style={{ marginLeft: 10 + "px" }}> <a href="#">Delete</a> </button>
              </td>
            </tr>
            <tr className="text-center">
              <th scope="row">2</th>
              <td>Pitch Portal</td>
              <td>Pending</td>
              <td>Pending</td>
              <td className="text-center">
                <button type="button" className="btn btn-outline-success" ><a href="#" > Detail </a></button>
                <button type="button" className="btn btn-outline-warning" style={{ marginLeft: 10 + "px" }}><a href="#">Edit</a></button>
                <button type="button" className="btn btn-outline-danger" style={{ marginLeft: 10 + "px" }}> <a href="#">Delete</a> </button>
              </td>
            </tr>
            <tr className="text-center">
              <th scope="row">3</th>
              <td>Pitch Portal</td>
              <td>Pending</td>
              <td>Pending</td>
              <td className="text-center">
                <button type="button" className="btn btn-outline-success"><a href="#" > Detail </a></button>
                <button type="button" className="btn btn-outline-warning" style={{ marginLeft: 10 + "px" }}><a href="#">Edit</a></button>
                <button type="button" className="btn btn-outline-danger" style={{ marginLeft: 10 + "px" }}> <a href="#">Delete</a> </button>
              </td>
            </tr>
          </tbody>
        </table>




        <h1>New Project </h1>
        <hr />
        <p>Click submit for new project</p>

        <Link to="/company/:companyname/pitchform">
          <input className="btn btn-primary" href="/company/:companyname/pitchform" type="submit" value="Submit" />
        </Link>



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