import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BanknoteIcon, BarChart3, CheckCircle, LockIcon, Mail, MessageCircle, Phone, Shield, Users } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Landing = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BanknoteIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BankFlow</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">Benefits</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
          <div>
            <Button asChild>
              <Link to="/login">Admin Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tighter md:leading-tight max-w-3xl">
            Complete Banking Management Solution for Modern Banks
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Streamline your banking operations with our comprehensive management system. 
            Handle customers, accounts, loans, and transactions with ease.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="animate-fade-in">
              <Link to="/login">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover-scale">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Management</h3>
              <p className="text-muted-foreground">
                Efficiently manage customer profiles, accounts, and KYC compliance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover-scale">
              <BanknoteIcon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Transaction Processing</h3>
              <p className="text-muted-foreground">
                Handle deposits, withdrawals, and transfers with real-time updates.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover-scale">
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Loan Management</h3>
              <p className="text-muted-foreground">
                Process loan applications, manage repayments, and monitor loan status.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover-scale">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure System</h3>
              <p className="text-muted-foreground">
                Industry-standard security protocols to protect sensitive data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Increased Efficiency</h3>
              <p className="text-muted-foreground">
                Automate routine tasks and reduce manual processing time by up to 70%.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Better Customer Experience</h3>
              <p className="text-muted-foreground">
                Provide faster service and transparent communication to customers.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <LockIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
              <p className="text-muted-foreground">
                Protect customer data and transactions with advanced security measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <div className="mb-4">
                      <MessageCircle className="h-10 w-10 text-primary mx-auto" />
                    </div>
                    <p className="text-lg italic mb-6">"BankFlow has transformed our operations. We've seen a 40% reduction in processing time and improved customer satisfaction scores."</p>
                    <div>
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-muted-foreground">Operations Director, First City Bank</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <div className="mb-4">
                      <MessageCircle className="h-10 w-10 text-primary mx-auto" />
                    </div>
                    <p className="text-lg italic mb-6">"The security features of BankFlow have given us peace of mind. The customer management system is intuitive and powerful."</p>
                    <div>
                      <h4 className="font-semibold">Michael Chen</h4>
                      <p className="text-muted-foreground">CTO, Pacific Trust</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <div className="mb-4">
                      <MessageCircle className="h-10 w-10 text-primary mx-auto" />
                    </div>
                    <p className="text-lg italic mb-6">"Implementation was smooth, and the support team has been exceptional. BankFlow has exceeded our expectations in every way."</p>
                    <div>
                      <h4 className="font-semibold">Emily Rodriguez</h4>
                      <p className="text-muted-foreground">Branch Manager, Community Credit Union</p>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="flex justify-center mt-6">
                <CarouselPrevious className="relative static translate-y-0 -left-0" />
                <CarouselNext className="relative static translate-y-0 -right-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Flexible Pricing Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Basic</h3>
                  <div className="text-3xl font-bold mb-2">$499<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                  <p className="text-muted-foreground">Perfect for small banks and credit unions</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Core banking features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Up to 5,000 customers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Basic reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Email support</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button className="w-full">Get Started</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary shadow-md hover-scale">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="absolute -top-4 right-0 left-0 mx-auto w-fit bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">Popular</div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Professional</h3>
                  <div className="text-3xl font-bold mb-2">$999<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                  <p className="text-muted-foreground">Ideal for medium-sized banking institutions</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>All Basic features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Up to 20,000 customers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Advanced reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>API access</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button className="w-full">Get Started</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold mb-2">Custom</div>
                  <p className="text-muted-foreground">For large banking corporations</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>All Professional features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Unlimited customers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Dedicated support team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>SLA guarantees</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Bank-Grade Security</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Security Features</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>End-to-end data encryption for all transactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Role-based access control with secure authentication</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Automated security audits and compliance checks</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Real-time fraud detection and prevention systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long does implementation take?</AccordionTrigger>
                <AccordionContent>
                  Our streamlined implementation process typically takes 2-4 weeks, depending on your banking infrastructure and specific requirements. Our dedicated team will guide you through every step of the process to ensure a smooth transition.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is BankFlow compliant with banking regulations?</AccordionTrigger>
                <AccordionContent>
                  Yes, BankFlow is designed to be compliant with major banking regulations and standards including PCI DSS, GDPR, and regional banking regulations. We regularly update our system to ensure ongoing compliance with evolving regulatory requirements.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can BankFlow integrate with our existing systems?</AccordionTrigger>
                <AccordionContent>
                  BankFlow offers robust API capabilities and pre-built connectors for common banking systems. Our integration specialists can work with your IT team to ensure seamless integration with your existing core banking systems, CRM, and other financial tools.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What kind of support do you provide?</AccordionTrigger>
                <AccordionContent>
                  All plans include comprehensive support. Basic plans receive email support with 24-hour response times, Professional plans have priority support with faster response times, and Enterprise customers enjoy dedicated support teams with 24/7 availability and custom SLAs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How secure is BankFlow?</AccordionTrigger>
                <AccordionContent>
                  Security is our top priority. BankFlow employs end-to-end encryption, multi-factor authentication, regular security audits, and follows banking industry best practices for data protection. Our systems are hosted in SOC 2 compliant data centers with redundancy and disaster recovery capabilities.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-8">
                Have questions about how BankFlow can help your institution? Our team is ready to assist you with any inquiries.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">info@bankflow.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BanknoteIcon className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Headquarters</h4>
                    <p className="text-muted-foreground">123 Finance Street, Banking District<br />New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your banking operations?</h2>
            <p className="text-muted-foreground mb-8">
              Join leading banks that have improved efficiency and customer satisfaction with BankFlow.
            </p>
            <Button size="lg" asChild>
              <Link to="/login">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BanknoteIcon className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">BankFlow</span>
              </div>
              <p className="text-muted-foreground">
                Complete banking management solution for modern financial institutions.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">Benefits</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Compliance</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t">
            <p className="text-muted-foreground text-center">
              © {new Date().getFullYear()} BankFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
