import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import {
  FileText,
  Image,
  FileSpreadsheet,
  Presentation,
  Code,
  BookOpen,
  FileImage,
  File
} from "lucide-react";

export default function ConversionToolsPage() {
  const convertFromPDF = [
    { href: "/pdf-to-word", icon: FileText, title: "PDF to Word" },
    { href: "/pdf-to-jpg", icon: Image, title: "PDF to JPG" },
    { href: "/pdf-to-png", icon: Image, title: "PDF to PNG" },
    { href: "/pdf-to-excel", icon: FileSpreadsheet, title: "PDF to Excel" },
    { href: "/pdf-to-pptx", icon: Presentation, title: "PDF to PPTX" },
    { href: "/pdf-to-epub", icon: BookOpen, title: "PDF to EPUB" },
    { href: "/pdf-to-image", icon: FileImage, title: "PDF to Image" },
    { href: "/pdf-to-docx", icon: FileText, title: "PDF to DOCX" },
    { href: "/pdf-to-html", icon: Code, title: "PDF to HTML" },
    { href: "/pdf-to-tiff", icon: Image, title: "PDF to TIFF" },
    { href: "/pdf-to-svg", icon: Image, title: "PDF to SVG" },
    { href: "/pdf-to-text", icon: FileText, title: "PDF to Text" },
  ];

  const convertToPDF = [
    { href: "/word-to-pdf", icon: FileText, title: "Word to PDF" },
    { href: "/jpg-to-pdf", icon: Image, title: "JPG to PDF" },
    { href: "/png-to-pdf", icon: Image, title: "PNG to PDF" },
    { href: "/excel-to-pdf", icon: FileSpreadsheet, title: "Excel to PDF" },
    { href: "/pptx-to-pdf", icon: Presentation, title: "PPTX to PDF" },
    { href: "/epub-to-pdf", icon: BookOpen, title: "EPUB to PDF" },
    { href: "/image-to-pdf", icon: FileImage, title: "Image to PDF" },
    { href: "/docx-to-pdf", icon: FileText, title: "DOCX to PDF" },
    { href: "/html-to-pdf", icon: Code, title: "HTML to PDF" },
    { href: "/text-to-pdf", icon: FileText, title: "Text to PDF" },
  ];

  const otherFormats = [
    { href: "/jpg-to-png", icon: Image, title: "JPG to PNG" },
    { href: "/png-to-jpg", icon: Image, title: "PNG to JPG" },
    { href: "/heic-to-jpg", icon: Image, title: "HEIC to JPG" },
    { href: "/word-to-jpg", icon: FileText, title: "Word to JPG" },
    { href: "/csv-to-excel", icon: FileSpreadsheet, title: "CSV to Excel" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-green-50 -z-10" />
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                PDF Conversion Tools
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Convert your files to and from PDF format with ease. Fast, secure, and free online file conversion.
              </p>
            </div>
          </div>
        </section>

        {/* Convert from PDF */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Convert from PDF</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
              {convertFromPDF.map((tool) => (
                <ToolCard
                  key={tool.href}
                  href={tool.href}
                  icon={tool.icon}
                  title={tool.title}
                  iconColor="bg-orange-100"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Convert to PDF */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Convert to PDF</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
              {convertToPDF.map((tool) => (
                <ToolCard
                  key={tool.href}
                  href={tool.href}
                  icon={tool.icon}
                  title={tool.title}
                  iconColor="bg-green-100"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Other Format Conversions */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Other Format Conversions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
              {otherFormats.map((tool) => (
                <ToolCard
                  key={tool.href}
                  href={tool.href}
                  icon={tool.icon}
                  title={tool.title}
                  iconColor="bg-blue-100"
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 gradient-orange">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Convert Your Files Now
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Fast, secure, and easy file conversion. No software installation required.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
