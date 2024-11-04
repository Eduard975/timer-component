import { Component, ReactNode } from "react";

type TimerErrorBoundaryProps = {
  children: ReactNode;
};

type TimerErrorBoundaryState = {
  hasError: boolean;
  errorMessage?: string;
};

export class TimerErrorBoundary extends Component<
  TimerErrorBoundaryProps,
  TimerErrorBoundaryState
> {
  constructor(props: TimerErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            backgroundColor: "#fdd",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          <h1 style={{ color: "red" }}>ERROR</h1>
          <p>{this.state.errorMessage || "An unexpected error occurred."}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
