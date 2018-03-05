import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'cookies-js'
import { 
  getProject, 
  changeProjectInfo, 
  savedDone,
  getProjectById,
  toggleEdit,
  changeStatus
} from './PitchDetailActions'
import Moment from 'react-moment';

class PitchDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEnabled: false,
      text:'',
      names:'',
      comment:'',
      date:''
    }
    
    this.renderComments = this.renderComments.bind(this);
    this.handleCommentInput = this.handleCommentInput.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.renderProjectStatus = this.renderProjectStatus.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this); 
    this.adminButtons = this.adminButtons.bind(this);
    this.handleBackEditButton = this.handleBackEditButton.bind(this);
  }

  renderComments() {
    const { match } = this.props
    const projectId = match.params.id;
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
  }

  handleCommentSubmit(event) {
    const { dispatch, match } = this.props
    const comment = this.state.comment
    const projectId = match.params.id
    const userId = sessionStorage.userId
    let data = [];

    axios.post(`http://localhost:3000/api/projects/${projectId}/comment`, {
      "text": comment,
      "date": new Date(),
      "projectId": projectId,
      "userId": userId
    })
    .then((response) => {
      this.renderComments()
      this.setState({
        comment:''
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  componentDidMount() {
    const { initialize, match, dispatch } = this.props;
    dispatch(getProjectById(match.params.id))
  }

  handleEdit() {
    const { initialize, projectDetail, dispatch } = this.props;
    initialize({ 
      description: projectDetail.description, 
      goal: projectDetail.goal,
      exampleProducts: projectDetail.exampleProducts,
      keyFeatures: projectDetail.keyFeatures,
      otherTech: projectDetail.otherTech
    })
    dispatch(toggleEdit());
  }

  handleBackEditButton(){
    const { dispatch } = this.props;
    dispatch(toggleEdit());
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

  renderDescriptionField(field){
    const inputBoxError = `form-control mb-2 ${field.meta.touched && field.meta.error ? 'is-invalid':''}`
    return(
      <div className="form-group">
        <textarea {...field.input} type="text"  className="form-control" placeholder="Project Description" />
        <div className='text-danger mb-2'>
        {field.meta.touched ? field.meta.error: ''}
        </div>
      </div>
    )
  }

  renderExampleProductsField(field){
    const inputBoxError = `form-control mb-2 ${field.meta.touched && field.meta.error ? 'is-invalid':''}`
    return(
      <div className="form-group">
      {/* <label htmlFor="formGroupExampleInput">Is this an existing Product?</label> */}
        <textarea {...field.input} type="text"  className="form-control" placeholder="Is this an existing Product?" />
        <div className='text-danger mb-2'>
        {field.meta.touched ? field.meta.error: ''}
        </div>
      </div>
    )
  }

  renderGoalField(field){
    const inputBoxError = `form-control mb-2 ${field.meta.touched && field.meta.error ? 'is-invalid':''}`
    return(
      <div className="form-group">
      {/* <label htmlFor="formGroupExampleInput">Goal for project</label> */}
        <textarea {...field.input} type="text"  className="form-control" placeholder="Project Goal" />
        <div className='text-danger mb-2'>
        {field.meta.touched ? field.meta.error: ''}
        </div>
      </div>
    )
  }

  renderOtherTechField(field){
    const inputBoxError = `form-control mb-2 ${field.meta.touched && field.meta.error ? 'is-invalid':''}`
    return(
      <div className="form-group">
        <textarea {...field.input} type="text"  className="form-control" placeholder="Technologies Used" />
        <div className='text-danger mb-2'>
        {field.meta.touched ? field.meta.error: ''}
        </div>
      </div>
    )
  }

  renderKeyFeaturesField(field){
    const inputBoxError = `form-control mb-2 ${field.meta.touched && field.meta.error ? 'is-invalid':''}`
    return(
      <div className="form-group">
        <textarea {...field.input} type="text"  className="form-control" placeholder="Key Features" />
        <div className='text-danger mb-2'>
        {field.meta.touched ? field.meta.error: ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    const {dispatch, projectDetail} = this.props;
    dispatch(changeProjectInfo(projectDetail, values));
  }

componentWillMount() {
    this.renderComments()
  }

  adminButtons(event){
    const {dispatch, projectDetail} = this.props;    
    const {value} = event.target;
    dispatch(changeStatus(projectDetail, value))
    }

  


  render() {
    const{ projectDetail, isEditing } = this.props;
    const { handleSubmit } = this.props;
    const {isSaved} = this.props;
    const userId = sessionStorage.getItem('userId') 
    const company = sessionStorage.getItem('company');
     
    
    // console.log(projectDetail)
    if(!projectDetail) return (
          <div className="text-center" style={{ padding: '20px' }}>
            <p><i className="fa fa-spinner fa-spin fa-2x"></i></p>
            <p>Loading...</p>
          </div>
    );

    // 5a998d543492f83ed831b8f2
    if(userId === '5a9b5d31b8b4a41f786d14f3' && isEditing === false){
      return <div className="container">
          <h1 className="mb-2">PitchDetail</h1>

          <Link to="/admin/dashboard">
            <button type="button" className="btn btn-primary mb-2">
              Back
            </button>
          </Link>

          <div className="row">
            <div className="col">
              <div className="card ">
                <div className="card-header">Project</div>

                <div className="card-body">
                  <h4 className="card-title">{projectDetail.name}</h4>
                  <h6>Project Id:</h6>
                  <p className="card-text">{projectDetail.id}</p>

                  <h6>Date:</h6>
                  <p className="card-text">
                    <Moment format="MM/DD/YYYY">
                      {projectDetail.date}
                    </Moment>
                  </p>
                  <h6>Status:</h6>
                  <p className="card-text">
                    {this.renderProjectStatus(projectDetail.status)}
                  </p>
                  <h6>Project Description:</h6>
                  <p className="card-text">{projectDetail.description}</p>
                  <h6>Is this an existing product?:</h6>
                  <p className="card-text">
                    {projectDetail.exampleProducts}
                  </p>
                  <h6>Technologies used:</h6>
                  <p className="card-text">{projectDetail.otherTech}</p>
                  <h6>Goal:</h6>
                  <p className="card-text">{projectDetail.goal}</p>
                  <h6>Key Features:</h6>
                  <p className="card-text">{projectDetail.keyFeatures}</p>
                  <button onClick={this.handleEdit} className="mb-3 btn btn-primary edit-todo" role="button">
                    Edit
                  </button>

                  <h6> Uploaded Files </h6>
                  <ul>
                    {!!projectDetail.fileLinks && projectDetail.fileLinks.map(
                        link => {
                          return (
                            <li>
                              {" "}
                              <a key={link} href={link}>
                                {" "}
                                <i className="fas fa-link" />{" "}
                                {link.slice(53)}{" "}
                              </a>
                            </li>
                          );
                        }
                      )}
                  </ul>

                  <hr />
                  <button type="button" className="btn btn-success mr-2" value={1} onClick={this.adminButtons}>
                    Approve
                  </button>
                  <button type="button" className="btn btn-warning mr-2" value={0} onClick={this.adminButtons}>
                    Still Pending
                  </button>
                  <button type="button" className="btn btn-danger" value={2} onClick={this.adminButtons}>
                    Denied
                  </button>
                </div>
              </div>
            </div>

            {/* comment card */}
            <div className="col">
              <div className="card">
                <div className="card-header">Project Comments</div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">
                      Comment:
                    </label>
                    <textarea onChange={this.handleCommentInput} value={this.state.comment} className="form-control" id="exampleFormControlTextarea1" rows="3" />
                    <button onClick={this.handleCommentSubmit} type="button" className="btn btn-primary btn-lg" style={{ marginTop: 10 + "px", marginLeft: 75 + "%" }}>
                      Send
                    </button>
                  </div>
                  <hr />
                  {!!this.state.text && this.state.text.map(
                      (item, index) => {
                        if (index <= 3) {
                          return (
                            <div key={index} className="card-body">
                              <blockquote className="blockquote mb-0">
                                <p>{item}</p>
                                <footer className="blockquote-footer">
                                  {this.state.names[index]}{" "}
                                  <Moment format="MM/DD/YYYY hh:mm a">
                                    {this.state.date[index]}
                                  </Moment>
                                </footer>
                              </blockquote>
                            </div>
                          );
                        }
                      }
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>; 
  }

    if(isEditing === false){
    return <div className="container">
        <h1>{company}</h1>

        <Link to="/company/:companyname/dashboard">
          <button type="button" className="btn btn-primary mb-2">
            Back
          </button>
        </Link>

        <div className="row">
          <div className="col">
            <div className="card ">
              <div className="card-header">Project</div>

              <div className="card-body">
                <h4 className="card-title">{projectDetail.name}</h4>
                <h6>Project Id:</h6>
                <p className="card-text">{projectDetail.id}</p>

                <h6>Date:</h6>
                <p className="card-text">
                  <Moment format="MM/DD/YYYY">{projectDetail.date}</Moment>
                </p>
                <h6>Status:</h6>
                <p className="card-text">
                  {this.renderProjectStatus(projectDetail.status)}
                </p>
                <h6>Project Description:</h6>
                <p className="card-text">{projectDetail.description}</p>
                <h6>Is this an existing product?:</h6>
                <p className="card-text">{projectDetail.exampleProducts}</p>
                <h6>Technologies used:</h6>
                <p className="card-text">{projectDetail.otherTech}</p>
                <h6>Goal:</h6>
                <p className="card-text">{projectDetail.goal}</p>
                <h6>Key Features:</h6>
                <p className="card-text">{projectDetail.keyFeatures}</p>
                <button onClick={this.handleEdit} className="mb-3 btn btn-primary edit-todo" role="button">
                  Edit
                </button>

                <h6> Uploaded Files </h6>
                <ul>
                  {!!projectDetail.fileLinks && projectDetail.fileLinks.map(
                      link => {
                        return (
                          <li>
                            {" "}
                            <a key={link} href={link}>
                              {" "}
                              <i className="fas fa-link" /> {link.slice(53)}{" "}
                            </a>
                          </li>
                        );
                      }
                    )}
                </ul>
              </div>
            </div>
          </div>

          {/* comment card */}
          <div className="col">
            <div className="card">
              <div className="card-header">Project Comments</div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Comment:
                  </label>
                  <textarea onChange={this.handleCommentInput} value={this.state.comment} className="form-control" id="exampleFormControlTextarea1" rows="3" />
                  <button onClick={this.handleCommentSubmit} type="button" className="btn btn-primary btn-lg" style={{ marginTop: 10 + "px", marginLeft: 75 + "%" }}>
                    Send
                  </button>
                </div>
                <hr />
                {!!this.state.text && this.state.text.map((item, index) => {
                    if (index <= 3) {
                      return <div key={index} className="card-body">
                          <blockquote className="blockquote mb-0">
                            <p>{item}</p>
                            <footer className="blockquote-footer">
                              {this.state.names[index]} <Moment format="MM/DD/YYYY hh:mm a">
                                {this.state.date[index]}
                              </Moment>
                            </footer>
                          </blockquote>
                        </div>;
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>;  
    }
    return (

      <div className="container">
        <h1>PitchDetail</h1>

        <div className="row">
          <div className="col">
            <div className="card ">
              <div className="card-header">Project</div>

              <div className="card-body">
                <h4 className="card-title">{projectDetail.name}</h4>
                <h6>Project Id:</h6>
                <p className="card-text">{projectDetail.id}</p>

                <h6>Date:</h6>
                <p className="card-text">
                  <Moment format="MM/DD/YYYY">{projectDetail.date}</Moment>
                </p>
                <h6>Status:</h6>
                <p className="card-text">
                  {this.renderProjectStatus(projectDetail.status)}
                </p>

                <form onSubmit={handleSubmit(this.onSubmit)}>
                  <h6>Project Description:</h6>
                  <Field name='description' component={this.renderDescriptionField} />
                  <h6>Is this an existing product?:</h6>
                  <Field name='exampleProducts' component={this.renderExampleProductsField} />
                  <h6>Technologies used:</h6>
                  <Field name='otherTech' component={this.renderOtherTechField} />
                  <h6>Goal:</h6>
                  <Field name='goal' component={this.renderGoalField} />
                  <h6>Key Features:</h6>
                  <Field name='keyFeatures' component={this.renderKeyFeaturesField} />
                  <button type='submit' className="mb-3 mr-3 btn btn-primary edit-todo" role="button">
                    Save
                  </button>
                  <button onClick={this.handleBackEditButton} className="mb-3 btn btn-primary edit-todo" role="button">
                    Back
                  </button>
                </form>

              </div>
            </div>
          </div>

          {/* comment card */}
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
                  if(index <= 3){
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
    )    
  }
};

function validate(values){
  const errors = {};
  if(!values.description){
    errors.description="Enter a project description";
  }
  if(!values.exampleProducts){
    errors.exampleProducts="Please let us know if this product exists";
  }
  if(!values.goal){
    errors.goal="Please let us know what technologies you use?";
  }
  if(!values.otherTech){
    errors.otherTech="What technologies are used?";
  }
  if(!values.keyFeatures){
    errors.keyFeatures="Please include some key features you would like to include";
  }
  return errors;
}

export default reduxForm({
  validate: validate,
  form: "PitchDetailForm"
})(PitchDetail);