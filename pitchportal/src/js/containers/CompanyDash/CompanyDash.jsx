import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProjectDetail, getUsersProjects, deleteProject } from './CompanyDashActions'
import axios from 'axios';
import Cookies from 'cookies-js';
import Moment from 'react-moment';
import { Redirect } from 'react-router';

const company = sessionStorage.getItem('company');
const token = sessionStorage.getItem('token');
const authAxios = axios.create({
  headers: { Authorization: token }
});

export default class CompanyDash extends Component {
  constructor(props) {
    super(props);
    this.handleDetail = this.handleDetail.bind(this);
    this.renderProjectStatus = this.renderProjectStatus.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  componentWillMount() {
    const { dispatch, projects } = this.props;
    const userId = sessionStorage.getItem('userId');
    authAxios
      .get(`http://localhost:3000/api/users/${userId}/projects`, {})
      .then(function(response) {
        dispatch(getUsersProjects(response.data));
      });
  }

  handleDetail(event) {
    const { dispatch } = this.props;
      dispatch(getProjectDetail(event.target.value))
  
  }


  renderProjectStatus(event) {
    const { projects } = this.props;
    if (event === 0) {
      return 'Pending';
    }
    if (event === 1) {
      return 'Approved';
    }
    if (event === 2) {
      return 'Denied';
    }
  }

  handleDelete(event) {
    const { dispatch, projects } = this.props;
    const { value } = event.target;
    dispatch(deleteProject(value, projects));
    }
    
  render() {
    const { projectStatus, projects } = this.props;
    const company = sessionStorage.getItem('company');
    return (
      <div className='container'>
        <h1 style={{ marginTop: 50 + 'px', marginBottom: 30 + 'px' }}>
         {company}
        </h1>
        <table className='table table-hover '>
          <thead className='thead-dark'>
            <tr className='text-center'>
              <th scope='col'></th>
              <th scope='col'>ID#</th>
              <th scope='col'>Project</th>
              <th scope='col'>Time</th>
              <th scope='col'>Status</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {!!projects &&
              projects.reverse().map(project => {
                return (
                  
                  <tr key={project.id} className='text-center'>
                   <Link
                        to={`/company/${company}/pitchdetail/${project.id}`}>
                        <button
                          type='button'
                          className='btn btn-outline-success'
                          onClick={this.handleDetail}
                          value={project.id}>
                          Detail
                        </button>
                      </Link>
                    <th scope='row'>{project.id}</th>
                    <td>{project.name}</td>
                    <td>
                      <Moment format='MM/DD/YYYY'>{project.date}</Moment>
                    </td>
                    <td>{this.renderProjectStatus(project.status)}</td>
                    <td className='text-center'>
                     
                      <button
                        type='button'
                        className='btn btn-outline-danger'
                        style={{ marginLeft: 10 + 'px' }}
                        value={project.id}
                        onClick={this.handleDelete}>
                        {' '}
                        Delete{' '}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <h1>New Project </h1>
        <hr />
        <p>Click submit for new project</p>
        <Link className="btn btn-primary" to={`/company/${sessionStorage.company}/pitchform`} role="button">Create Pitch</Link>
      </div>
    );
  }
}