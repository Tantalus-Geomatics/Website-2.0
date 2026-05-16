import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import emailjs from '@emailjs/browser';

export type LeadFormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface LeadFormFields {
  from_name: string;
  reply_to: string;
  phone: string;
  address: string;
  message: string;
  website_url: string;
}

const emptyForm: LeadFormFields = {
  from_name: '',
  reply_to: '',
  phone: '',
  address: '',
  message: '',
  website_url: '',
};

const errorEmailLink = (
  <>
    There was an error sending your request. Please email us directly at{' '}
    <a
      href="mailto:contact@tantalusgeomatics.com"
      className="underline hover:text-brand-green transition-colors"
    >
      contact@tantalusgeomatics.com
    </a>
    .
  </>
);

export function useLeadForm() {
  const [formData, setFormData] = useState<LeadFormFields>(emptyForm);
  const [status, setStatus] = useState<{
    type: LeadFormStatus;
    message: ReactNode;
  }>({ type: 'idle', message: '' });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      blockHeadless: true,
      limitRate: {
        id: 'app',
        throttle: 10000,
      },
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.website_url) {
      return;
    }

    if (!turnstileToken) {
      setStatus({ type: 'error', message: 'Please complete the CAPTCHA verification.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending your request...' });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_3rqnrju',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_uvo8zyr',
        e.currentTarget
      );

      setStatus({
        type: 'success',
        message: 'Thank you! Your request has been sent successfully. We will be in touch soon.',
      });
      setFormData(emptyForm);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus({ type: 'error', message: errorEmailLink });
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    status,
    setTurnstileToken,
  };
}
