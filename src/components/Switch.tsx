import type { ChangeEvent } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({ checked, onChange, disabled = false }: SwitchProps) {
  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked);

  return (
    <label className={`inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <input type="checkbox" className="sr-only" checked={checked} onChange={handle} disabled={disabled} />
      <span
        className={`w-11 h-6 bg-gray-300 rounded-full relative transition-colors ${checked ? 'bg-teal-500' : ''}`}
        aria-hidden
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${checked ? 'translate-x-5' : ''}`}
        />
      </span>
    </label>
  );
}

export default Switch;
