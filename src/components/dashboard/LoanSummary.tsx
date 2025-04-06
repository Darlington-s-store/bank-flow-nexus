
import { BarChart3, Clock, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample loan data
const activeLoan = {
  id: "L1001",
  type: "Personal Loan",
  amount: 25000.00,
  amountPaid: 10000.00,
  interestRate: 8.5,
  term: 36, // months
  monthsRemaining: 26,
  nextPaymentAmount: 804.66,
  nextPaymentDate: "2025-05-01",
  status: "active"
};

const LoanSummary = () => {
  const percentagePaid = (activeLoan.amountPaid / activeLoan.amount) * 100;
  
  return (
    <div className="banking-card">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-medium">Active Loan</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/loans">View Details</Link>
        </Button>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">{activeLoan.type}</p>
              <p className="text-2xl font-bold">${activeLoan.amount.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm">Interest Rate</p>
              <p className="text-lg font-medium">{activeLoan.interestRate}%</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">Repayment Progress</p>
              <p className="font-medium">{percentagePaid.toFixed(0)}% Complete</p>
            </div>
            <Progress value={percentagePaid} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <p>${activeLoan.amountPaid.toFixed(2)} paid</p>
              <p>${(activeLoan.amount - activeLoan.amountPaid).toFixed(2)} remaining</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="flex flex-col gap-1 p-3 rounded-md bg-muted/50">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Next Payment</p>
              </div>
              <p className="font-medium">${activeLoan.nextPaymentAmount.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">Due {activeLoan.nextPaymentDate}</p>
            </div>
            
            <div className="flex flex-col gap-1 p-3 rounded-md bg-muted/50">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Term</p>
              </div>
              <p className="font-medium">{activeLoan.term} months</p>
              <p className="text-xs text-muted-foreground">{activeLoan.monthsRemaining} months remaining</p>
            </div>
            
            <div className="flex flex-col gap-1 p-3 rounded-md bg-muted/50">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Total Interest</p>
              </div>
              <p className="font-medium">
                ${((activeLoan.nextPaymentAmount * activeLoan.term) - activeLoan.amount).toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">Over {activeLoan.term} months</p>
            </div>
          </div>
          
          <div className="mt-2 flex gap-2">
            <Button className="flex-1" variant="default">Make Payment</Button>
            <Button className="flex-1" variant="outline">Payment History</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanSummary;
