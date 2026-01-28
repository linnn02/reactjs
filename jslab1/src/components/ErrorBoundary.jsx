import React from "react";
import PropTypes from "prop-types";

/*
ловит ошибки
*/
export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, message: "" };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, message: error?.message || "Ошибка" };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 16 }}>
                    <h2>Ошибка</h2><p>{this.state.message}</p></div>);
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};
