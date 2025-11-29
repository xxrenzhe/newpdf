import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText, Search } from "lucide-react";
import Link from "next/link";

export default function FormsPage() {
  const formCategories = [
    {
      category: "Tax Forms",
      forms: [
        { name: "W-7", description: "Application for IRS Individual Taxpayer ID" },
        { name: "W-9", description: "Request for Taxpayer ID and Certification" },
        { name: "1040", description: "U.S. Individual Income Tax Return" },
        { name: "1099", description: "Miscellaneous Income" },
      ],
    },
    {
      category: "Business Forms",
      forms: [
        { name: "Invoice Template", description: "Professional invoice for business" },
        { name: "Receipt Template", description: "Payment receipt form" },
        { name: "Contract Template", description: "Business contract agreement" },
        { name: "Quote Template", description: "Price quotation form" },
      ],
    },
    {
      category: "Legal Forms",
      forms: [
        { name: "Power of Attorney", description: "Legal authorization document" },
        { name: "Rental Agreement", description: "Property lease contract" },
        { name: "NDA", description: "Non-disclosure agreement" },
        { name: "Bill of Sale", description: "Transfer of ownership document" },
      ],
    },
    {
      category: "Real Estate",
      forms: [
        { name: "Purchase Agreement", description: "Property purchase contract" },
        { name: "Lease Agreement", description: "Property rental contract" },
        { name: "Disclosure Form", description: "Property disclosure statement" },
        { name: "Inspection Report", description: "Property inspection form" },
      ],
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
                Fillable PDF Forms
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Browse our extensive library of professional PDF forms. Fill, download, and sign instantly.
              </p>
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for forms..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Form Categories */}
        {formCategories.map((category, index) => (
          <section key={index} className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="container px-4">
              <h2 className="text-3xl font-bold mb-8">{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.forms.map((form, formIndex) => (
                  <Link key={formIndex} href={`/form/${form.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-primary hover:shadow-lg transition-all cursor-pointer h-full">
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-lg bg-orange-100 mr-3">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold">{form.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{form.description}</p>
                      <div className="mt-4">
                        <Badge variant="secondary" className="text-xs">Fillable</Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="py-16 gradient-orange">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Can't Find the Form You Need?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Contact our support team and we'll help you find or create the perfect form for your needs.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
