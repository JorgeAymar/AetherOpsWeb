import { createRoot } from "react-dom/client";
import { Component, type ReactNode, type ErrorInfo } from "react";
import App from "./App";
import "./index.css";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[AetherOps] Render error:", error, info);
  }
  render() {
    if (this.state.error) {
      const err = this.state.error as Error;
      return (
        <div style={{ padding: "40px", fontFamily: "monospace", background: "#fff", color: "#333" }}>
          <h2 style={{ color: "#c00" }}>Error al cargar la aplicación</h2>
          {import.meta.env.DEV ? (
            <pre style={{ background: "#f5f5f5", padding: "16px", overflow: "auto", fontSize: "13px" }}>
              {err.message}{"\n"}{err.stack}
            </pre>
          ) : (
            <p>Por favor recarga la página o inténtalo más tarde.</p>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

const root = document.getElementById("root");
if (!root) {
  document.body.innerHTML = '<div style="padding:40px;color:red;font-family:monospace">ERROR: No se encontró #root en el DOM</div>';
} else {
  createRoot(root).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
