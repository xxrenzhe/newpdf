import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import FileUpload from "@/components/FileUpload";
import {
  Edit,
  Minimize,
  Scissors,
  Merge,
  FileText,
  Trash2,
  RotateCw,
  FilePlus,
  Grid3x3,
  FileSignature,
  Lock,
  ScanText,
  ImageIcon,
  Crop
} from "lucide-react";

export default function EditAndSignPage() {
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
    { href: "/crop-pdf", icon: Crop, title: "Crop PDF" },
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
                Edit & Sign PDF Documents
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                All-in-one PDF editing and signing solution. Edit text, add images, sign documents, and more.
              </p>
            </div>

            <FileUpload />
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Complete PDF Editing Suite
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
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
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Why Choose Our PDF Editor?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="inline-flex p-4 rounded-2xl gradient-orange mb-4">
                    <Edit className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Easy Editing</h3>
                  <p className="text-gray-600">
                    Click and type to edit text, add images, shapes, and more with our intuitive interface.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="inline-flex p-4 rounded-2xl gradient-green mb-4">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
                  <p className="text-gray-600">
                    Your files are encrypted and automatically deleted after processing. We take your privacy seriously.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="inline-flex p-4 rounded-2xl gradient-orange mb-4">
                    <FileSignature className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">E-Signature</h3>
                  <p className="text-gray-600">
                    Sign documents electronically with legally binding e-signatures in just a few clicks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
