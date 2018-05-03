import { createStore, applyMiddleware, Middleware } from "redux";
import { SetValueAction, SetValueActionCreator } from "./types";

export type State2 = {
    age: number;
}

export enum ActionTypes2 {
    SET_AGE = "SET_AGE"
}

type SetAgeAction = SetValueAction<number, ActionTypes2.SET_AGE>;
type SetAgeActionCreator = SetValueActionCreator<SetAgeAction>;

export const createSetAgeAction: SetAgeActionCreator = (age) => ({
    type: ActionTypes2.SET_AGE,
    value: age
});

export type Actions2 = SetAgeAction;

const initState: State2 = { age: 10 };
const reducer = (state = initState, action: Actions2) => {
    switch (action.type){
        case ActionTypes2.SET_AGE:
            return { ...state, age: action.value };
        default:
            return state;
    } 
};

export const createStore2 = <Extend = {}>(...middlewares: Middleware<Extend, State2>[]) => {
    return createStore(reducer, applyMiddleware(...middlewares));
};