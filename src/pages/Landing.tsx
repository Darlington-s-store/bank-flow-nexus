
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BanknoteIcon, BarChart3, LockIcon, Shield, Users } from "lucide-react";

const Landing = () => {
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
            <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">Security</a>
          </nav>
          <div>
            <Button asChild>
              <Link to="/login">Admin Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tighter md:leading-tight max-w-3xl">
            Complete Banking Management Solution for Modern Banks
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Streamline your banking operations with our comprehensive management system. 
            Handle customers, accounts, loans, and transactions with ease.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/login">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
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
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Management</h3>
              <p className="text-muted-foreground">
                Efficiently manage customer profiles, accounts, and KYC compliance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <BanknoteIcon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Transaction Processing</h3>
              <p className="text-muted-foreground">
                Handle deposits, withdrawals, and transfers with real-time updates.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Loan Management</h3>
              <p className="text-muted-foreground">
                Process loan applications, manage repayments, and monitor loan status.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BanknoteIcon className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">BankFlow</span>
            </div>
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} BankFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
