import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getDetail, getUsersProjects } from './AdminDashActions'
import axios from 'axios';
import Cookies from 'cookies-js'
import Moment from 'react-moment';


export default class AdminDash extends Component {
  constructor(props) {
    super(props);

    this.handleDetail = this.handleDetail.bind(this);
    this.renderProjectStatus = this.renderProjectStatus.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  componentWillMount() {
    const { dispatch, projects } = this.props;
    axios.get('http://localhost:3000/allProjects', {
    }).then(function (response) {
      console.log("THIS IS RESPONSE DATA", response.data)
      dispatch(getUsersProjects(response.data))
    })
  }

  handleDetail(event) {
    const { dispatch } = this.props;
    const { value } = event.target;
    axios.get('http://localhost:3000/api/projects/' + value, {
    }).then(function (response) {
      console.log(" THIS IS STATUS DATA ", response)
      dispatch(getDetail(response.data))
    })
  }

  renderProjectStatus(event) {
    const { projects } = this.props;
    if (event === 0) {
      return 'Pending'
    } if (event === 1) {
      return 'Approved';
    } if (event === 2) {
      return 'Denied';
    }
  }

  handleDelete(event) {
    const { dispatch } = this.props;
    const { value } = event.target;
    axios.delete('http://localhost:3000/api/projects/' + value, {
    }).then(function (response) {
      console.log(" THIS IS RESPONSE DATA ", response.data)
    })
  }

  render() {
    const { projects } = this.props

    return (
      <div className='container'>
        <h1 style={{ marginTop: 50 + "px", marginBottom: 30 + "px" }}>Hello World - AdminDash</h1>
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

            {!!projects && projects.map(project => {
              return (
                <tr key={project.id} className="text-center">
                  <th scope="row">{project.id}</th>
                  <td>{project.name}</td>
                  <td><Moment format='MM/DD/YYYY'>{project.date}</Moment></td>
                  <td>{this.renderProjectStatus(project.status)}</td>
                  <td className="text-center">
                    <button type="button" className="btn btn-outline-success" value={project.id} onClick={this.handleDetail}>Detail</button>
                    <button type="button" className="btn btn-outline-danger" style={{ marginLeft: 10 + "px" }} value={projects.id} onClick={this.handleDelete}> Delete </button>
                  </td>
                </tr>
              )
            })}

            <tr className="text-center">
              <th scope="row">3</th>
              <td>Pitch Portal</td>
              <td>Pending</td>
              <td>Pending</td>
              <td className="text-center">
                <button type="button" className="btn btn-outline-success"><a href="#" > Detail </a></button>
                <button type="button" className="btn btn-outline-danger" style={{ marginLeft: 10 + "px" }}> <a href="#">Delete</a> </button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
};