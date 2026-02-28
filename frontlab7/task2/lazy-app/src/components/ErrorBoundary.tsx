import type { ReactNode } from "react";
import { Component } from "react";
interface Props {
    children: ReactNode;
    fallback: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    resetError = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: "16px" }}>
                    {this.props.fallback}
                    <button onClick={this.resetError} style={{ marginTop: "12px", padding: "8px 12px" }}>
                    Try Again</button>
                    </div>);
        }
        
        return this.props.children;
    }
}