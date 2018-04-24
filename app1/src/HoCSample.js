import React, { Component } from 'react';

const withWindowWidth = (wrapFunction) => {
    return class extends Component {
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
            return this.state.width && wrapFunction(this.props, this.state.width)
        }
    }
};


class Line extends Component {
    render() {
        return <div style={{ width: this.props.width, height: 30, backgroundColor: this.props.color }} />
    }
}


export const FullWindowLine = withWindowWidth((props, windowWidth) => <Line {...props} width={windowWidth} />);
export const HalfWindowLine = withWindowWidth((props, windowWidth) => <Line {...props} width={windowWidth / 2} />);