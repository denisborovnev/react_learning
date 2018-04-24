import React, { PureComponent, Component } from 'react';

//export class TodoList extends Component {
export class TodoList extends PureComponent {

    render() {
        //console.log("render");
        return (
            <div>
                {this.props.items.map((item, index) => <div key={item.id}>{item.name}</div>)}
            </div>
        )
    }
}