import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Field, reduxForm } from 'redux-form'
import axios from 'axios';
import Cookies from 'cookies-js'
import { 
  getProject, 
  changeProjectInfo, 
  savedDone,
  getProjectById,
  toggleEdit
} from './PitchDetailActions'
import Moment from 'react-moment';

class PitchDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEnabled: false
    }
    this.renderProjectStatus = this.renderProjectStatus.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this); 
    
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
    const { dispatch } = this.props;
    const userId = Cookies.get('userId')
    console.log(userId, 'PIIIIIITCHDEETAIL')
    axios.get('http://localhost:3000/fetchprojects/' + userId, {
    }).then(function (response) {
      dispatch(projectDetail(response.data))
    })
  }


  render() {
    const{ projectDetail, isEditing } = this.props;
    const { handleSubmit } = this.props;
    const {isSaved} = this.props;
    if(!projectDetail) return (
          <div className="text-center" style={{ padding: '20' }}>
            <p><i className="fa fa-spinner fa-spin fa-2x"></i></p>
            <p>Loading...</p>
          </div>
    );

    if(isEditing === false){
    return (
      <div className="container">
        <h1>Hello World - PitchDetail</h1>

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
                <button onClick={this.handleEdit} 
                className="mb-3 btn btn-primary edit-todo" role="button">
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* comment card */}
          <div className="col">
            <div className="card">
              <div className="card-header">Comment</div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Comment:
                  </label>
                  <textarea onChange={this.handleCommentInput} value="" className="form-control" id="exampleFormControlTextarea1" rows="3" />
                  <button onClick={this.handleCommentSubmit} type="button" className="btn btn-primary btn-lg" style={{ marginTop: 10 + "px", marginLeft: 75 + "%" }}>
                    Send
                  </button>
                </div>
                <hr />
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>
                    This is not the best project in the world, this is just a tribute.
                    </p>
                    <footer className="blockquote-footer">Company</footer>
                  </blockquote>
                </div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>
                    Your project is bad and you should feel bad!
                    </p>
                    <footer className="blockquote-footer">Admin</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
    )  
    }
    return (

      <div className="container">
        <h1>Hello World - PitchDetail</h1>

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
                  {/* <button onClick={this.handleBackEditButton} className="mb-3 btn btn-primary edit-todo" role="button">
                    Back
                  </button> */}
                </form>

              </div>
            </div>
          </div>

          {/* comment card */}
          <div className="col">
            <div className="card">
              <div className="card-header">Comment</div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Comment:
                  </label>
                  <textarea onChange={this.handleCommentInput} value="" className="form-control" id="exampleFormControlTextarea1" rows="3" />
                  <button onClick={this.handleCommentSubmit} type="button" className="btn btn-primary btn-lg" style={{ marginTop: 10 + "px", marginLeft: 75 + "%" }}>
                    Send
                  </button>
                </div>
                <hr />
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>
                      This is not the best project in the world, this is just a tribute.
                    </p>
                    <footer className="blockquote-footer">Company</footer>
                  </blockquote>
                </div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>
                      Your project is bad and you should feel bad!
                    </p>
                    <footer className="blockquote-footer">Admin</footer>
                  </blockquote>
                </div>
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