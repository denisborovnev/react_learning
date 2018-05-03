import * as redux from "redux";

export interface SetValueAction<T = any, Types extends string = any> extends redux.Action<Types> {
    value: T;
}

type GetValueType<T extends SetValueAction> = T extends SetValueAction<infer V> ? V : never;

export interface SetValueActionCreator<A extends SetValueAction> {
    (value: GetValueType<A>): A
    //(value: A["value"]): A
}