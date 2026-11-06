'use client';

import { useId } from 'react';
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/cn';

const CONTROL =
  'w-full rounded-[2px] border bg-paper text-[14px] text-ink placeholder:text-stone ' +
  'transition-colors focus:outline-none focus:border-ink focus:ring-0 disabled:opacity-60';

function controlClasses(hasError: boolean): string {
  return cn(CONTROL, hasError ? 'border-danger' : 'border-chalk hover:border-stone');
}

type ShellProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  success?: string;
  required?: boolean;
  children: ReactNode;
};

function FieldShell({ id, label, hint, error, success, required, children }: ShellProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-sans text-[13px] font-medium leading-none text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-stone">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[12px] font-medium leading-relaxed text-danger">
          {error}
        </p>
      ) : success ? (
        <p id={`${id}-success`} className="text-[12px] leading-relaxed text-stone">
          {success}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[12px] leading-relaxed text-stone">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string;
  hint?: string;
  error?: string;
  success?: string;
  /** Préfixe visuel (ex. indicatif +213) séparé par un filet. */
  addon?: ReactNode;
};

export function TextField({ label, hint, error, success, required, className, addon, ...rest }: TextFieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : success ? `${id}-success` : hint ? `${id}-hint` : undefined;
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} success={success} required={required}>
      {addon ? (
        <div className={cn('flex h-12 items-stretch rounded-[2px] border bg-paper transition-colors focus-within:border-ink', error ? 'border-danger' : 'border-chalk hover:border-stone')}>
          <span className="flex shrink-0 items-center gap-1 border-e border-chalk px-3 font-sans text-[14px] text-ink">
            {addon}
          </span>
          <input
            id={id}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className="h-full w-full min-w-0 bg-transparent px-3 font-sans text-[14px] text-ink placeholder:text-stone focus:outline-none"
            {...rest}
          />
        </div>
      ) : (
        <input
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(controlClasses(Boolean(error)), 'h-12 px-4', className)}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> & {
  label: string;
  hint?: string;
  error?: string;
};

export function SelectField({ label, hint, error, required, className, children, ...rest }: SelectFieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(controlClasses(Boolean(error)), 'h-12 appearance-none px-4 pe-11', className)}
          {...rest}
        >
          {children}
        </select>
        <svg
          viewBox="0 0 16 16"
          className="select-chevron pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-stone"
          fill="none"
          aria-hidden="true"
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </FieldShell>
  );
}

type TextAreaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & {
  label: string;
  hint?: string;
  error?: string;
};

export function TextAreaField({ label, hint, error, required, className, ...rest }: TextAreaFieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(controlClasses(Boolean(error)), 'min-h-[112px] resize-y px-4 py-3 leading-relaxed', className)}
        {...rest}
      />
    </FieldShell>
  );
}

type CheckFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> & {
  label: ReactNode;
  error?: string;
};

export function CheckField({ label, error, className, ...rest }: CheckFieldProps) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 font-sans text-[12px] leading-[1.6] text-ink">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn('mt-0.5 h-[18px] w-[18px] shrink-0 rounded-[2px] border border-ink accent-ink', className)}
          {...rest}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="pl-[30px] text-[12px] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
