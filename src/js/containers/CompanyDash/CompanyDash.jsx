import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProjectDetail, getStatus, getUsersProjects } from './CompanyDashActions'
import axios from 'axios';
import Cookies from 'cookies-js'

export default class CompanyDash extends Component {
  constructor(props) {
    super(props);

    // this.handleDetail = this.handleDetail.bind(this)
    this.handleStatus = this.handleStatus.bind(this)

  }

  componentWillMount() {
    const { dispatch } = this.props;
    const userId = Cookies.get('userId')
    //users id
    axios.get('http://localhost:3000/getprojects/:userId', {
    }).then(function (response) {
      console.log(" THIS IS RESPONSE DATA " , response.data)
      dispatch(getUsersProjects(response.data))
    })
  }

  // handleDetail(event) {
  //   const { dispatch } = this.props;
  //   const { value } = event.target;
  //   const projectId = '5a7e1db0101ad832bc251a08'
  //   axios.get('http://localhost:8080/api/projects/' + projectId , {
  //   }).then(function (response) {
  //     console.log(" THIS IS RESPONSE DATA " , response.data)
  //     dispatch(getProjectDetail(response.data))
  //   })
  // }

  handleStatus(event){
    const { dispatch , project} = this.props;
    const { value } = event.target
    const projectId = '5a7e1db0101ad832bc251a08'
    axios.patch('http://localhost:3000/api/projects/' + projectId , {
    }).then(function (response) {
      console.log(" THIS IS STATUS DATA " , response.data)
      dispatch(getStatus(value))
    })
  }


// handleDelete(event) {
// const { dispatch } = this.props;
// const { value } = event.target;
// const { projectId } = '5a7e1db0101ad832bc251a08'
// axios.delete('http://localhost:3000/api/projects/' + projectId , {
//   // "projectId": projectDetail.id,
//   // "projectName": projectDetail.name
// }).then(function (response) {
//   console.log(" THIS IS RESPONSE DATA " , response.data)

//   dispatch(getProjectDetail(response.data))
// })
// }



  render() {
    // projectName , time,
    const { projectStatus , projects } = this.props
      console.log('projects ID' ,projects)
    if (projectStatus == 0 ) {
      var status = 'Pending'
    } else if(projectStatus == 1 ) {
      var status = 'Approved';
    }else if (projectStatus == 2 ) {
      var status = 'Denied';
    }


    return (
      <div className="container">
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

              {!!projects && projects.map(project => {
                 return (
            <tr key={project.id} className="text-center">
              <th scope="row">{project.id}</th>
              <td>{project.name}</td>
              <td>Pending</td>
              <td>{status}</td>
              <td className="text-center">
                <button type="button" className="btn btn-outline-success" onClick= { this.handleStatus}><a href="#" > Detail </a></button>
                <button type="button" className="btn btn-outline-danger" style={{ marginLeft: 10 + "px" }}> <a href="#">Delete</a> </button>
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




        <h1>New Project </h1>
        <hr />
        <p>Click submit for new project</p>

        <Link to="/company/:companyname/pitchform">
          <input className="btn btn-primary" href="/company/:companyname/pitchform" type="submit" value="Submit" />
        </Link>



        <div className="card">
  <div className="card-header">
    Admin
  </div>
  <div className="card-body">
    <blockquote className="blockquote mb-0">
      <h5>Buttons Admin Choice</h5>
      <button type="button" className="btn btn-success"  value ={1} onClick={this.handleStatus}>Approved</button>
      <button type="button" className="btn btn-warning" style={{ marginLeft: 10 + "px" }} value ={0} onClick={this.handleStatus} >Still Pending</button>
      <button type="button" className="btn btn-danger" style={{ marginLeft: 10 + "px" }} value={2} onClick={this.handleStatus} >Denied</button>
      <hr/>

    </blockquote>
  </div>
</div>

      </div>


    );
  }
};
