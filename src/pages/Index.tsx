
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import AccountsSummary from "@/components/dashboard/AccountsSummary";
import LoanSummary from "@/components/dashboard/LoanSummary";
import { BarChart3, CreditCard, DollarSign, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getStoreData } from "@/utils/localStorage";
import { Customer } from "@/pages/Customers";

interface Transaction {
  id: string;
  accountNumber: string;
  customerName: string;
  type: string;
  amount: number;
  description: string;
  status: string;
  date: string;
  time: string;
}

interface Loan {
  id: string;
  customerName: string;
  accountNumber: string;
  amount: number;
  type: string;
  interestRate: number;
  term: number;
  status: string;
  startDate: string;
  endDate: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      const storedCustomers = getStoreData<Customer>('customers');
      const storedTransactions = getStoreData<Transaction>('transactions');
      const storedLoans = getStoreData<Loan>('loans');
      const storedAccounts = getStoreData<any>('accounts');
      
      setCustomers(storedCustomers);
      setTransactions(storedTransactions);
      setLoans(storedLoans);
      setAccounts(storedAccounts);
    };
    
    loadData();
    
    // Listen for storage events to update data across tabs
    window.addEventListener('storage', loadData);
    
    return () => {
      window.removeEventListener('storage', loadData);
    };
  }, []);

  // Calculate stats
  const totalCustomers = customers.length;
  const totalAccounts = accounts.length || customers.length; // Fallback to customer count
  
  // Calculate total transactions amount for completed transactions
  const totalTransactionsAmount = transactions
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate active loans amount
  const activeLoansAmount = loans
    .filter(l => l.status === "active")
    .reduce((sum, l) => sum + l.amount, 0);

  // Create formatted display values
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

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
            <Button onClick={() => navigate('/transactions')}>New Transaction</Button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Customers" 
            value={totalCustomers > 0 ? totalCustomers.toString() : "0"} 
            icon={Users}
            change={totalCustomers > 0 ? { value: "New", positive: true } : undefined}
          />
          <StatCard 
            title="Total Accounts" 
            value={totalAccounts > 0 ? totalAccounts.toString() : "0"} 
            icon={Wallet}
            change={totalAccounts > 0 ? { value: "New", positive: true } : undefined}
          />
          <StatCard 
            title="Total Transactions" 
            value={totalTransactionsAmount > 0 ? formatCurrency(totalTransactionsAmount) : "$0"} 
            icon={CreditCard}
            change={transactions.length > 0 ? { value: `${transactions.length} tx`, positive: true } : undefined}
          />
          <StatCard 
            title="Active Loans" 
            value={activeLoansAmount > 0 ? formatCurrency(activeLoansAmount) : "$0"} 
            icon={DollarSign}
            change={loans.length > 0 ? { value: `${loans.length} loans`, positive: true } : undefined}
          />
        </div>
        
        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <AccountsSummary customersCount={customers.length} accounts={accounts} />
          </div>
          <div className="md:col-span-1">
            <RecentTransactions transactions={transactions} />
          </div>
          <div className="md:col-span-1">
            <LoanSummary />
          </div>
        </div>

        {/* Empty State */}
        {customers.length === 0 && transactions.length === 0 && loans.length === 0 && (
          <div className="bg-white rounded-lg border p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">No Data Available</h2>
            <p className="text-muted-foreground mb-6">
              Start by adding customers, transactions, or loans to see your dashboard come to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/customers')}>Add Customers</Button>
              <Button onClick={() => navigate('/transactions')} variant="outline">Create Transactions</Button>
              <Button onClick={() => navigate('/loans')} variant="outline">Manage Loans</Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
