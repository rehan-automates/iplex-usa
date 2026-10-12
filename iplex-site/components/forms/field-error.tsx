/** Inline validation message shown under a form field. */
export function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <span id={id} role="alert" className="mt-[-8px] text-[13.5px] font-semibold text-[#B42318]">
      {children}
    </span>
  );
}

/** Hidden spam trap. Real visitors never see or fill it. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Collects a form's fields; repeated names (checkbox groups) become arrays. */
export function formFields(form: HTMLFormElement): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  new FormData(form).forEach((value, key) => {
    if (typeof value !== "string") return;
    const prev = out[key];
    if (prev === undefined) out[key] = value;
    else out[key] = Array.isArray(prev) ? [...prev, value] : [prev, value];
  });
  return out;
}
