import { types } from './PitchFormActions';

const initialState = {
        info: ''
};


export default function PitchFormReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_INFO: {
            return {
              ...state,
              info: payload
            };
        }
        default: {
            return state;
        }
    }


}
