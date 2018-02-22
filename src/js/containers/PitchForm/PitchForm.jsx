import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { createProject } from './PitchFormActions'
import Cookies from 'cookies-js';
import { Redirect } from "react-router";
import validate from './validate';
class PitchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      activeSlide: false,
      lastSlide:false,
      filesUploaded: [],
      fileSuccess: false,
      slideCount:0,
      page:1,
      firstSlide: true,
      lastSlide: false
    
    };
    // Binding Directory
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleRightSlide = this.handleRightSlide.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.handleLeftSlide = this.handleLeftSlide.bind(this);
  }

  // Submission of A Project (Run file upload function, Dispatch to Actions and Submit Form)
  onSubmit(values){
    const { dispatch } = this.props;
    // Retrieving Cookie for Pitch Form in Database & adding date and status
    const dateNow = Date()
    values.userId = Cookies.get('userId')
    values.date = dateNow;
  
    // File Upload on Submit (Creating Conditional Submission depending if File was uploaded)
    const files = this.state.files;
    if(!files || files.length > 1  ) {
      files.forEach((file) => {
        this.fileUpload(file)
        .then((response) => {
          const fileLocation =  response.data.result.files.file[0].providerResponse.location
            this.setState({filesUploaded: [...this.state.filesUploaded, fileLocation], fileSuccess: true}, () => {
              const fileState = this.state.fileSuccess
              if(fileState) {
                const fileSystem = this.state.filesUploaded
                  values.fileLinks = fileSystem
                  dispatch(createProject(values))
              }
            })
        });
      });
    } else {
    // Dispatch that connects to the store.
    dispatch(createProject(values));
    }

  }
  // File Upload System

  // Handles On Change for File Stack
  onChange(e) {
    const fileStack = this.state.files
      fileStack.push(e.target.files[0])
        this.setState({
          files: fileStack
        });
  }

  // File Upload to Amazon AWS (Client => Aws)
  fileUpload(file){
    const url = 'http://localhost:3000/api/containers/originpitchportal/upload';
    const formData = new FormData();
      formData.append('file', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
    return axios.post(url, formData, config);
  }

  // Disables the first control so user cannot go to submission page by accident
  handleLeftSlide(e){
    const clickCount = this.state.page- 1
    this.setState({page: clickCount})
  }
  handleRightSlide(e){
   const slideCountOnRight = this.state.page  + 1
     this.setState({page: slideCountOnRight})
  }
  renderTextBox(field) {
   
    const { meta: { touched, error } } = field;
   
    return (
      <div>
        <div className= "form-group text-center">
          <label htmlFor="exampleFormControlInput1">{field.label}</label>
          {touched && error ? <input {...field.input} type="text" className='form-control is-invalid' id="exampleFormControlInput1" placeholder={ field.placeholder }/> : <input {...field.input} type="text" className='form-control' id="exampleFormControlInput1" placeholder={field.placeholder} />}
          <div className = "text-danger">
            {touched ? error : ''}
          </div>
        </div>
      </div>
    );
  }

  renderTextArea(field) {
    const { meta: { touched, error } } = field;
    
    return (
      <div>
        <div className="form-group text-center">
          <label htmlFor="exampleCompany">{field.label} </label>
          {touched && error ? <textarea {...field.input } className="form-control is-invalid" id="exampleCompany" placeholder = { field.placeholder } rows={field.rows } /> : <textarea {...field.input } className="form-control" id="exampleCompany" placeholder = { field.placeholder } rows={field.rows } /> }
        </div>
        <div className ="text-danger">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  render() {
    const lastSlide = this.state.lastSlide
    const firstSlide = this.state.firstSlide
    const { handleSubmit } = this.props;
    // Adding Store to see if redirection is true
    const { projectSubmitted } = this.props.pitchform;
    // console.log(projectSubmitted);
    return (
      <div className='PitchForm'>
          <div className='container'>
          {/* {projectSubmitted ? <Redirect to='/company/:companyname/dashboard' /> : ''} */}
            <h1 className="text-center p-2"> Project Request Form </h1>
              <form onSubmit={ handleSubmit(this.onSubmit) }>
                <div id="carouselExampleControls"  className="carousel slide"  data-interval="false" data-ride="carousel">
                    <div className="carousel-inner">
                    {this.state.page == 1 &&
                      <div className="carousel-item active">
                          <div className="jumbotron jumbotron-fluid">
                              <div className="container">
                              <h1 className ="text-center"> Basic Info </h1>
                               <hr />
                              <Field
                                key = 'firstSlide'
                                label = 'Project Name (Required)'
                                name = "name"
                                component = {this.renderTextBox}
                                placeholder = 'e.g Facebook Messenger, Google Plus, Youtube Red"'
                              />
                              <Field
                                name ="description"
                                label = 'Give a detailed description of the project. (Required)'
                                component = {this.renderTextArea}
                                placeholder = 'e.g This project is made for this target base, to help with this issue.'
                                rows='4'
                              />
                              </div>
                            </div>
                      </div>}
                      {this.state.page == 2 && 
                      <div className="carousel-item active">
                              <div className="jumbotron jumbotron-fluid">
                              <div className="container">
                              <h1 className ="text-center"> Goals and Key Features </h1>
                              <hr />
                              <Field
                                  key = 'goal'
                                  name ="goal"
                                  label = 'What is the goal/purpose of this project or application of the software? (Required)'
                                  component = {this.renderTextArea}
                                  placeholder = 'e.g The goal of this project is to help users find diffrent jobs or work.'
                                  rows = '3'
                                />
                                <Field
                                  name ="keyFeatures"
                                  label = 'What are some key features to have within this project? (Required)'
                                  component = {this.renderTextArea}
                                  placeholder = ' e.g User(s) can edit files, User(s) can create diffrent instances of files through database.'
                                  rows='2'
                                />
                              </div>
                            </div>
                      </div>
                      }
                      {this.state.page == 3 && 
                      <div className="carousel-item active">
                              <div className="jumbotron jumbotron-fluid">
                              <div className="container">
                              <h1 className = "text-center"> Existing Technologies </h1>
                              <hr />
                              <Field
                                  name ="exampleProducts"
                                  label = 'Are there any programs or software that you are currently using in place of this project? (Optional)'
                                  component = {this.renderTextArea}
                                  placeholder = 'e.g We have a currently outdated software that needs a upgrade or want the same software rebuilt.'
                                />
                                <Field
                                  name ="otherTech"
                                  label = 'Are there other technologies that could be used as refrenced? (Optional)'
                                  component = {this.renderTextArea}
                                  placeholder = 'e.g Microsoft Word, Github File System, Facebook messenger'
                                  rows='1'
                                />
                              </div>
                            </div>
                      </div>
                      }
                      {this.state.page == 4 &&
                      <div className="carousel-item active">
                              <div className="jumbotron jumbotron-fluid">
                              <div className="container">
                              <h1 className ="text-center"> File And Uploading </h1>
                              <hr />
                              <h4 className = "text-center"> Upload A file (.pptx, .doc, .docx) </h4>
                                <div className = "card p-3">
                                  <div className = "card-body text-center ">
                                    <div className="text-center ">
                                    <div className="custom-file">
                                      <input type="file" onChange={this.onChange} className="custom-file-input" id="customFile" />
                                      <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                    </div>
                                    <h4 className="p-3" > Files Uploaded </h4>
                                      <ul className="list-group list-group-flush">
                                        {
                                          this.state.files.map(f => <li className="list-group-item" key={f.name}>{f.name} - {f.size} bytes</li>)
                                        }
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-3 text-center">
                                <h4> For Directions on how to upload your video on a third party site click here</h4>
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                  Launch demo modal
                                </button>
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                      <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Uploading Directions</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                              <span aria-hidden="true">&times;</span>
                                            </button>
                                          </div>
                                          <div className="modal-body">
                                            <ul className="list-group list-group-flush">
                                              <li className="list-group-item">Cras justo odio</li>
                                              <li className="list-group-item">Dapibus ac facilisis in</li>
                                              <li className="list-group-item">Morbi leo risus</li>
                                              <li className="list-group-item">Porta ac consectetur ac</li>
                                              <li className="list-group-item">Vestibulum at eros</li>
                                            </ul>
                                          </div>
                                          <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary">Save changes</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                <Field
                                  name ="urlLink"
                                  label = 'Link to video on youtube or other streaming services'
                                  component = {this.renderTextBox}
                                  placeholder = 'e.g https://www.youtube.com/watch?v=jNQXAC9IVRw'
                                />
                                </div>
                              </div>
                            </div>
                      </div>
                      }
                      {this.state.page == 5 &&
                      <div className="carousel-item active lastSlide">
                                <div className="jumbotron jumbotron-fluid">
                              <div className="container">
                              <h1 className ="text-center"> Submission </h1>
                                <hr />
                              <Field
                                  key="lastSlide"
                                  name ="additionalComments"
                                  label = 'Additional Comments or Concerns? (Optional)'
                                  component = {this.renderTextArea}
                                  placeholder= 'e.g Please Contact after 5pm or feel free to contact before 8pm'
                                  rows='3'
                                />
                                <div className='text-center'>
                                <button type ="submit" className = "btn-lg btn-primary text-center"> Submit </button>
                                </div>
                              </div>
                            </div>
                      </div>
                      }
                    </div>
                      
                  </div>

               {this.state.page !== 1 && <a onClick = {this.handleLeftSlide} className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <div style={{fontSize: 100 +'px', color: 'blue'}}>
                        <i className="fas fa-arrow-circle-left"></i>
                        </div>
                    </a> }

                {this.state.page !== 5 &&  <a onClick ={this.handleRightSlide}  className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                      <div style={{fontSize: 100 +'px', color: 'blue'}}>
                        <i className="fas fa-arrow-circle-right"></i>
                        </div>
                    </a> }
                </form>
          </div>
      </div>
    );
  }
}

// Exporting Redux Reducer (forms)
export default reduxForm({
  validate,
  form: 'PitchForm'
})(PitchForm);
