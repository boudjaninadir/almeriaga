'use client';

import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/Icons';

const CONTROL =
  'h-12 w-full rounded-xl border bg-[#0B3D2E] px-4 text-base text-[#F7F5EF] placeholder:text-ink-faint ' +
  'transition focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 disabled:opacity-60';

function controlClasses(hasError: boolean): string {
  return cn(
    CONTROL,
    hasError
      ? 'border-danger'
      : 'border-[#D4AF37]/25 hover:border-[#D4AF37]/50 focus:border-[#D4AF37]',
  );
}


type ShellProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

function FieldShell({ id, label, hint, error, required, children }: ShellProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-[#F7F5EF]">
        {label}
        {required && (
          <span aria-hidden="true" className="text-[#D4AF37]">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-ink-faint">
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
};

export function TextField({ label, hint, error, required, className, ...rest }: TextFieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(controlClasses(Boolean(error)), className)}
        {...rest}
      />
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
          className={cn(controlClasses(Boolean(error)), 'appearance-none pr-11', className)}
          {...rest}
        >
          {children}
        </select>
        <Icon
          name="chevron"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
        />
      </div>
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
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn('mt-0.5 h-5 w-5 shrink-0 rounded-md border-[#D4AF37]/40 accent-[#D4AF37]', className)}
          {...rest}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="pl-8 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
