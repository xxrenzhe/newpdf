import Link from "next/link";
import { Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  const toolsLinks = [
    { href: "/edit-and-sign", label: "Edit & Sign" },
    { href: "/conversion-tools", label: "Convert" },
    { href: "/forms", label: "Forms" },
    { href: "/form-templates", label: "Templates" },
    { href: "/pdf-summarizer", label: "AI PDF Summarizer" },
  ];

  const companyLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/about-us", label: "About Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/reviews", label: "Reviews" },
  ];

  const legalLinks = [
    { href: "/subscription-terms", label: "Subscription terms" },
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/money-back-policy", label: "Money-back policy" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/notice-at-collection", label: "Notice at Collection" },
    { href: "/cookie-policy", label: "Cookie Policy" },
  ];

  const socialLinks = [
    { href: "#", label: "LinkedIn", icon: Linkedin },
    { href: "#", label: "Facebook", icon: Facebook },
    { href: "#", label: "X", icon: () => <span className="text-lg">𝕏</span> },
    { href: "#", label: "Pinterest", icon: () => <span className="text-lg">P</span> },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-gradient">PDF</span>
              <span className="text-white">Tools</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-white mb-4">Tools</h3>
            <ul className="space-y-2">
              {toolsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Information */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal Information</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              © PDF Tools. All rights reserved 2025. Support +1 (866) 716-6045
              <br />
              GURUDOCS LIMITED, 9205 West Russell Road, Las Vegas, Nevada, 89148, USA
            </div>
            <div className="flex space-x-4">
              <h4 className="font-semibold text-white">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="hover:text-primary transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon && <link.icon className="h-5 w-5" />}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
