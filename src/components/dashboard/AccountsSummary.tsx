
import { ArrowRight, Wallet } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample accounts data
const accounts = [
  {
    id: "A1001",
    type: "Savings",
    accountNumber: "**** 4523",
    balance: 12500.45,
    currency: "USD",
    status: "active"
  },
  {
    id: "A1002",
    type: "Current",
    accountNumber: "**** 7891",
    balance: 8250.20,
    currency: "USD",
    status: "active"
  },
  {
    id: "A1003",
    type: "Fixed Deposit",
    accountNumber: "**** 3456",
    balance: 25000.00,
    currency: "USD",
    status: "active"
  }
];

const AccountsSummary = () => {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  
  return (
    <div className="banking-card">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-medium">Your Accounts</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/accounts">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <div key={account.id} className="border rounded-lg p-4 hover:border-primary/40 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-muted-foreground">{account.type}</p>
                    <p className="font-medium">{account.accountNumber}</p>
                  </div>
                  <Badge variant={account.status === "active" ? "success" : "destructive"}>
                    {account.status}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">${account.balance.toFixed(2)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Available balance</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Total Balance</h3>
              <p className="font-bold">${totalBalance.toFixed(2)}</p>
            </div>
            <div className="space-y-2">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground w-24">{account.type}</p>
                  <Progress 
                    value={(account.balance / totalBalance) * 100} 
                    className="h-2 flex-1" 
                  />
                  <p className="text-sm w-16 text-right">
                    {((account.balance / totalBalance) * 100).toFixed(0)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsSummary;
