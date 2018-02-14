

const initialState = {
    projectId:'',
    projectName:''
  

}

export default function CompanyDashReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {

        case 'GET_PROJECT_DETAIL_FULFILLED': {
            console.log('Reducers payload',payload)
            return {
                ...state,
                
                projectId: payload.id,
                projectName: payload.name       
            };
            
        }
       

        default: {
            return state;
        }  

    }

}