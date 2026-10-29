"use client";

/**
 * Pill-shaped toggle buttons. `multiple` allows several selections (checkbox-like);
 * otherwise it behaves like a radio group. Selected values are submitted through hidden inputs.
 */
export function OptionChips({
  name,
  options,
  value,
  onChange,
  multiple = false,
  label,
}: {
  name: string;
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
  multiple?: boolean;
  label?: string;
}) {
  return (
    <div className="flex flex-wrap gap-[8px]" role="group" aria-label={label}>
      {options.map((option) => {
        const on = value.includes(option);
        return (
          <button
            key={option}
            type="button"
            className={`opt ${on ? "bg-emerald-50 border-emerald-600 text-emerald-800" : "bg-white border-line text-ink-soft"}`}
            aria-pressed={on}
            onClick={() =>
              onChange(multiple ? (on ? value.filter((v) => v !== option) : [...value, option]) : [option])
            }
          >
            {option}
          </button>
        );
      })}
      {value.map((v) => (
        <input key={v} type="hidden" name={name} value={v} />
      ))}
    </div>
  );
}
