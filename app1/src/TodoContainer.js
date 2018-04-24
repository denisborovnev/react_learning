import React, { Component } from 'react';
import _ from "lodash";
import {TodoList} from "./TodoList";

export class TodoContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: _.map(_.range(1, 10000), x => ({ id: x, name: `todo - ${x}`})),
            text: "",
            newTodoWasAdded: false
        };
    }

    onTextChange = (e) => {
        this.setState({ text: e.target.value });
    };

    addTodo = () => {
        if(!this.state.text)
            return;
        
        let id = _.maxBy(this.state.items, "id").id + 1;
        let item = { id, name: this.state.text };
                
        this.setState({
            text: "",
            items: [item, ...this.state.items],
            newTodoWasAdded: true
        });
    };
    
    render() {
        
        return (
            <div>
                {this.state.newTodoWasAdded && <div>Item was added</div>}
                <input type={"text"} value={this.state.text} onChange={this.onTextChange} />
                <button type={"button"} onClick={this.addTodo}>Add</button>
                <TodoList items={this.state.items} />
            </div>
        )
    }
}