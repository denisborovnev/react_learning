import { createSetMyValueAction, createStore, State1 } from "./store1";


describe("store1", () => {
    let store: ReturnType<typeof createStore>;

    beforeEach(() => {
        store = createStore();
    });

    test("initial state from reducer", () => {
        expect(store.getState()).toMatchObject(<State1>{
            myValue: 10
        });
    });

    test("passed to the store wins ??", () => {
        store = createStore({ myValue: 12 });
        expect(store.getState()).toMatchObject(<State1>{
            myValue: 12
        });
    });

    test("passed to the store merged with reducer's initial value", () => {
        store = createStore({ myValue: 12 });
        expect(store.getState()).toMatchObject(<State1>{
            myValue: 12,
            superValue: 5
        });
    });
    
    test("dispatch and listen, that's it", () => {
        //no args)
        store.subscribe(() => {
            expect(store.getState()).toMatchObject(<State1> {
                myValue: 55
            })
        });
        
        store.dispatch(createSetMyValueAction(55));
        expect.assertions(1);
    })

});