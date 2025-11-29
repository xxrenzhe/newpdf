import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import Link from "next/link";

export default function FormTemplatesPage() {
  const templates = [
    {
      category: "Business Templates",
      items: [
        { name: "Invoice Template", downloads: "15.2K", type: "Business" },
        { name: "Receipt Template", downloads: "12.8K", type: "Business" },
        { name: "Purchase Order", downloads: "9.5K", type: "Business" },
        { name: "Quotation Template", downloads: "8.3K", type: "Business" },
        { name: "Business Plan", downloads: "7.1K", type: "Business" },
        { name: "Meeting Minutes", downloads: "6.9K", type: "Business" },
      ],
    },
    {
      category: "Legal Templates",
      items: [
        { name: "Contract Template", downloads: "11.4K", type: "Legal" },
        { name: "NDA Template", downloads: "10.2K", type: "Legal" },
        { name: "Letter of Intent", downloads: "8.7K", type: "Legal" },
        { name: "Power of Attorney", downloads: "7.5K", type: "Legal" },
        { name: "Affidavit Template", downloads: "6.3K", type: "Legal" },
        { name: "Agreement Template", downloads: "5.8K", type: "Legal" },
      ],
    },
    {
      category: "HR Templates",
      items: [
        { name: "Employee Contract", downloads: "9.8K", type: "HR" },
        { name: "Job Application", downloads: "8.6K", type: "HR" },
        { name: "Performance Review", downloads: "7.4K", type: "HR" },
        { name: "Leave Request", downloads: "6.2K", type: "HR" },
        { name: "Termination Letter", downloads: "5.1K", type: "HR" },
        { name: "Offer Letter", downloads: "4.9K", type: "HR" },
      ],
    },
    {
      category: "Personal Templates",
      items: [
        { name: "Resume Template", downloads: "18.5K", type: "Personal" },
        { name: "Cover Letter", downloads: "14.3K", type: "Personal" },
        { name: "Budget Planner", downloads: "11.7K", type: "Personal" },
        { name: "To-Do List", downloads: "10.5K", type: "Personal" },
        { name: "Meal Planner", downloads: "8.9K", type: "Personal" },
        { name: "Workout Log", downloads: "7.6K", type: "Personal" },
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
                PDF Form Templates
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Download professional, ready-to-use PDF templates for business, legal, HR, and personal needs.
              </p>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        {templates.map((section, index) => (
          <section key={index} className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="container px-4">
              <h2 className="text-3xl font-bold mb-8">{section.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((template, templateIndex) => (
                  <Link key={templateIndex} href={`/template/${template.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-primary hover:shadow-lg transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="p-3 rounded-xl bg-orange-100 mr-3">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{template.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Download className="h-3 w-3 mr-1" />
                              <span>{template.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">{template.type}</Badge>
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
                Need a Custom Template?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Can't find what you're looking for? Contact us and we'll create a custom template for your specific needs.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
