import React, { Component } from 'react';

export class WindowWidth extends Component {
        constructor(props) {
            super(props);
            this.state = {
                width: null
            };
        }

        updateWidth = () => this.setState({
            width: window.innerWidth
        }); 
        
        componentDidMount() {
            this.updateWidth();
            window.addEventListener("resize", this.updateWidth);
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.updateWidth);
        }
        
        render() {
            return this.state.width && this.props.children(this.state.width)
        }
    }


class Line extends Component {
    render() {
        return <div style={{ width: this.props.width, height: 30, backgroundColor: this.props.color }} />
    }
}


export const FullWindowLine = (props) => (
    <WindowWidth>
        {(width) => <Line {...props} width={width} />}
    </WindowWidth>
);
export const HalfWindowLine = (props) => (
    <WindowWidth>
        {(width) => <Line {...props} width={width / 2} />}
    </WindowWidth>
);