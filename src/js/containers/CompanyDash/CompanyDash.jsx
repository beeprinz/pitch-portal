import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProjectDetail } from './CompanyDashActions'
import axios from 'axios';

export default class CompanyDash extends Component {
  constructor(props) {
    super(props);
    this.state={
     priority: ''
  
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
            <tr className="text-center">
              <th scope="row">1</th>
              <td>Pitch Portal</td>
              <td>3 weeks</td>
              <td>Pending

              </td>
              <td className="text-center">
                <button type="button" className="btn btn-outline-success" onClick={this.handleDetail}><a > Detail </a></button>
                <button type="button" className="btn btn-outline-danger" style={{ marginLeft: 10 + "px" }} onClick= { this.handleDelete}> <a href="#">Delete</a> </button>
              </td>
            </tr>
            <tr className="text-center">
              <th scope="row">2</th>
              <td>Pitch Portal</td>
              <td>Pending</td>
              <td>Pending</td>
              <td className="text-center">
                <button type="button" className="btn btn-outline-success" ><a href="#" > Detail </a></button>
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
      <button type="button" className="btn btn-success"  value ={1} >Approved</button>
      <button type="button" className="btn btn-warning" style={{ marginLeft: 10 + "px" }} value ={2} >Still Pending</button>
      <button type="button" className="btn btn-danger" style={{ marginLeft: 10 + "px" }} value={3} >Denied</button>
      <hr/>
    
    </blockquote>
  </div>
</div>






      </div>


    );
  }
};