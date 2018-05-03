import * as redux from "redux";
import { SetValueAction, SetValueActionCreator } from "./types";

export interface State1 {
    myValue: number;
    superValue?: number;
}

export enum ActionTypes {
    SET_MY_VALUE = "SET_MY_VALUE"
}

export type SetMyValueAction = SetValueAction<number, ActionTypes.SET_MY_VALUE>;


export const createSetMyValueAction: SetValueActionCreator<SetMyValueAction> = (value) => ({
    type: ActionTypes.SET_MY_VALUE,
    value: value
});

export type Store1Actions = SetMyValueAction;

let reducer = (state: State1 = { myValue: 10, superValue: 5 }, action: Store1Actions) => {
    switch(action.type){
        case ActionTypes.SET_MY_VALUE: 
            return { ...state, myValue: action.value };
        default:
            return state;
    }
};

export const createStore = (initialState?: DeepPartial<State1>) => redux.createStore(reducer, initialState);