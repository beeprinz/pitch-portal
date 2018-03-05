const initialState = {
  projectDetails: '',
  projectsPending: true,
  projects: null
};
export default function CompanyDashReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_USERS_PROJECTS_PENDING': {
      return {
        ...state,
        projectsPending: true
      };
    }
    case 'GET_USERS_PROJECTS_FULFILLED': {
      return {
        ...state,
        projects: payload,
        projectsPending: false
      };
    }
    case 'GET_PROJECT_DETAIL_FULFILLED': {
      return {
        ...state,
        projectDetails: payload
      };
    }

    case 'DELETE_PROJECT_FULFILLED': {
      var allProjects = payload.projects.filter(
        project => project.id !== payload.id
      );
      return {
        ...state,
        projects: allProjects
      };
    }

    case 'GET_DETAIL_FULFILLED': {
      return {
        ...state,
        details: payload
      };
    }
    default: {
      return state;
    }
  }
}