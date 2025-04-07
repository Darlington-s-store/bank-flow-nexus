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
import { Edit, Eye, Filter, MoreVertical, PlusCircle, Search, Trash2, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Account, getAllAccounts, getAccountStats } from "@/utils/accountsData";
import { toast } from "sonner";

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [stats, setStats] = useState({
    totalAccounts: 0,
    totalBalance: 0,
    statusCount: { active: 0, inactive: 0 }
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    try {
      const loadedAccounts = getAllAccounts();
      setAccounts(loadedAccounts);
      
      const accountStats = getAccountStats();
      setStats(accountStats);
    } catch (error) {
      console.error("Error loading accounts:", error);
      toast.error("Failed to load accounts");
    }
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (currentTab === "all") return matchesSearch;
    return matchesSearch && account.type.toLowerCase() === currentTab.toLowerCase();
  });

  const handleCreateAccount = () => {
    toast.info("Create account functionality coming soon");
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Accounts</h1>
            <p className="text-muted-foreground">Manage customer accounts and balances</p>
          </div>
          <Button className="gap-1" onClick={handleCreateAccount}>
            <Wallet className="h-4 w-4" />
            Create Account
          </Button>
        </div>
        
        <Tabs 
          defaultValue="all" 
          className="w-full"
          onValueChange={(value) => setCurrentTab(value)}
        >
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Accounts</TabsTrigger>
              <TabsTrigger value="savings">Savings</TabsTrigger>
              <TabsTrigger value="checking">Checking</TabsTrigger>
              <TabsTrigger value="money_market">Money Market</TabsTrigger>
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
                  <div className="text-2xl font-bold">{stats.totalAccounts}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalBalance.toFixed(2)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.statusCount.active || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Inactive Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.statusCount.inactive || 0}</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="banking-card">
              <div className="p-4 border-b">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative sm:w-[300px] md:w-[400px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search accounts..." 
                      className="pl-8" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
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
              
              {filteredAccounts.length > 0 ? (
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account Number</TableHead>
                        <TableHead>Customer ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date Opened</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAccounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-medium">{account.accountNumber}</TableCell>
                          <TableCell>
                            <div>
                              <p>{account.customerId}</p>
                            </div>
                          </TableCell>
                          <TableCell>{account.type}</TableCell>
                          <TableCell>
                            <div className="font-medium">${account.balance.toFixed(2)}</div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={account.status === "active" ? "default" : "secondary"}
                            >
                              {account.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{account.openDate}</TableCell>
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
                                <DropdownMenuItem className="flex items-center gap-2" 
                                  onClick={() => navigate(`/accounts/${account.id}`)}>
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
              ) : (
                <div className="p-8 text-center border border-dashed rounded-lg mx-4 my-6">
                  <p className="text-muted-foreground mb-4">No accounts found</p>
                  <Button className="gap-1" onClick={handleCreateAccount}>
                    <PlusCircle className="h-4 w-4" />
                    Create New Account
                  </Button>
                </div>
              )}
              
              {filteredAccounts.length > 0 && (
                <div className="p-4 border-t flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing <strong>{filteredAccounts.length}</strong> of <strong>{accounts.length}</strong> accounts
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
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="savings" className="mt-0">
            <div className="banking-card">
              <div className="p-4 border-b">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative sm:w-[300px] md:w-[400px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search savings accounts..." 
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {filteredAccounts.length > 0 ? (
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account Number</TableHead>
                        <TableHead>Customer ID</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date Opened</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAccounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-medium">{account.accountNumber}</TableCell>
                          <TableCell>{account.customerId}</TableCell>
                          <TableCell>${account.balance.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={account.status === "active" ? "default" : "secondary"}>
                              {account.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{account.openDate}</TableCell>
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
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No savings accounts found</p>
                  <Button className="gap-1" onClick={handleCreateAccount}>
                    <PlusCircle className="h-4 w-4" />
                    Create Savings Account
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="checking" className="mt-0">
            <div className="banking-card p-8 text-center">
              <p className="text-muted-foreground mb-4">Checking accounts view</p>
              <Button className="gap-1" onClick={handleCreateAccount}>
                <PlusCircle className="h-4 w-4" />
                Create Checking Account
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="money_market" className="mt-0">
            <div className="banking-card p-8 text-center">
              <p className="text-muted-foreground mb-4">Money Market accounts view</p>
              <Button className="gap-1" onClick={handleCreateAccount}>
                <PlusCircle className="h-4 w-4" />
                Create Money Market Account
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Accounts;
