import { types } from './CompanyDashActions';

const initialState = {
    projectId:'',
    projectName:''

}

export default function CompanyDashReducer(state = initialState, action) {
    const { type, payload } = action;
    console.log('Reducers payload', payload)
    switch (type) {

        case types.GET_PROJECT_DETAIL_FULLFILLED: {
           
            return {
                ...state,
                projectId: payload.projectId,
                projectName: payload.projectName       
            };
            
        }


        default: {
            return state;
        }  

    }

}