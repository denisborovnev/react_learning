import React, { Component } from 'react';

const withWindowWidth = (WrappedComponent) => {
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
            return this.state.width && <WrappedComponent {...this.props} windowWidth={this.state.width} />
        }
    }
};


class Line extends Component {
    render() {
        return <div style={{ width: this.props.windowWidth, height: 30, backgroundColor: this.props.color }} />
    }
}


export const FullWindowLine = withWindowWidth(Line);