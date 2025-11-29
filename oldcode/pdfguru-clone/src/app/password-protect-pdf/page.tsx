import ToolPageTemplate from "@/components/ToolPageTemplate";
import { Lock } from "lucide-react";

export const metadata = {
  title: "Password Protect PDF - Secure Your PDFs",
  description: "Add password protection and encryption to your PDF files for security",
};

export default function PasswordProtectPdfPage() {
  return (
    <ToolPageTemplate
      title="Password Protect PDF"
      description="Secure your PDF files with strong password protection and encryption"
      icon={Lock}
      features={[
        {
          title: "Strong Encryption",
          description: "256-bit AES encryption to protect your sensitive documents",
        },
        {
          title: "Permission Controls",
          description: "Set restrictions on printing, editing, and copying",
        },
        {
          title: "User Password",
          description: "Require a password to open and view the PDF",
        },
        {
          title: "Owner Password",
          description: "Separate password for modifying security settings",
        },
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Upload Your PDF",
          description: "Select the PDF file you want to protect",
        },
        {
          step: 2,
          title: "Set Password",
          description: "Create a strong password and choose permission settings",
        },
        {
          step: 3,
          title: "Download Secured PDF",
          description: "Get your password-protected, encrypted PDF file",
        },
      ]}
    />
  );
}
