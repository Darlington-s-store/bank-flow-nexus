
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BadgeCheck, 
  CreditCard, 
  DollarSign, 
  Lock, 
  BarChart3, 
  Shield, 
  Users, 
  Wallet,
  Phone,
  ArrowDown
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Features section data
const features = [
  {
    icon: Users,
    title: "Customer Management",
    description: "Comprehensive tools to manage customer information, accounts, and relationships."
  },
  {
    icon: CreditCard,
    title: "Transaction Processing",
    description: "Secure and efficient transaction processing with real-time updates."
  },
  {
    icon: DollarSign,
    title: "Loan Management",
    description: "Complete loan lifecycle management from application to repayment."
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Detailed analytics and customizable reports for data-driven decisions."
  },
  {
    icon: Shield,
    title: "Compliance & Security",
    description: "Built-in compliance features and robust security measures."
  },
  {
    icon: Wallet,
    title: "Account Services",
    description: "Full-featured account management with multiple account types."
  }
];

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CFO, First National Bank",
    content: "This banking platform has revolutionized our operations. The dashboard provides real-time insights that have helped us make better decisions faster.",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    name: "Michael Chen",
    position: "CTO, Pacific Credit Union",
    content: "The security features are top-notch. Our compliance team is impressed with how easily we can generate reports and ensure we're meeting all requirements.",
    avatar: "https://i.pravatar.cc/150?img=53"
  },
  {
    name: "Emily Rodriguez",
    position: "Operations Manager, Metro Financial",
    content: "Customer management has never been easier. We've seen a 40% increase in efficiency since implementing this platform.",
    avatar: "https://i.pravatar.cc/150?img=45"
  },
  {
    name: "David Wilson",
    position: "Branch Manager, Community Trust",
    content: "The loan management system is intuitive and powerful. We've been able to process applications much faster while maintaining compliance.",
    avatar: "https://i.pravatar.cc/150?img=12"
  }
];

// FAQ data
const faqItems = [
  {
    question: "How secure is the banking platform?",
    answer: "Our platform employs bank-grade security measures including 256-bit encryption, multi-factor authentication, and regular security audits. All data is encrypted both in transit and at rest to ensure maximum protection."
  },
  {
    question: "Can the system be customized for our specific needs?",
    answer: "Yes, the platform is highly customizable. From branding elements to workflow processes, you can tailor the system to match your institution's specific requirements and operational procedures."
  },
  {
    question: "How does the customer management system work?",
    answer: "The customer management system provides a 360-degree view of each customer, tracking all interactions, accounts, and transactions. You can manage customer information, view relationship history, and analyze customer behavior all from a single interface."
  },
  {
    question: "What types of reports are available?",
    answer: "The platform includes a comprehensive reporting engine with dozens of pre-built reports covering transactions, customer activity, loan performance, compliance, and more. You can also create custom reports to meet your specific analysis needs."
  },
  {
    question: "How is customer data backed up?",
    answer: "Customer data is automatically backed up hourly to redundant, geographically distributed servers. We maintain 30 days of rolling backups, ensuring your data is always safe and recoverable in case of any issues."
  }
];

// Pricing plans
const pricingPlans = [
  {
    name: "Starter",
    price: "$299",
    period: "per month",
    description: "Perfect for small institutions",
    features: [
      "Up to 5,000 customers",
      "Basic reporting",
      "Standard customer support",
      "Core banking features",
      "Email support"
    ],
    highlighted: false,
    buttonText: "Get Started"
  },
  {
    name: "Professional",
    price: "$799",
    period: "per month",
    description: "Ideal for growing institutions",
    features: [
      "Up to 25,000 customers",
      "Advanced analytics",
      "Priority customer support",
      "Loan management",
      "Compliance reporting",
      "Phone & email support"
    ],
    highlighted: true,
    buttonText: "Most Popular"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large-scale operations",
    features: [
      "Unlimited customers",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced security features",
      "Custom reporting",
      "24/7 premium support"
    ],
    highlighted: false,
    buttonText: "Contact Sales"
  }
];

const Landing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", company: "", message: "" });
    // Show success message (in a real app, you'd use a toast notification)
    alert("Thank you for your message. We'll be in touch soon!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BankingAdmin</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary">Features</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary">Testimonials</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary">Pricing</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary">FAQ</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary">Contact</a>
          </nav>
          <div>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Modern Banking Administration Platform
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Streamline your banking operations with our comprehensive admin dashboard. Manage customers, transactions, and accounts with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => navigate('/login')}>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#demo">See Demo</a>
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${20 + i}`} 
                      alt="User avatar" 
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">500+</span> financial institutions trust us
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://placehold.co/600x400/e9ecef/343a40?text=Banking+Dashboard" 
                alt="Banking Dashboard" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="flex justify-center -mt-10 pb-6 hidden md:block">
        <a href="#features" className="animate-bounce bg-white p-2 rounded-full shadow-lg">
          <ArrowDown className="h-5 w-5 text-primary" />
        </a>
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your banking operations efficiently
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by financial institutions worldwide
            </p>
          </div>
          
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex-1">
                        <p className="text-lg mb-6 italic text-muted-foreground">
                          "{testimonial.content}"
                        </p>
                      </div>
                      <div className="flex items-center mt-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Flexible Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your institution's needs
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`transition-all ${
                  plan.highlighted 
                    ? 'border-primary shadow-lg relative overflow-hidden' 
                    : 'hover:shadow-md'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-5 right-5">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <BadgeCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our banking platform
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-6">
                  Have questions about our banking platform? Fill out the form and our team will get back to you shortly.
                </p>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Call us</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email us</h4>
                    <p className="text-muted-foreground">info@bankingadmin.com</p>
                  </div>
                </div>
              </div>
              
              <div>
                <Card>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Name</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="company">Company</Label>
                          <Input 
                            id="company" 
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea 
                            id="message" 
                            name="message" 
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Send Message
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lock className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">BankingAdmin</span>
              </div>
              <p className="text-gray-400 mb-4">
                Modern banking administration platform for financial institutions of all sizes.
              </p>
            </div>
            
            <div>
              <h4 className="text-white text-lg font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Testimonials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-lg font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-lg font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 BankingAdmin. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                {/* Icon would go here */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                {/* Icon would go here */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                {/* Icon would go here */}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
