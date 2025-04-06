
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  BanknoteIcon, 
  CalendarIcon, 
  Eye, 
  Filter, 
  MoreVertical, 
  PlusCircle, 
  Search 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Sample loans data
const loans = [
  {
    id: "L1001",
    accountId: "A1001",
    accountNumber: "4523781900",
    customerName: "Jane Cooper",
    type: "Personal",
    amount: 25000.00,
    amountPaid: 10000.00,
    interestRate: 8.5,
    term: 36, // months
    monthsRemaining: 26,
    startDate: "2024-10-01",
    nextPaymentDate: "2025-05-01",
    nextPaymentAmount: 804.66,
    status: "active"
  },
  {
    id: "L1002",
    accountId: "A1002",
    accountNumber: "7891456200",
    customerName: "Robert Miller",
    type: "Home",
    amount: 250000.00,
    amountPaid: 50000.00,
    interestRate: 6.5,
    term: 240, // months
    monthsRemaining: 220,
    startDate: "2024-08-15",
    nextPaymentDate: "2025-05-15",
    nextPaymentAmount: 1776.33,
    status: "active"
  },
  {
    id: "L1003",
    accountId: "A1003",
    accountNumber: "3456912700",
    customerName: "Lisa Johnson",
    type: "Auto",
    amount: 35000.00,
    amountPaid: 5000.00,
    interestRate: 7.2,
    term: 60, // months
    monthsRemaining: 55,
    startDate: "2024-11-10",
    nextPaymentDate: "2025-05-10",
    nextPaymentAmount: 695.62,
    status: "active"
  },
  {
    id: "L1004",
    accountId: "A1004",
    accountNumber: "9087234500",
    customerName: "Michael Wilson",
    type: "Business",
    amount: 100000.00,
    amountPaid: 10000.00,
    interestRate: 9.0,
    term: 120, // months
    monthsRemaining: 110,
    startDate: "2024-09-20",
    nextPaymentDate: "2025-05-20",
    nextPaymentAmount: 1267.15,
    status: "active"
  },
  {
    id: "L1005",
    accountId: "A1005",
    accountNumber: "5678123400",
    customerName: "Sarah Davis",
    type: "Education",
    amount: 50000.00,
    amountPaid: 0.00,
    interestRate: 5.8,
    term: 84, // months
    monthsRemaining: 84,
    startDate: "2025-06-01",
    nextPaymentDate: "2025-07-01",
    nextPaymentAmount: 699.85,
    status: "pending"
  }
];

const Loans = () => {
  const totalLoanAmount = loans
    .filter(loan => loan.status === "active")
    .reduce((sum, loan) => sum + loan.amount, 0);
    
  const totalLoanPaid = loans
    .filter(loan => loan.status === "active")
    .reduce((sum, loan) => sum + loan.amountPaid, 0);
    
  const activeLoanCount = loans.filter(loan => loan.status === "active").length;

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Loans</h1>
            <p className="text-muted-foreground">Manage and track all loan accounts</p>
          </div>
          <Button className="gap-1">
            <PlusCircle className="h-4 w-4" />
            New Loan Application
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Active Loans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeLoanCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Loan Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalLoanAmount.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Repaid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalLoanPaid.toFixed(2)}</div>
              <Progress value={(totalLoanPaid / totalLoanAmount) * 100} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {((totalLoanPaid / totalLoanAmount) * 100).toFixed(1)}% of total loan amount
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loans.filter(loan => loan.status === "pending").length}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="banking-card">
          <div className="p-4 border-b">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative sm:w-[300px] md:w-[400px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search loans..." className="pl-8" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </div>
          
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Next Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.map((loan) => {
                  const percentagePaid = (loan.amountPaid / loan.amount) * 100;
                  
                  return (
                    <TableRow key={loan.id}>
                      <TableCell className="font-medium">{loan.id}</TableCell>
                      <TableCell>
                        <div>
                          <p>{loan.customerName}</p>
                          <p className="text-xs text-muted-foreground">
                            {loan.accountNumber}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{loan.type}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">${loan.amount.toFixed(2)}</div>
                          <div className="w-full mt-1">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span>{percentagePaid.toFixed(0)}% Paid</span>
                              <span>${loan.amountPaid.toFixed(2)}</span>
                            </div>
                            <Progress value={percentagePaid} className="h-1.5" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{loan.interestRate}%</TableCell>
                      <TableCell>
                        <div>
                          <p>{loan.term} months</p>
                          <p className="text-xs text-muted-foreground">
                            {loan.monthsRemaining} remaining
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">${loan.nextPaymentAmount.toFixed(2)}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{loan.nextPaymentDate}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            loan.status === "active" 
                              ? "default" 
                              : loan.status === "pending" 
                                ? "outline" 
                                : "secondary"
                          }
                        >
                          {loan.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Eye className="h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <BanknoteIcon className="h-4 w-4" /> Make Payment
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4" /> Payment Schedule
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <strong>5</strong> of <strong>5</strong> loans
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Loans;
