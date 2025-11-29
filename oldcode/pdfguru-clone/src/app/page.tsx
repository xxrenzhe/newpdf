import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import ToolCard from "@/components/ToolCard";
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
    { href: "/compress-pdf", icon: Minimize, title: "Compress PDF" },
    { href: "/split-pdf", icon: Scissors, title: "Split PDF" },
    { href: "/merge-pdf", icon: Merge, title: "Merge PDF" },
    { href: "/annotate-pdf", icon: FileText, title: "Annotate PDF" },
    { href: "/extract-pdf-pages", icon: FileText, title: "Extract PDF Pages" },
    { href: "/delete-pdf-pages", icon: Trash2, title: "Delete PDF Pages" },
    { href: "/fill-pdf", icon: Edit, title: "Fill Out PDF" },
    { href: "/rotate-pdf", icon: RotateCw, title: "Rotate PDF" },
    { href: "/create-pdf", icon: FilePlus, title: "Create PDF" },
    { href: "/organize-pdf", icon: Grid3x3, title: "Organize PDF" },
    { href: "/sign-pdf", icon: FileSignature, title: "Sign PDF" },
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
      question: "What is PDF Tools?",
      answer: "Our PDF editing tool is built to simplify everyday document tasks. You can change PDF content, sign documents, compress files, merge or split PDF pages — all right in your browser. Our platform also offers a file converter that supports formats like Word, Excel, JPG, PNG, DWG, and more, making it easy to switch between file types. You can also annotate, fill out forms, and even use optical character recognition (OCR) to work with scanned documents.",
    },
    {
      question: "Is PDF Tools safe to use?",
      answer: "Yes — keeping your files and data safe is a top priority for us. We follow GDPR rules, your files are encrypted during upload using secure SSL connections, and we protect files on our servers with extra encryption. We use AES encryption, a trusted security standard used by banks and governments around the world.",
    },
    {
      question: "Is PDF Tools available as a subscription or a one-time purchase?",
      answer: "Our PDF corrector is a subscription-based service, with both monthly and yearly plans to choose from. The monthly plan is easy on the budget, but the yearly plan gives you the best value if you're planning to stick around. If you're a new user, you can check out our platform for free before downloading your first file.",
    },
    {
      question: "How to edit PDF files using PDF Tools?",
      answer: "It's super easy to modify PDF files with us. Upload your PDF, use our advanced tools to update content — edit text, adjust fonts, highlight sections, add comments, insert shapes, and more. Click Done, choose your preferred file format, and hit Download.",
    },
    {
      question: "What are the basic features that come with PDF Tools?",
      answer: "PDF Tools gives you all the tools you need to handle documentation with ease: Edit PDF files, use ready-made PDF forms, use OCR to make scanned files searchable, extract text from images, summarize long PDFs using AI, sign PDF documents electronically, and more.",
    },
    {
      question: "What types of files does PDF Tools support?",
      answer: "Although PDF is our bread and butter, we also handle dozens of other formats for quick and efficient conversion. Need to flip Office files like DOCX, XLSX, or PPTX to PDF? Images like JPG, PNG, or SVG? Or even less common ones, like DWG, DXF, EPUB, or WebP? No problem—we handle it all.",
    },
    {
      question: "What should I do if I encounter problems or errors while using PDF Tools?",
      answer: "If you have trouble using PDF Tools or something doesn't work as expected, we're here to help. Our support team is available 24/7 — yes, even on weekends and holidays. E-mail: support@pdftools.com or Phone: +1 (866) 716-6045",
    },
    {
      question: "How to choose the best PDF editor?",
      answer: "Check out reviews on sites like Trustpilot, look into security measures, reach out to customer support to see how they respond, test the features like PDF converter, OCR, or eSignature, and trust your gut — if everything feels smooth and intuitive, you've found a winner.",
    },
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
                Online PDF Editor for All Your Needs
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Manage and perfect your documents with ease — anytime, anywhere.
              </p>
            </div>

            <FileUpload />

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4">
                By uploading file, you agree to our{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Terms of Use
                </a>{" "}
                and acknowledge our{" "}
                <a href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="ml-2 text-sm font-semibold">Great</span>
                </div>
                <span className="text-sm text-gray-600">38,698 reviews on</span>
                <span className="text-sm font-semibold text-primary">Trustpilot</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                15 million people, 180 countries, one simple tool
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-2xl bg-orange-100">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">27M</div>
                <div className="text-gray-600">uploads</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-2xl bg-green-100">
                    <Edit className="h-8 w-8 text-secondary" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">9M</div>
                <div className="text-gray-600">edited</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-2xl bg-orange-100">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">17M</div>
                <div className="text-gray-600">converted</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                More than PDF editing, much more
              </h2>
            </div>

            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <Badge variant="default" className="gradient-orange text-white cursor-pointer px-6 py-2">
                  Edit & Sign
                </Badge>
                <Badge variant="outline" className="cursor-pointer px-6 py-2">
                  Convert from PDF
                </Badge>
                <Badge variant="outline" className="cursor-pointer px-6 py-2">
                  Convert to PDF
                </Badge>
                <Badge variant="outline" className="cursor-pointer px-6 py-2">
                  Other formats
                </Badge>
                <Badge variant="outline" className="cursor-pointer px-6 py-2">
                  Forms
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
                {tools.map((tool) => (
                  <ToolCard
                    key={tool.href}
                    href={tool.href}
                    icon={tool.icon}
                    title={tool.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center border-2 border-dashed border-gray-300 rounded-3xl p-12">
              <h2 className="text-3xl font-bold mb-8">
                Trusted and certified by industry leaders
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
                <div className="text-6xl">🛡️</div>
                <div className="text-6xl">✓</div>
                <div className="text-6xl">🔒</div>
                <div className="text-6xl">🌐</div>
                <div className="text-6xl">📜</div>
                <div className="text-6xl">🏆</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What makes PDF Tools the best PDF editor?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl gradient-orange flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">PDF Tools in the media</h2>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 max-w-5xl mx-auto">
              <div className="text-2xl font-serif font-bold">The Washington Post</div>
              <div className="text-2xl font-serif font-bold">The Guardian</div>
              <div className="text-2xl font-bold">CNET</div>
              <div className="text-2xl font-bold">Legit</div>
              <div className="text-2xl font-bold">MSN</div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What users are saying about our online tool
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Easy to use",
                  content: "Easy to use, good service",
                  author: "Rebecca...",
                },
                {
                  title: "Good Service, Very good customer service!",
                  content: "I tried their service and was very happy with it...",
                  author: "mnb",
                },
                {
                  title: "Great experience, high quality service!",
                  content: "Thank you for the job done and for your amazing...",
                  author: "Edit B.K...",
                },
              ].map((testimonial, index) => (
                <div key={index} className="p-6 rounded-2xl border border-gray-200 bg-white">
                  <div className="flex mb-2">
                    <span className="text-green-500">★★★★★</span>
                    <span className="ml-2 text-xs text-gray-500">✓ Verified</span>
                  </div>
                  <h3 className="font-semibold mb-2">{testimonial.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{testimonial.content}</p>
                  <p className="text-xs text-gray-500">{testimonial.author}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 p-4 rounded-xl border border-gray-200">
                <span className="text-yellow-500">★★★★☆</span>
                <span className="font-semibold">Great</span>
                <span className="text-sm text-gray-600">Based on 38,698 reviews</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 gradient-orange">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
              <div className="text-white mb-6 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Edit PDF files in seconds with zero hassle
                </h2>
              </div>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Upload file
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Frequently asked questions
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-gray-200 rounded-2xl px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Related articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  tag: "Lifestyle",
                  title: "Are Your Files Safe with PDF Tools?",
                  date: "Aug 15, 2024",
                  views: "5391",
                  color: "bg-green-100",
                },
                {
                  tag: "How To",
                  title: "How to Sign a PDF Electronically: A Step-by-Step Guide",
                  date: "Jun 20, 2024",
                  views: "7219",
                  color: "bg-green-100",
                },
                {
                  tag: "How To",
                  title: "How to Edit Text in PDF Files",
                  date: "Apr 01, 2025",
                  views: "5387",
                  color: "bg-blue-100",
                },
              ].map((article, index) => (
                <div key={index} className="rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-shadow">
                  <div className={`h-48 ${article.color} flex items-center justify-center`}>
                    <FileText className="h-24 w-24 text-gray-400" />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3">{article.tag}</Badge>
                    <h3 className="font-semibold mb-3">{article.title}</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{article.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
