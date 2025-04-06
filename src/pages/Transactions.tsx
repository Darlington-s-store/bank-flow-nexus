
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
  ArrowDownRight, 
  ArrowUpRight, 
  CalendarIcon, 
  Download, 
  Eye, 
  Filter, 
  MoreVertical, 
  Search, 
  XCircle 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

// Sample transactions data
const transactions = [
  {
    id: "T1001",
    accountId: "A1001",
    accountNumber: "4523781900",
    customerName: "Jane Cooper",
    type: "deposit",
    description: "ATM Deposit",
    amount: 2500.00,
    date: "2025-04-05",
    time: "14:30:22",
    status: "completed",
    reference: "ATMDEPCSH2504"
  },
  {
    id: "T1002",
    accountId: "A1001",
    accountNumber: "4523781900",
    customerName: "Jane Cooper",
    type: "withdrawal",
    description: "ATM Withdrawal",
    amount: 500.00,
    date: "2025-04-04",
    time: "10:15:05",
    status: "completed",
    reference: "ATMWDR2504"
  },
  {
    id: "T1003",
    accountId: "A1001",
    accountNumber: "4523781900",
    customerName: "Jane Cooper",
    type: "transfer",
    description: "Transfer to 7891456200",
    amount: 1200.00,
    date: "2025-04-03",
    time: "18:45:30",
    status: "completed",
    reference: "TRFOUT2504"
  },
  {
    id: "T1004",
    accountId: "A1002",
    accountNumber: "7891456200",
    customerName: "Robert Miller",
    type: "loan_payment",
    description: "Loan EMI",
    amount: 850.00,
    date: "2025-04-01",
    time: "09:30:00",
    status: "completed",
    reference: "LOANPAY2504"
  },
  {
    id: "T1005",
    accountId: "A1003",
    accountNumber: "3456912700",
    customerName: "Lisa Johnson",
    type: "salary",
    description: "Salary Credit",
    amount: 5000.00,
    date: "2025-03-31",
    time: "12:00:15",
    status: "completed",
    reference: "SALCR2503"
  },
  {
    id: "T1006",
    accountId: "A1004",
    accountNumber: "9087234500",
    customerName: "Michael Wilson",
    type: "transfer",
    description: "Transfer to 5678123400",
    amount: 2000.00,
    date: "2025-03-28",
    time: "15:22:45",
    status: "failed",
    reference: "TRFOUT2503"
  }
];

const Transactions = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const totalInflow = transactions
    .filter(t => t.status === "completed" && ["deposit", "salary"].includes(t.type))
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalOutflow = transactions
    .filter(t => t.status === "completed" && ["withdrawal", "transfer", "loan_payment"].includes(t.type))
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground">Monitor and manage all financial transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Download Report</Button>
            <Button>New Transaction</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">250</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Inflow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-banking-success">
                +${totalInflow.toFixed(2)}
              </div>
              <div className="flex items-center mt-1">
                <ArrowDownRight className="h-4 w-4 text-banking-success mr-1" />
                <p className="text-xs text-banking-success">14.5% increase from last month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Outflow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-banking-danger">
                -${totalOutflow.toFixed(2)}
              </div>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-banking-danger mr-1" />
                <p className="text-xs text-banking-danger">8.2% increase from last month</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="banking-card">
          <div className="p-4 border-b">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative sm:w-[300px] md:w-[400px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search transactions..." className="pl-8" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {date ? format(date, "PPP") : "Select Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>
          
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <div>
                        <p>{transaction.accountNumber}</p>
                        <p className="text-xs text-muted-foreground">{transaction.customerName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          transaction.type === "deposit" || transaction.type === "salary"
                            ? "bg-banking-success"
                            : transaction.type === "withdrawal" || transaction.type === "transfer" || transaction.type === "loan_payment"
                              ? "bg-banking-danger"
                              : "bg-banking-info"
                        )} />
                        <span className="capitalize">
                          {transaction.type.replace("_", " ")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "font-medium",
                        transaction.type === "deposit" || transaction.type === "salary"
                          ? "text-banking-success"
                          : "text-banking-danger"
                      )}>
                        {transaction.type === "deposit" || transaction.type === "salary" ? "+" : "-"}
                        ${transaction.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{transaction.date}</p>
                        <p className="text-xs text-muted-foreground">{transaction.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          transaction.status === "completed" 
                            ? "default" 
                            : transaction.status === "pending" 
                              ? "outline" 
                              : "destructive"
                        }
                      >
                        {transaction.status}
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
                            <Download className="h-4 w-4" /> Download Receipt
                          </DropdownMenuItem>
                          {transaction.status !== "completed" && (
                            <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                              <XCircle className="h-4 w-4" /> Cancel Transaction
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <strong>6</strong> of <strong>250</strong> transactions
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Transactions;
