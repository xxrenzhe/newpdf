import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FileUpload from "@/components/shared/FileUpload";
import ToolCard from "@/components/shared/ToolCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Edit,
  Scissors,
  Merge,
  FileText,
  Lock,
  RotateCw,
  FilePlus,
  FileSignature,
  Eye,
  Trash2,
  Minimize,
  Grid3x3,
  ScanText,
  ImageIcon,
  BookOpen,
  Crop,
} from "lucide-react";

export default function Home() {
  const tools = [
    { href: "/edit-pdf", icon: Edit, title: "Edit PDF" },
    { href: "/annotate-pdf", icon: FileText, title: "Annotate PDF" },
    { href: "/sign-pdf", icon: FileSignature, title: "Sign PDF" },
    { href: "/fill-pdf", icon: Edit, title: "Fill Out PDF" },
    { href: "/compress-pdf", icon: Minimize, title: "Compress PDF" },
    { href: "/split-pdf", icon: Scissors, title: "Split PDF" },
    { href: "/merge-pdf", icon: Merge, title: "Merge PDF" },
    { href: "/extract-pdf-pages", icon: FileText, title: "Extract PDF Pages" },
    { href: "/delete-pdf-pages", icon: Trash2, title: "Delete PDF Pages" },
    { href: "/rotate-pdf", icon: RotateCw, title: "Rotate PDF" },
    { href: "/create-pdf", icon: FilePlus, title: "Create PDF" },
    { href: "/organize-pdf", icon: Grid3x3, title: "Organize PDF" },
    { href: "/password-protect-pdf", icon: Lock, title: "Password Protect PDF" },
    { href: "/pdf-ocr", icon: ScanText, title: "OCR PDF" },
    { href: "/image-to-text", icon: ImageIcon, title: "Image to Text" },
    { href: "/ai-book-summarizer", icon: BookOpen, title: "Book Summarizer" },
    { href: "/pdf-summarizer", icon: FileText, title: "PDF Summarizer" },
    { href: "/crop-pdf", icon: Crop, title: "Crop PDF" },
  ];

  const features = [
    {
      icon: Edit,
      title: "Simple text editing",
      description: "Need to fix a typo or update a form field? Just click and type. No conversions, no extra steps — edit text in PDFs with ease.",
    },
    {
      icon: Grid3x3,
      title: "All-in-one editing suite",
      description: "Highlight key info, add images, insert shapes, or leave notes. Everything you need to review, adjust, and polish your PDF.",
    },
    {
      icon: Eye,
      title: "Intuitive design",
      description: "You don't have to figure anything out — our interface is clear, and everything feels familiar from the start.",
    },
    {
      icon: FileText,
      title: "Flexible file conversion",
      description: "Easily switch between formats — like Word, PPTX, or JPG — without losing your layout, formatting, or structure.",
    },
    {
      icon: FileSignature,
      title: "Built-in eSignature",
      description: "Select from three simple e-signing options to authorize your documents — just a few seconds and you're done.",
    },
    {
      icon: FilePlus,
      title: "Fillable forms",
      description: "Browse a full range of professional forms — tax, military, financial, real estate — ready to fill, download, and store in your account.",
    },
  ];

  const faqs = [
    {
      question: "What is NewPDF?",
      answer: "NewPDF is a free online PDF editor that simplifies everyday document tasks. You can edit PDF content, add signatures, compress files, merge or split pages — all right in your browser. Our platform supports multiple formats and provides tools for annotations, form filling, and more.",
    },
    {
      question: "Is NewPDF safe to use?",
      answer: "Yes — your files and data security is our top priority. All files are encrypted during upload using secure SSL connections, and we protect files on our servers with industry-standard encryption.",
    },
    {
      question: "Is NewPDF free?",
      answer: "Yes! NewPDF offers a completely free online PDF editor with all essential features. You can edit, annotate, sign, and convert PDFs without any subscription or payment required.",
    },
    {
      question: "What file formats are supported?",
      answer: "NewPDF supports PDF files and can convert to/from various formats including Word (DOCX), Excel (XLSX), PowerPoint (PPTX), images (JPG, PNG), and more.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-6xl text-center space-y-8">
          <Badge variant="secondary" className="mb-4">
            Free Online PDF Tools
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Edit, Convert & Sign PDFs
            <br />
            <span className="text-primary">Fast and Free</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All-in-one PDF editor and converter. Edit text, add signatures, compress files, and more — completely free, no registration required.
          </p>
          <div className="max-w-3xl mx-auto">
            <FileUpload />
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            All PDF Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why Choose NewPDF?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Powerful PDF tools that are simple to use and completely free
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="space-y-3">
                <feature.icon className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-4xl font-bold">
            Ready to edit your PDF?
          </h2>
          <p className="text-xl opacity-90">
            Upload your file and start editing in seconds. No signup required.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="/edit-pdf">Get Started Free</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
