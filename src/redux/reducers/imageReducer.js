import { MULTI_IMAGES } from "../types";

let cloneObject = function (obj) {
    return JSON.parse(JSON.stringify(obj))
};

let newState = { test : {} , profile:null };

const initialUserState = {
    images:[]
}

export default function ImageReducer(state = initialUserState,action)
{
    switch (action.type){

        case MULTI_IMAGES :
            newState = cloneObject(state);
            if (action.data !== null) {
                if (action.data.data.image === "undefined" || action.data.data.image === undefined ){

                    newState = Object.assign({}, newState, {
                        images: [],
                    });
                }else {
                    newState = Object.assign({}, newState, {
                        ...state,
                        images: [...state.images, action.data.data.image],
                    });
                }
            }
            return  newState ;


        default:
            return state || newState;
    }
}

