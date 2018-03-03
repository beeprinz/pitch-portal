import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { createProject, changeStatus } from './PitchFormActions'
import Cookies from 'cookies-js';
import { Redirect } from "react-router";

class PitchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      filesUploaded: [],
      fileSuccess: false,
      page:1,
      firstSlide: true,
      lastSlide: false,  
      formValid: true,
      loading:false,
      totalSize: 0,
      fileMsg: '',
      RestrictedLimit: false,
      projectRedirect:false
    };
    // Binding Directory
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeDocs = this.onChangeDocs.bind(this);
    this.handleRightSlide = this.handleRightSlide.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.handleLeftSlide = this.handleLeftSlide.bind(this);
    this.convertToMega = this.convertToMega.bind(this);
    // this.addArray = this.addArray.bind(this);
  }
  componentWillReceiveProps(nextProps){
    const {dispatch} = this.props;
    const { projectSubmitted } = this.props;
    console.log('nextprops', nextProps)
    console.log('test', this.props.pitchform.projectSubmitted )
    if ( this.props.pitchform.projectSubmitted != nextProps.pitchform.projectSubmitted){
      this.setState({projectRedirect:true})
      dispatch(changeStatus())
    }
  }

  // Submission of A Project (Run file upload function, Dispatch to Actions and Submit Form)
  onSubmit(values){
    const { dispatch } = this.props;
    const files = this.state.files;
    const fileLength = files.length;
     if(this.state.totalSize > 250) {
       this.setState({fileMsg: 'Your file(s) is over 250 MBs, Est. time of 5-10 minutes'})
    }
    if(this.state.totalSize < 250) {
       this.setState({fileMsg: 'Your file(s) is less than 250 MBs, Est. time of 1-5 minutes'})
    }
    // Retrieving Cookie for Pitch Form in Database & adding date and status
    const dateNow = Date()
    values.userId = Cookies.get('userId');
    values.date = dateNow;
    const fileSizeTemp = []
    const totalsizearray = this.state.totalSize
 
    this.setState({loading:true})
    // File Upload on Submit (Creating Conditional Submission depending if File was uploaded)
      if(fileLength > 0  ) {
        files.forEach((file) => {
          const fileAdd = file.size/1000000 
          fileSizeTemp.push(fileAdd)

          this.fileUpload(file)

          .then((response) => {
            const fileLocation = response.data.result.files.file[0].providerResponse.location;
            const fileTempUpload = this.state.filesUploaded.length + 1;
              if(fileLength == fileTempUpload){
                this.setState({fileSuccess:true, loading:false});
              }
              this.setState({filesUploaded: [...this.state.filesUploaded, fileLocation], timeEstimate: ''}, () => {
                const fileState = this.state.fileSuccess;
                if(fileState) {
                  const fileSystem = this.state.filesUploaded;
                  // Adding Refrence for other containers in Database
                    values.fileLinks = fileSystem;
                    dispatch(createProject(values));
                }
              })
          });
        });
      } else {
      // Dispatch that connects to the store.
      this.setState({loading:false})
      dispatch(createProject(values));
      }

  }
 
  // File Upload System

  // Handles On Change for File Stack
  onChange(e) {
    const fileStack = this.state.files
    this.setState({totalSize: this.state.totalSize + e.target.files[0].size/1000000})
    
        fileStack.push(e.target.files[0])
        this.setState({
          files: fileStack
        });
      
  
     
  }
  convertToMega(size, e){
    return size/1000000;
  }
  onChangeDocs(e) {
    const fileStack = this.state.files
    this.setState({totalSize: this.state.totalSize + e.target.files[0].size/1000000})
      // if(this.state.totalSize < 500) {
        fileStack.push(e.target.files[0])
        this.setState({
          files: fileStack
        });
      
    
  }

  // File Upload to Amazon AWS (Client => Aws); Using loopback-storage component.
  fileUpload(file){
    const url = 'http://localhost:3000/api/containers/originpitchportal/upload';
    // console.log( 'file upload' , file.size)
    const formData = new FormData();
      formData.append('file', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
    return axios.post(url, formData, config)                   
  }

  // Disables the first control so user cannot go to submission page by accident
  handleLeftSlide(e){
    const clickCount = this.state.page- 1
    this.setState({page: clickCount})
  }
  // Disables last control (Wizard form)
  handleRightSlide(e){
    const { valid } = this.props
    this.setState({formValid: valid})
    const fileAddition= this.state.files;
    // If statement that doesnt let you progress unless you complete form correctly
    if(valid){
      const slideCountOnRight = this.state.page  + 1
      this.setState({page: slideCountOnRight, formValid: valid})
    }
    

  }
  // Redux Form Renders
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

  // Redux Form Renders
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
    const valid = this.state.formValid
    // const redirectionCookie = Cookies.get('token')
    // if (!redirectionCookie){
    //   return <Redirect to='/'/>
    // } 
 
    // Adding Store to see if redirection is true
    const { projectSubmitted } = this.props.pitchform;
    return (
      <div className='PitchForm'>
          <div className='container'>
          {/* Redirection back to dashboard if submission is cleared by the database */}
           {projectRedirect ? <Redirect to='/company/:companyname/dashboard' /> : ''} 
            <h1 className="text-center p-2"> Project Request Form </h1>
              <form onSubmit={ handleSubmit(this.onSubmit) }>
                <div id="carouselExampleControls"  className="carousel slide"  data-interval="false" data-ride="carousel">
                {valid ? '' :
                <div className="alert alert-danger" role="alert">
                    <strong> Before Progressing </strong> Please fill out the required forms
                  </div> }
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
                              {sizeLimit ? 
                              <div className="alert alert-danger" role="alert">
                                File(s) are over the 500 Mb Limit
                              </div> : ''}
                              <h4 className = "text-center"> Upload A Video (.mp4, .m4v, .mov) </h4>
                                <div className = "card p-3">
                                  <div className = "card-body text-center ">
                                    <div className="text-center ">
                                    <div className="custom-file">
                                      <input accept="video/mp4,video/x-m4v,video/*" type="file" onChange={this.onChange} className="custom-file-input" id="customFile" />
                                      <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                    </div>
                                    </div>
                                    <h5 className = "pt-3"> Requirments for Video </h5>
                                    <ul className = "list-group list-group-flush">
                                      <li className = "list-group-item"> Video(s) can only be a maximum of 5 minutes or 500 Mb. </li>
                                      <li className= "list-group-item"> Should not contain any inappropriate content. </li>
                                      <li className= "list-group-item"> Video(s) will not be uploaded till you hit submit on final page.</li>
                                      <li className= "list-group-item"> Video(s) must have correct file type (.mp4, .m4v, .mov). </li>
                                      <li className= "list-group-item"> To upload multiple videos just click choose file after you see your first video in staged uploads.</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="p-3 text-center">
                                <h4 className = "text-center"> Upload A file (.pptx, .doc, .docx, .pdf) </h4>
                                <div className = "card p-3">
                                  <div className = "card-body text-center ">
                                    <div className="text-center ">
                                    <div className="custom-file">
                                      <input type="file" onChange={this.onChangeDocs} className="custom-file-input" id="customFile" />
                                      <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                    </div>
                                    </div>
                                    <h5 className = "pt-3"> Requirments for Documents </h5>
                                    <ul className = "list-group list-group-flush">
                                      <li className = "list-group-item"> Total amount of size of documents should be maximum of 500Mb (Including Video) </li>
                                      <li className= "list-group-item"> Should not contain any inappropriate content. </li>
                                      <li className= "list-group-item"> Document(s) will not be uploaded till you hit submit on final page.</li>
                                      <li className= "list-group-item"> Document(s) must have correct file type (.doc, .docx, .pptx, .pdf). </li>
                                      <li className= "list-group-item"> To upload multiple documentss just click choose file after you see your first document in staged uploads.</li>
                                    </ul>
                                  </div>
                                </div>
                                <h2> Files Staged For Upload </h2>
                                <div className= "card">
                                <div className ="card-body">
                                <ul className="list-group list-group-flush">

                                        {
                                          this.state.files.map(f => <li className="list-group-item" key={f.name}>{f.name} - {this.convertToMega(f.size)} MegaBytes</li>)
                                        }
                                </ul>
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
   
                                {loading ?  <div> Uploading Video(s) or Document(s) <hr />({this.state.fileMsg}) <i className="fas fa-spinner fa-pulse"></i> </div> : <button type ="submit" className = "btn-lg btn-primary text-center" > Submit </button>} 
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
  
                {this.state.page !== 5 && <a onClick ={this.handleRightSlide}  className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
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
function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Please Enter A Project Name';
  }
  if (!values.description) {
    errors.description = 'Please Enter A Description';
  }
  if (!values.goal) {
    errors.goal = 'Please Enter the goal of this project';
  }
  if (!values.keyFeatures) {
    errors.keyFeatures = 'Please list some key features for your project';
  }

  // If 'errors' is empty, the form is fine to submit
  return errors;
}
// Exporting Redux Reducer (forms)
export default reduxForm({
  validate,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  form: 'PitchForm'
})(PitchForm);
