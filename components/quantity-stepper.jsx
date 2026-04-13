"use client";

export function QuantityStepper({ value, onChange }) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border border-outline-variant/30 bg-white">
      <button
        className="px-4 py-3 text-lg font-bold text-on-surface transition hover:bg-surface-container-low"
        onClick={() => onChange(Math.max(1, value - 1))}
        type="button"
      >
        -
      </button>
      <span className="min-w-12 px-4 text-center text-sm font-bold">{value}</span>
      <button
        className="px-4 py-3 text-lg font-bold text-on-surface transition hover:bg-surface-container-low"
        onClick={() => onChange(value + 1)}
        type="button"
      >
        +
      </button>
    </div>
  );
}
