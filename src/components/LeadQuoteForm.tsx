import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { Send } from 'lucide-react';
import type { LeadFormFields, LeadFormStatus } from '../hooks/useLeadForm';

const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAACkcoQ4pjVYMr-l8';

export type LeadQuoteVariant =
  | 'embedded'
  | 'contact'
  | 'stacked-residential'
  | 'stacked-pricing';

export interface LeadQuoteFormProps {
  variant: LeadQuoteVariant;
  formId: string;
  ariaLabel: string;
  formData: LeadFormFields;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  status: { type: LeadFormStatus; message: ReactNode };
  setTurnstileToken: (token: string | null) => void;
}

const embeddedInput =
  'w-full px-4 py-3 bg-brand-dark border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light rounded-md';

const flatBlackInput =
  'w-full px-4 py-3 bg-brand-black border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light';

function StatusBlock({ status }: { status: LeadQuoteFormProps['status'] }) {
  return (
    <div aria-live="polite" className="min-h-[24px]">
      {status.message && (
        <p
          className={`text-sm ${
            status.type === 'error'
              ? 'text-red-400'
              : status.type === 'success'
                ? 'text-brand-green'
                : 'text-white/70'
          }`}
        >
          {status.message}
        </p>
      )}
    </div>
  );
}

function TurnstileBlock({
  className,
  setTurnstileToken,
}: {
  className: string;
  setTurnstileToken: LeadQuoteFormProps['setTurnstileToken'];
}) {
  return (
    <div className={className}>
      <Turnstile
        siteKey={TURNSTILE_SITE_KEY}
        onSuccess={(token) => setTurnstileToken(token)}
        onError={() => setTurnstileToken(null)}
        onExpire={() => setTurnstileToken(null)}
        options={{ theme: 'dark' }}
      />
    </div>
  );
}

function SubmitButton({
  status,
  rounded,
  children,
}: {
  status: LeadQuoteFormProps['status'];
  rounded?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={status.type === 'loading'}
      className={`w-full py-4 bg-brand-green hover:bg-brand-green-light text-black font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed${rounded ? ' rounded-md' : ''}`}
    >
      {status.type === 'loading' ? 'Sending...' : children}
    </button>
  );
}

function Honeypot({
  id,
  formData,
  handleChange,
}: {
  id: string;
  formData: LeadFormFields;
  handleChange: LeadQuoteFormProps['handleChange'];
}) {
  return (
    <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
      <label htmlFor={id}>Website URL</label>
      <input
        type="text"
        id={id}
        name="website_url"
        tabIndex={-1}
        autoComplete="off"
        value={formData.website_url}
        onChange={handleChange}
      />
    </div>
  );
}

export default function LeadQuoteForm({
  variant,
  formId,
  ariaLabel,
  formData,
  handleChange,
  handleSubmit,
  status,
  setTurnstileToken,
}: LeadQuoteFormProps) {
  if (variant === 'embedded' || variant === 'contact') {
    const isContact = variant === 'contact';
    const formGap = isContact ? 'space-y-6' : 'space-y-5';
    const gridGap = isContact ? 'gap-6' : 'gap-5';
    const inputClass = isContact ? flatBlackInput : embeddedInput;
    const textareaRows = isContact ? 5 : 4;
    const turnstileWrap = isContact ? 'flex justify-center my-4' : 'flex justify-center my-2';
    const buttonRounded = !isContact;

    return (
      <form
        id={formId}
        onSubmit={handleSubmit}
        className={formGap}
        aria-label={ariaLabel}
      >
        <Honeypot id="website_url" formData={formData} handleChange={handleChange} />

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridGap}`}>
          <div>
            <label htmlFor="from_name" className="block text-sm font-medium text-white/80 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="from_name"
              name="from_name"
              required
              value={formData.from_name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Jane Doe"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="reply_to" className="block text-sm font-medium text-white/80 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="reply_to"
              name="reply_to"
              required
              value={formData.reply_to}
              onChange={handleChange}
              className={inputClass}
              placeholder="jane@example.com"
              aria-required="true"
            />
          </div>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridGap}`}>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="(604) 555-0123"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-white/80 mb-2">
              Property Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={inputClass}
              placeholder="1234 Main St, Squamish"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
            Project Details
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={textareaRows}
            value={formData.message}
            onChange={handleChange}
            className={
              isContact
                ? `${flatBlackInput} resize-none`
                : 'w-full px-4 py-3 bg-brand-dark border border-white/20 text-white focus:border-brand-green outline-none transition-all font-light resize-none rounded-md'
            }
            placeholder="Please provide details about your project location and requirements..."
            aria-required="true"
          />
        </div>

        <TurnstileBlock className={turnstileWrap} setTurnstileToken={setTurnstileToken} />
        <StatusBlock status={status} />
        <SubmitButton status={status} rounded={buttonRounded}>
          <>
            Send Request <Send size={20} />
          </>
        </SubmitButton>
      </form>
    );
  }

  const isResidential = variant === 'stacked-residential';
  const p = isResidential ? 'residential_' : '';
  const honeypotId = isResidential ? 'residential_website_url' : 'website_url';
  const messageLabel = isResidential ? 'Project description' : 'Project Description';
  const phoneLabel = isResidential ? 'Phone number' : 'Phone Number';
  const sendLabel = isResidential ? (
    <>
      Send request <Send size={20} />
    </>
  ) : (
    <>
      Send Request <Send size={20} />
    </>
  );

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="space-y-6"
      aria-label={ariaLabel}
    >
      <Honeypot id={honeypotId} formData={formData} handleChange={handleChange} />

      <div>
        <label
          htmlFor={`${p}from_name`}
          className="block text-sm font-medium text-white/80 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id={`${p}from_name`}
          name="from_name"
          required
          value={formData.from_name}
          onChange={handleChange}
          className={flatBlackInput}
          placeholder="Jane Doe"
          aria-required="true"
        />
      </div>

      <div>
        <label
          htmlFor={`${p}address`}
          className="block text-sm font-medium text-white/80 mb-2"
        >
          Address
        </label>
        <input
          type="text"
          id={`${p}address`}
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
          className={flatBlackInput}
          placeholder="Property address"
          aria-required="true"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor={`${p}reply_to`}
            className="block text-sm font-medium text-white/80 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id={`${p}reply_to`}
            name="reply_to"
            required
            value={formData.reply_to}
            onChange={handleChange}
            className={flatBlackInput}
            placeholder="jane@example.com"
            aria-required="true"
          />
        </div>
        <div>
          <label
            htmlFor={`${p}phone`}
            className="block text-sm font-medium text-white/80 mb-2"
          >
            {phoneLabel}
          </label>
          <input
            type="tel"
            id={`${p}phone`}
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className={flatBlackInput}
            placeholder="(604) 555-0123"
            aria-required="true"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${p}message`}
          className="block text-sm font-medium text-white/80 mb-2"
        >
          {messageLabel}
        </label>
        <textarea
          id={`${p}message`}
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`${flatBlackInput} resize-none`}
          placeholder={
            isResidential
              ? 'Describe your project, timeline, and any questions you have.'
              : 'Please describe your project requirements.'
          }
          aria-required="true"
        />
      </div>

      <TurnstileBlock className="flex justify-center my-4" setTurnstileToken={setTurnstileToken} />
      <StatusBlock status={status} />
      <SubmitButton status={status}>{sendLabel}</SubmitButton>
    </form>
  );
}
