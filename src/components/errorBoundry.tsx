import { Component } from "react";

export class TimerErrorBoundry extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Timpul introdus nu este valid</h1>;
        }

        return this.props.children;
    }
}