import { types } from './PitchFormActions';

const initialState = {
    projectSubmitted: false,
    responseObj: ''
};


export default function PitchFormReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case `${types.CREATE_PROJECT}_FULFILLED`: {
            return {
              ...state,
                projectSubmitted: true,
                responseObj: payload
            };
        }
        case types.CHANGE_STATUS : {
            return {
                ...state,
                projectSubmitted: false
            };
        }
        default: {
            return state;
        }
    }


}
