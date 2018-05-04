import { ActionTypes2, createSetAgeAction, createStore2, State2 } from "./store2";
import { Dispatch, Middleware } from "redux";


describe("empty middleware", () => {

    const testMiddleware: Middleware<{}, State2> = (api) => (next) => (action) => {
        //next(action);
    };

    test("no hit to reducer", () => {
        let store = createStore2(testMiddleware);
        store.dispatch(createSetAgeAction(25));
        
        expect(store.getState()).toMatchObject(<State2> {
            age: 10
        })
    });

    test("no notification ?", () => {
        let store = createStore2(testMiddleware);
        
        store.subscribe(() => {
            expect(1).toBe(1);
        });
        
        store.dispatch(createSetAgeAction(25));

        expect.assertions(1);
    });
});

describe("thunkMiddleware", () => {

    const thunkMiddleware: Middleware<Function, State2> = (api) => (next) => (action) => {
        if(typeof action === "function"){
            return action(api.dispatch, api.getState);
        }
        
        return next(action);
    };
    
    type ThunkAction = (dispatch?: Dispatch, getState?: () => State2) => any;

    test("simple objects ignored by middleware and fallbacks to default", () => {
        let store = createStore2(thunkMiddleware);
        store.dispatch(createSetAgeAction(25));

        expect(store.getState()).toMatchObject(<State2> {
            age: 25
        });
    });

    test("function should be handled by middleware", () => {
        let store = createStore2(thunkMiddleware);
        let action: ThunkAction = (dispatch, getState) => {
            if(getState().age === 10) {
                dispatch(createSetAgeAction(getState().age + 1));
            }
        };
        
        //TODO: check how to extend store actions
        store.dispatch(<any>action);
        store.dispatch(<any>action);
        store.dispatch(<any>action);

        expect(store.getState()).toMatchObject(<State2> {
            age: 11
        });
    });

    test("function that dispatches one more function", () => {
        let store = createStore2(thunkMiddleware);
        let action: ThunkAction = (dispatch, getState) => {
            if(getState().age === 10) {
                dispatch(createSetAgeAction(getState().age + 1));
            }
        };

        let outerAction: ThunkAction = (dispatch, getState) => {
            //if it works then dispatch here is the same as store.dispatch...
            dispatch(<any>action);
        };

        store.dispatch(<any>outerAction);

        expect(store.getState()).toMatchObject(<State2> {
            age: 11
        });
    });
    
    test("what dispatch returns for simple action ??", () => {
        let store = createStore2(thunkMiddleware);
        
        let result = store.dispatch(createSetAgeAction(25));
        
        expect(result).toMatchObject(<ReturnType<typeof createSetAgeAction>> {
            type: ActionTypes2.SET_AGE,
            value: 25
        });
    });
    
    test("what dispatch returns for actions processed by middleware ??", () => {
        let store = createStore2(thunkMiddleware);
        let action: ThunkAction = () => {
            return { myresult: 500 };
        };
        
        let result = store.dispatch(<any>action);
        
        expect(result).toMatchObject({ myresult: 500});
    });
});