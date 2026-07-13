import { Mail, Phone, Linkedin, Facebook } from 'lucide-react';

const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Mail, href: 'mailto:pulock@ravenence.com', label: 'Email' },
  { icon: Phone, href: 'https://wa.me/+8801739161076', label: 'WhatsApp' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/pulock-deb-roy-833584218', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://www.facebook.com/pulockdebroy.dip.9', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="pb-10 pt-20 md:pt-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Statement */}
        <p className="max-w-[28ch] font-display text-[clamp(1.75rem,5vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.02em] text-foreground">
          Systems first. <span className="text-primary">Scale follows.</span>
        </p>

        {/* Meta row */}
        <div className="mt-14 flex flex-col gap-6 border-t border-border pt-7 md:flex-row md:items-baseline md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">
              Pulock Deb Roy &copy; 2026
            </p>
            <p className="text-xs text-muted-foreground/60">
              Developed by{' '}
              <a
                href="https://ravenence.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors duration-200 hover:text-primary"
              >
                Ravenence.com
              </a>
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
