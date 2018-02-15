var moment = require('moment')

const initialState = {
    projectId:'',
    projectName:'',
    time:'',
  projectStatus:[],
  projects: null

}

export default function CompanyDashReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {

        // case 'GET_PROJECT_DETAIL_FULFILLED': {
        //     console.log('Reducers payload',payload)
        //     return {
        //         ...state,   
        //         projectId: payload.id,
        //         // projectName: payload.name,  
        //         // time:  moment().format('MM-DD-YYYY')   
        //     };   
        // }
        case 'GET_USERS_PROJECTS': {
            console.log('Reducers payload',payload)
            return {
                ...state,   
                projects: payload
            };   
        }
        case 'GET_STATUS_FULFILLED': {
            console.log('Reducers STATUS', payload)
            return {
                ...state,    
                projectStatus: payload 
            };   
        }


        
       
  
        default: {
            return state;
        }  

    }

}