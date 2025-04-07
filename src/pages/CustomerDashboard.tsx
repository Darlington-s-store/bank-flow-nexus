
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import { ArrowLeft, CreditCard, DollarSign, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomBadge } from "@/components/ui/custom-badge";
import CustomerTransactions from "@/components/customers/CustomerTransactions";
import CustomerAccounts from "@/components/customers/CustomerAccounts";
import { getStoreData } from "@/utils/localStorage";
import { Customer } from "@/pages/Customers";
import { Account, getCustomerAccounts } from "@/utils/accountsData";

const CustomerDashboard = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  
  useEffect(() => {
    if (!customerId) {
      navigate("/customers");
      return;
    }
    
    // Fetch customer data
    const customers = getStoreData<Customer>('customers');
    const foundCustomer = customers.find(c => c.id === customerId);
    
    if (!foundCustomer) {
      navigate("/customers");
      return;
    }
    
    setCustomer(foundCustomer);
    
    // Fetch customer accounts
    const customerAccounts = getCustomerAccounts(customerId);
    setAccounts(customerAccounts);
    
    // Fetch customer transactions
    const allTransactions = getStoreData<any>('transactions');
    const customerTransactions = allTransactions.filter(t => 
      accounts.some(a => a.accountNumber === t.accountNumber) || 
      t.customerId === customerId
    );
    setTransactions(customerTransactions);
  }, [customerId, navigate, accounts.length]);
  
  if (!customer) {
    return null; // Loading or redirect will happen in useEffect
  }
  
  // Calculate stats
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const activeAccounts = accounts.filter(account => account.status === 'active').length;
  const recentTransactionsCount = transactions.length;
  
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/customers")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Customer Dashboard</h1>
            <p className="text-muted-foreground">Manage customer details and accounts</p>
          </div>
        </div>
        
        {/* Customer Profile Card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={customer.imageSrc} alt={customer.name} />
              <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                {customer.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CardTitle>{customer.name}</CardTitle>
                <CustomBadge variant={customer.status === "active" ? "success" : "secondary"}>
                  {customer.status}
                </CustomBadge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer ID</p>
                  <p>{customer.id}</p>
                </div>
              </div>
            </div>
            <div>
              <Button onClick={() => navigate(`/customers/edit/${customer.id}`)}>
                Edit Profile
              </Button>
            </div>
          </CardHeader>
        </Card>
        
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard 
            title="Total Balance" 
            value={`$${totalBalance.toFixed(2)}`}
            icon={DollarSign}
          />
          <StatCard 
            title="Active Accounts" 
            value={activeAccounts.toString()} 
            icon={Wallet}
          />
          <StatCard 
            title="Recent Transactions" 
            value={recentTransactionsCount.toString()} 
            icon={CreditCard}
          />
        </div>
        
        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2">
          <CustomerAccounts customerId={customerId} accounts={accounts} />
          <CustomerTransactions customerId={customerId} transactions={transactions} />
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomerDashboard;
