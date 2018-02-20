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

  export default validate;