import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolPageTemplateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features?: Array<{
    title: string;
    description: string;
  }>;
  howToSteps?: Array<{
    step: number;
    title: string;
    description: string;
  }>;
}

export default function ToolPageTemplate({
  title,
  description,
  icon: Icon,
  features = [],
  howToSteps = [],
}: ToolPageTemplateProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-green-50 -z-10" />
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-6 rounded-3xl gradient-orange">
                  <Icon className="h-16 w-16 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {title}
              </h1>
              <p className="text-xl text-gray-600 mb-8">{description}</p>
            </div>

            <FileUpload />
          </div>
        </section>

        {/* Features Section */}
        {features.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <h3 className="font-semibold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How to Section */}
        {howToSteps.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                  How to Use
                </h2>
                <div className="space-y-6">
                  {howToSteps.map((step) => (
                    <div
                      key={step.step}
                      className="flex items-start space-x-4 p-6 bg-white rounded-2xl"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-orange flex items-center justify-center text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 gradient-orange">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to get started?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Upload your file now and experience fast, secure PDF processing
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Upload File
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
