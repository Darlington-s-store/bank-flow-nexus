
import { ArrowDownRight, ArrowUpRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CustomerTransactionsProps {
  customerId: string;
  transactions: any[];
}

const CustomerTransactions = ({ customerId, transactions }: CustomerTransactionsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter transactions based on search
  const filteredTransactions = transactions.filter(tx => 
    (tx.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.id?.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Show only the most recent transactions (up to 5)
  const recentTransactions = filteredTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative w-[180px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {recentTransactions.length > 0 ? (
          <div className="divide-y divide-border">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    (transaction.type === "credit" || transaction.type === "deposit" || transaction.type === "refund") 
                      ? "bg-green-500/10" 
                      : "bg-red-500/10"
                  )}>
                    {(transaction.type === "credit" || transaction.type === "deposit" || transaction.type === "refund") ? (
                      <ArrowDownRight className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.name || 
                      (transaction.type === "deposit" ? "Deposit" : 
                      transaction.type === "withdrawal" ? "Withdrawal" :
                      transaction.type === "transfer" ? "Transfer" :
                      transaction.type === "payment" ? "Payment" : 
                      transaction.type === "refund" ? "Refund" : 
                      "Transaction")}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-medium",
                    (transaction.type === "credit" || transaction.type === "deposit" || transaction.type === "refund") 
                      ? "text-green-500" 
                      : "text-red-500"
                  )}>
                    {(transaction.type === "credit" || transaction.type === "deposit" || transaction.type === "refund") ? "+" : "-"}
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.date} {transaction.time && `at ${transaction.time}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center border border-dashed rounded-lg">
            <p className="text-muted-foreground">No transactions found for this customer</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerTransactions;
