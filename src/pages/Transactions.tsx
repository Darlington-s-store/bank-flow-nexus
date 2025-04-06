
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
  ArrowDownRight, 
  ArrowUpRight, 
  CalendarIcon, 
  Download, 
  Eye, 
  Filter, 
  MoreVertical, 
  Plus,
  Search, 
  XCircle 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import CreateTransactionForm from "@/components/transactions/CreateTransactionForm";

// Initial empty transactions array
const initialTransactions: any[] = [];

const Transactions = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTransactionCreated = (newTransaction: any) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleCancelTransaction = (transactionId: string) => {
    setTransactions(transactions.map(transaction => {
      if (transaction.id === transactionId) {
        return { ...transaction, status: "cancelled" };
      }
      return transaction;
    }));
  };

  // Filter transactions based on search query and selected date
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.accountNumber.includes(searchQuery) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = date ? transaction.date === date.toISOString().split('T')[0] : true;
    
    return matchesSearch && matchesDate;
  });

  const totalInflow = transactions
    .filter(t => t.status === "completed" && ["deposit", "refund"].includes(t.type))
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalOutflow = transactions
    .filter(t => t.status === "completed" && ["withdrawal", "transfer", "payment"].includes(t.type))
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
            <Button className="gap-1" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              New Transaction
            </Button>
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
              <div className="text-2xl font-bold">{transactions.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Inflow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                +${totalInflow.toFixed(2)}
              </div>
              {totalInflow > 0 && (
                <div className="flex items-center mt-1">
                  <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                  <p className="text-xs text-green-500">Positive cash flow</p>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Outflow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                -${totalOutflow.toFixed(2)}
              </div>
              {totalOutflow > 0 && (
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
                  <p className="text-xs text-red-500">Outgoing payments</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="banking-card">
          <div className="p-4 border-b">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative sm:w-[300px] md:w-[400px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                    {date && (
                      <div className="border-t p-3 flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setDate(undefined)}
                        >
                          Clear
                        </Button>
                      </div>
                    )}
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
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
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
                            transaction.type === "deposit" || transaction.type === "refund"
                              ? "bg-green-500"
                              : transaction.type === "withdrawal" || transaction.type === "transfer" || transaction.type === "payment"
                                ? "bg-red-500"
                                : "bg-blue-500"
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
                          transaction.type === "deposit" || transaction.type === "refund"
                            ? "text-green-500"
                            : "text-red-500"
                        )}>
                          {transaction.type === "deposit" || transaction.type === "refund" ? "+" : "-"}
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
                            {transaction.status === "pending" && (
                              <DropdownMenuItem 
                                className="flex items-center gap-2 text-destructive"
                                onClick={() => handleCancelTransaction(transaction.id)}
                              >
                                <XCircle className="h-4 w-4" /> Cancel Transaction
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      {searchQuery || date ? (
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-lg font-medium">No transactions found</p>
                          <p className="text-sm text-muted-foreground">
                            Try adjusting your search or date filters
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-lg font-medium">No transactions yet</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Create your first transaction to get started
                          </p>
                          <Button 
                            className="gap-1" 
                            onClick={() => setCreateDialogOpen(true)}
                          >
                            <Plus className="h-4 w-4" />
                            New Transaction
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {transactions.length > 0 && (
            <div className="p-4 border-t flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <strong>{filteredTransactions.length}</strong> of <strong>{transactions.length}</strong> transactions
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled={filteredTransactions.length === transactions.length}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CreateTransactionForm 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onTransactionCreated={handleTransactionCreated}
      />
    </MainLayout>
  );
};

export default Transactions;
