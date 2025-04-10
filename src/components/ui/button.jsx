// src/components/ui/button.jsx
export default function Button({ children, className = "", ...props }) {
    return (
      <button
        className={`rounded-xl px-4 py-2 font-semibold transition ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  