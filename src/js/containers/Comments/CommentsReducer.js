// import { types } from './CommentsActions'

const initialState = {
    comment:''
}

export default function CommentsReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {

        case 'UPDATE_COMMENT': {
            console.log('Reducers payload',payload)
            return {
                ...state,   
                comment: payload
            };   
        }
        default: {
            return state;
        }  
    }
}