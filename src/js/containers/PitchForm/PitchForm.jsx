import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { getInfo } from './PitchFormActions'
import SimpleReactFileUpload from './fileupload';

class PitchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onSubmit(values){
    const { dispatch } = this.props;
    // Dispatch that connects to the store.
    // dispatch(getInfo(values));
    console.log(this.state.files)
    const files = this.state.files;
    console.log(files)
    files.forEach((file) => {
      this.fileUpload(file)
      .then((response) => {
        console.log('Response Data', response.data);
      });
    });
  }
  // File Upload Sys


  onChange(e) {
    console.log(e.target.files[0])
    const fileStack = this.state.files
    fileStack.push(e.target.files[0])
    this.setState({
      files: fileStack
    });
  }

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

    const { handleSubmit } = this.props;
    const date = Date()

    console.log('State Of PitchForm', this.state);
    return (
      <div className='PitchForm'>
        {/* NavBar goes here */}
          <div className='container'>
            <h1 className="text-center p-2"> Project Request Form </h1>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="basic-tab" data-toggle="tab" href="#basic" role="tab" aria-controls="basic" aria-selected="true">Basic Information </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="goals-tab" data-toggle="tab" href="#goals" role="tab" aria-controls="goals" aria-selected="false">Goals and Key Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="tech-tab" data-toggle="tab" href="#tech" role="tab" aria-controls="tech" aria-selected="false">Existing Technologies</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="file-tab" data-toggle="tab" href="#file" role="tab" aria-controls="tech" aria-selected="false">Upload a File or Video</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="submit-tab" data-toggle="tab" href="#submit" role="tab" aria-controls="tech" aria-selected="false">Submit</a>
              </li>
            </ul>
            <form onSubmit={ handleSubmit(this.onSubmit) }>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active p-3" id="basic" role="tabpanel" aria-labelledby="basic-tab">
                  <Field
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
                <div className="tab-pane fade p-3" id="goals" role="tabpanel" aria-labelledby="goals-tab">
                  <Field
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
                <div className="tab-pane fade p-3" id="tech" role="tabpanel" aria-labelledby="tech-tab">
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
                {/* File Input */}
                <div className = 'tab-pane fade p-3' id="file" role="tabpanel" aria-labelledby="file-tab">
                  <h1 className = "text-center"> Upload A file (.pptx, .doc, .docx) </h1>
                  <div className = "card p-3">
                    <div className = "card-body text-center p-3">
                      <div className="text-center p-3">
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
                  <div className="p-3">
                  <Field
                    name ="urlLink"
                    label = 'Link to video on youtube or other streaming services'
                    component = {this.renderTextBox}
                    placeholder = 'e.g https://www.youtube.com/watch?v=jNQXAC9IVRw'
                  />
                  </div>
                </div>
                <div className = 'tab-pane fade p-3' id = "submit" role="tabpanel" aria-labelledby="submit-tab">
                  <Field
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
            </form>
          </div>
        {/* footer goes here */}
      </div>
    );
  }
}
function validate(values) {
  const errors = {};

  // Validation
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



export default reduxForm({
  validate,
  form: 'PitchForm'
})(PitchForm);
