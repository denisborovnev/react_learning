import React, { Component } from 'react';
import _ from "lodash";

export class TodoContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: _.map(_.range(1, 10000), x => ({ id: x, name: `todo - ${x}`})),
            text: ""
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
            items: [item, ...this.state.items]
        });
    };
    
    render() {
        return (
            <div>
                <input type={"text"} value={this.state.text} onChange={this.onTextChange} />
                <button type={"button"} onClick={this.addTodo}>Add</button>
                <div>
                    {this.state.items.map((item, index) => <div key={item.id}>{item.name}</div>)}
                </div>
            </div>
        )
    }
}