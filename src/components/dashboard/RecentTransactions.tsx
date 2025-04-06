
import { ArrowDownRight, ArrowUpRight, CreditCard, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Sample transaction data
const transactions = [
  {
    id: "T1001",
    name: "Deposit",
    description: "ATM Deposit",
    amount: 2500.00,
    type: "credit",
    date: "2025-04-05",
    status: "completed"
  },
  {
    id: "T1002",
    name: "Withdrawal",
    description: "ATM Withdrawal",
    amount: 500.00,
    type: "debit",
    date: "2025-04-04",
    status: "completed"
  },
  {
    id: "T1003",
    name: "Fund Transfer",
    description: "To John Smith",
    amount: 1200.00,
    type: "debit",
    date: "2025-04-03",
    status: "completed"
  },
  {
    id: "T1004",
    name: "Loan Payment",
    description: "Monthly EMI",
    amount: 850.00,
    type: "debit",
    date: "2025-04-01",
    status: "completed"
  },
  {
    id: "T1005",
    name: "Salary Credit",
    description: "From ABC Corp",
    amount: 5000.00,
    type: "credit",
    date: "2025-03-31",
    status: "completed"
  }
];

const RecentTransactions = () => {
  return (
    <div className="banking-card">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-medium">Recent Transactions</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-[180px] md:w-[220px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search transactions..." className="pl-8" />
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="banking-transaction-item">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                transaction.type === "credit" ? "bg-banking-success/10" : "bg-banking-danger/10"
              )}>
                {transaction.type === "credit" ? (
                  <ArrowDownRight className="h-5 w-5 text-banking-success" />
                ) : (
                  <ArrowUpRight className="h-5 w-5 text-banking-danger" />
                )}
              </div>
              <div>
                <p className="font-medium">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">{transaction.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn(
                "font-medium",
                transaction.type === "credit" ? "text-banking-success" : "text-banking-danger"
              )}>
                {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
