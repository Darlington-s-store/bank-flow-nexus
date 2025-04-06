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
import { Edit, Eye, Filter, MoreVertical, Search, Trash2, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample accounts data
const accounts = [
  {
    id: "A1001",
    customerId: "C1001",
    customerName: "Jane Cooper",
    accountNumber: "4523781900",
    accountType: "Savings",
    balance: 12500.45,
    currency: "USD",
    status: "active",
    dateOpened: "2025-01-15"
  },
  {
    id: "A1002",
    customerId: "C1002",
    customerName: "Robert Miller",
    accountNumber: "7891456200",
    accountType: "Current",
    balance: 8250.20,
    currency: "USD",
    status: "active",
    dateOpened: "2025-02-05"
  },
  {
    id: "A1003",
    customerId: "C1003",
    customerName: "Lisa Johnson",
    accountNumber: "3456912700",
    accountType: "Savings",
    balance: 5120.75,
    currency: "USD",
    status: "inactive",
    dateOpened: "2025-02-18"
  },
  {
    id: "A1004",
    customerId: "C1004",
    customerName: "Michael Wilson",
    accountNumber: "9087234500",
    accountType: "Current",
    balance: 15750.30,
    currency: "USD",
    status: "active",
    dateOpened: "2025-03-02"
  },
  {
    id: "A1005",
    customerId: "C1005",
    customerName: "Sarah Davis",
    accountNumber: "5678123400",
    accountType: "Fixed Deposit",
    balance: 25000.00,
    currency: "USD",
    status: "active",
    dateOpened: "2025-03-10"
  }
];

const Accounts = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Accounts</h1>
            <p className="text-muted-foreground">Manage customer accounts and balances</p>
          </div>
          <Button className="gap-1">
            <Wallet className="h-4 w-4" />
            Create Account
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Accounts</TabsTrigger>
              <TabsTrigger value="savings">Savings</TabsTrigger>
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="fd">Fixed Deposit</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">125</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,250,750.90</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">112</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Inactive Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">13</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="banking-card">
              <div className="p-4 border-b">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative sm:w-[300px] md:w-[400px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search accounts..." className="pl-8" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
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
                      <TableHead>Account Number</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Opened</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell className="font-medium">{account.accountNumber}</TableCell>
                        <TableCell>
                          <div>
                            <p>{account.customerName}</p>
                            <p className="text-xs text-muted-foreground">ID: {account.customerId}</p>
                          </div>
                        </TableCell>
                        <TableCell>{account.accountType}</TableCell>
                        <TableCell>
                          <div className="font-medium">${account.balance.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">{account.currency}</div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={account.status === "active" ? "default" : "secondary"}
                          >
                            {account.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{account.dateOpened}</TableCell>
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
                                <Edit className="h-4 w-4" /> Edit Account
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Trash2 className="h-4 w-4" /> Close Account
                              </DropdownMenuItem>
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
                  Showing <strong>5</strong> of <strong>125</strong> accounts
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
          </TabsContent>
          
          {/* Other tab contents would be similar but filtered by account type */}
          <TabsContent value="savings" className="mt-0">
            <div className="banking-card p-8 text-center">
              <p>Savings accounts view - Same UI but filtered for savings accounts only</p>
            </div>
          </TabsContent>
          <TabsContent value="current" className="mt-0">
            <div className="banking-card p-8 text-center">
              <p>Current accounts view - Same UI but filtered for current accounts only</p>
            </div>
          </TabsContent>
          <TabsContent value="fd" className="mt-0">
            <div className="banking-card p-8 text-center">
              <p>Fixed Deposit accounts view - Same UI but filtered for FD accounts only</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Accounts;
