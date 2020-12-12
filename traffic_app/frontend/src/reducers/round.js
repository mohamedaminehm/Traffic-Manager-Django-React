import { ADD_IMAGE, GET_IMAGE } from '../actions/types';


const intialState = {
    image : []
};

export default function (state = intialState , action){
    switch (action.types){
        case ADD_IMAGE :
            return{
                ...state , 
                img : [...state.img , action.payload]
            };
        case GET_IMAGE : 
            return {
                ...state,
                img : action.payload
            };
        default:
            return state;
    }
}