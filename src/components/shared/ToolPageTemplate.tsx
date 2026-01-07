import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FileUpload from "@/components/shared/FileUpload";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, Clock } from "lucide-react";
import Link from "next/link";

interface ToolPageTemplateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
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
  comingSoon = false,
  features = [],
  howToSteps = [],
}: ToolPageTemplateProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5 -z-10" />
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              {Icon && (
                <div className="flex justify-center mb-6">
                  <div className="p-6 rounded-3xl bg-primary text-primary-foreground">
                    <Icon className="h-16 w-16" />
                  </div>
                </div>
              )}
              {comingSoon && (
                <Badge variant="secondary" className="mb-4">
                  <Clock className="h-3 w-3 mr-1" />
                  Coming Soon
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">{description}</p>
            </div>

            {comingSoon ? (
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <div className="p-8 bg-muted/50 rounded-2xl">
                  <h3 className="text-2xl font-semibold mb-4">
                    This tool is under development
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We&apos;re working hard to bring you this feature. In the meantime, check out our other powerful PDF tools.
                  </p>
                  <Button asChild>
                    <Link href="/">Browse All Tools</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <FileUpload />
            )}
          </div>
        </section>

        {/* Features Section */}
        {!comingSoon && features.length > 0 && (
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
        {!comingSoon && howToSteps.length > 0 && (
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
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
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
        {!comingSoon && (
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to get started?
                </h2>
                <p className="text-primary-foreground/90 text-lg mb-8">
                  Upload your file now and experience fast, secure PDF processing
                </p>
                <Button size="lg" variant="secondary">
                  Upload File
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
