
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import AccountsSummary from "@/components/dashboard/AccountsSummary";
import LoanSummary from "@/components/dashboard/LoanSummary";
import { BarChart3, CreditCard, DollarSign, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Admin User!</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Download Report</Button>
            <Button>New Transaction</Button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Customers" 
            value="1,284" 
            icon={Users}
            change={{ value: "12%", positive: true }}
          />
          <StatCard 
            title="Total Accounts" 
            value="3,567" 
            icon={Wallet}
            change={{ value: "8%", positive: true }}
          />
          <StatCard 
            title="Total Transactions" 
            value="$428,651" 
            icon={CreditCard}
            change={{ value: "24%", positive: true }}
          />
          <StatCard 
            title="Active Loans" 
            value="$1.2M" 
            icon={DollarSign}
            change={{ value: "5%", positive: true }}
          />
        </div>
        
        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <AccountsSummary />
          </div>
          <div className="md:col-span-1">
            <RecentTransactions />
          </div>
          <div className="md:col-span-1">
            <LoanSummary />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
