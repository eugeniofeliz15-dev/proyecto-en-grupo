import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  tieneError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { tieneError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { tieneError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    console.error("Error de renderizado:", error, info.componentStack);
  }

  private intentarDeNuevo = () => {
    this.setState({ tieneError: false, error: null });
  };

  render() {
    if (this.state.tieneError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <section
          role="alert"
          className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-900"
        >
          <h2 className="font-bold">Ocurrió un error</h2>
          <p className="mt-2 text-sm">
            {this.state.error?.message || "No se pudo mostrar esta sección."}
          </p>
          <button
            type="button"
            onClick={this.intentarDeNuevo}
            className="mt-4 rounded-xl bg-rose-700 px-4 py-2 text-sm font-bold text-white hover:bg-rose-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
          >
            Intentar de nuevo
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
