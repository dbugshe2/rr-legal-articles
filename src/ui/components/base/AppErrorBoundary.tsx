import React from "react";
import { Link } from "react-router-dom";
import { Button } from ".";
import { ArrowLeftIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AppErrorBoundary extends React.Component<Record<string, any>, ErrorBoundaryState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorBoundaryFallback />;
    }

    return this.props.children;
  }
}

export const RouteErrorElement: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 h-screen justify-center items-center">
      <ExclamationTriangleIcon width={300} height={300} />
      <h1 className="font-bold text-4xl text-center">Oops Something went wrong</h1>
      <div className="text-lg text-center flex justify-center items-center flex-row">
        <span>But no worries you can always find your way </span>
        <Button asChild variant={"link"}>
          <Link to={"/"}>
            <ArrowLeftIcon />
            &nbsp;&nbsp; Back Home
          </Link>
        </Button>
      </div>
    </div>
  );
};
export const ErrorBoundaryFallback: React.FC = props => {
  console.log({ props });
  return (
    <div className="flex flex-col gap-10 h-screen justify-center items-center">
      <ExclamationTriangleIcon width={300} height={300} />
      <h1 className="font-bold text-4xl text-center">Oops Something went wrong</h1>
      <div className="text-lg text-center flex justify-center items-center flex-row">
        <span>An error occured, kinly try again or try the home page </span>
        <Button asChild variant={"link"}>
          <Link to={"/"}>
            <ArrowLeftIcon />
            &nbsp;&nbsp; Back Home
          </Link>
        </Button>
      </div>
    </div>
  );
};
