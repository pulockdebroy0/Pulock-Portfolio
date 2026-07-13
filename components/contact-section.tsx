'use client';

import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { Mail, Phone, Linkedin, Facebook, Send } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

interface ContactInfo {
  email: string;
  whatsapp: string;
  whatsapp_url: string;
  linkedin_name: string;
  linkedin_url: string;
}

const inputClasses =
  'w-full rounded-[var(--radius-input)] bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/80 border border-border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-0 focus-visible:border-transparent';

export default function ContactSection() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'pulock@ravenence.com',
    whatsapp: '+8801739161076',
    whatsapp_url: 'https://wa.me/8801739161076',
    linkedin_name: 'Pulock Deb Roy',
    linkedin_url: 'https://www.linkedin.com/in/pulock-deb-roy-833584218',
  });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/contact-info')
      .then((r) => r.json())
      .then((data) => { if (data && !data.error) setContactInfo(data); })
      .catch(() => {});
  }, []);

  const contactLinks = [
    { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: Phone, label: 'WhatsApp', value: contactInfo.whatsapp, href: contactInfo.whatsapp_url },
    { icon: Linkedin, label: 'LinkedIn', value: contactInfo.linkedin_name, href: contactInfo.linkedin_url },
    { icon: Facebook, label: 'Facebook', value: 'Pulock Deb Roy', href: 'https://www.facebook.com/pulockdebroy.dip.9' },
  ];

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Save to DB
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to save message');

      // Send email via EmailJS
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: 'Pulock',
          },
          publicKey
        );
      }

      toast.success("Message sent — I'll reply within a day.");
      setFormData({ name: '', email: '', message: '' });
    } catch {
      toast.error("The message didn't send. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="bloom -bottom-56 right-[-8%] h-120 w-120 opacity-60" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-12">
          {/* Left — invitation */}
          <div>
            <h2 className="font-display text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-foreground">
              Get in touch.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Got a project, question, or just want to say hello? Let&rsquo;s talk.
              I typically respond within 24 hours.
            </p>

            <div className="mt-10 space-y-5">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-card text-muted-foreground transition-colors duration-200 group-hover:text-primary">
                    <link.icon className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {link.label}
                    </span>
                    <span className="block text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
                      {link.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-(--radius-card) bg-card p-7 md:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  type="text" id="name" name="name" value={formData.name}
                  onChange={handleInputChange} required autoComplete="name"
                  placeholder="Your name" className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  Email address
                </label>
                <input
                  type="email" id="email" name="email" value={formData.email}
                  onChange={handleInputChange} required autoComplete="email"
                  placeholder="you@example.com" className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message" name="message" value={formData.message}
                  onChange={handleInputChange} required rows={5}
                  placeholder="Tell me about your project…"
                  className={`${inputClasses} resize-none`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60"
            >
              {submitting ? 'Sending…' : (<>Send message<Send className="h-4 w-4" /></>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
