
import { useState } from "react";
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
import CreateLoanForm from "@/components/loans/CreateLoanForm";

// Initial empty loans array
const initialLoans: any[] = [];

const Loans = () => {
  const [loans, setLoans] = useState(initialLoans);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLoanCreated = (newLoan: any) => {
    setLoans([...loans, newLoan]);
  };

  const handleMakePayment = (loanId: string) => {
    // In a real app, this would open a payment form or process
    // For demo purposes, we'll just add 500 to the loan's amountPaid
    setLoans(loans.map(loan => {
      if (loan.id === loanId) {
        const newAmountPaid = Math.min(loan.amountPaid + 500, loan.amount);
        // If fully paid, update status
        const newStatus = newAmountPaid >= loan.amount ? "completed" : loan.status;
        return { ...loan, amountPaid: newAmountPaid, status: newStatus };
      }
      return loan;
    }));
  };

  const handleApproveLoan = (loanId: string) => {
    setLoans(loans.map(loan => {
      if (loan.id === loanId && loan.status === "pending") {
        return { ...loan, status: "active" };
      }
      return loan;
    }));
  };

  const filteredLoans = loans.filter(loan => 
    loan.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loan.accountNumber.includes(searchQuery) ||
    loan.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loan.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalLoanAmount = loans
    .filter(loan => loan.status === "active")
    .reduce((sum, loan) => sum + loan.amount, 0);
    
  const totalLoanPaid = loans
    .filter(loan => loan.status === "active")
    .reduce((sum, loan) => sum + loan.amountPaid, 0);
    
  const activeLoanCount = loans.filter(loan => loan.status === "active").length;
  const pendingLoanCount = loans.filter(loan => loan.status === "pending").length;

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Loans</h1>
            <p className="text-muted-foreground">Manage and track all loan accounts</p>
          </div>
          <Button className="gap-1" onClick={() => setCreateDialogOpen(true)}>
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
              <Progress value={totalLoanAmount ? (totalLoanPaid / totalLoanAmount) * 100 : 0} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {totalLoanAmount ? ((totalLoanPaid / totalLoanAmount) * 100).toFixed(1) : 0}% of total loan amount
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
                {pendingLoanCount}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="banking-card">
          <div className="p-4 border-b">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative sm:w-[300px] md:w-[400px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search loans..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                {filteredLoans.length > 0 ? (
                  filteredLoans.map((loan) => {
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
                              {loan.status === "pending" && (
                                <DropdownMenuItem 
                                  className="flex items-center gap-2"
                                  onClick={() => handleApproveLoan(loan.id)}
                                >
                                  <BanknoteIcon className="h-4 w-4" /> Approve Loan
                                </DropdownMenuItem>
                              )}
                              {loan.status === "active" && (
                                <DropdownMenuItem 
                                  className="flex items-center gap-2"
                                  onClick={() => handleMakePayment(loan.id)}
                                >
                                  <BanknoteIcon className="h-4 w-4" /> Make Payment
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4" /> Payment Schedule
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      {searchQuery ? (
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-lg font-medium">No loans found</p>
                          <p className="text-sm text-muted-foreground">
                            Try adjusting your search criteria
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-lg font-medium">No loans yet</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Create your first loan application to get started
                          </p>
                          <Button 
                            className="gap-1" 
                            onClick={() => setCreateDialogOpen(true)}
                          >
                            <PlusCircle className="h-4 w-4" />
                            New Loan Application
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {loans.length > 0 && (
            <div className="p-4 border-t flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <strong>{filteredLoans.length}</strong> of <strong>{loans.length}</strong> loans
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled={filteredLoans.length === loans.length}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CreateLoanForm 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onLoanCreated={handleLoanCreated}
      />
    </MainLayout>
  );
};

export default Loans;
