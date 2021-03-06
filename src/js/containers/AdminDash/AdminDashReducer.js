const initialState = {   
  details:'',
  projects: null,
  users: null
}

export default function AdminDashReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case 'GET_USERS_PROJECTS': {
            return {
                ...state,   
                projects: payload.projects,
                users: payload.users
            };   
        }   
        case 'GET_DETAIL_FULFILLED': {
            return {
                ...state,    
               details: payload, 
            };   
        }
        
        case 'DELETE_PROJECT_FULFILLED': {
            var allProjects = payload.projects.filter((project) => project.id !== payload.id)
            return {
                ...state,
                projects: allProjects
            }
        }
        default: {
            return state;
        }  

    }

}