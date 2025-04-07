
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Account, getAllAccounts, getAccountStats } from "@/utils/accountsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Define the correct type for stats data
  type StatsDataType = {
    totalAccounts: number;
    totalBalance: number;
    statusCount: Record<string, number>;
    typeCount: Record<string, number>;
  };
  
  const [statsData, setStatsData] = useState<StatsDataType>({
    totalAccounts: 0,
    totalBalance: 0,
    statusCount: {},
    typeCount: {}
  });
  
  useEffect(() => {
    // Load accounts from localStorage
    const loadedAccounts = getAllAccounts();
    setAccounts(loadedAccounts);
    
    // Get account statistics
    const stats = getAccountStats();
    setStatsData(stats);
  }, []);
  
  // Filter accounts based on search
  const filteredAccounts = accounts.filter(account => 
    account.accountNumber.includes(searchQuery) ||
    account.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Accounts</h1>
            <p className="text-muted-foreground">Manage customer accounts and balances</p>
          </div>
          <Button className="gap-1" onClick={() => navigate("/customers")}>
            <PlusCircle className="h-4 w-4" />
            New Account
          </Button>
        </div>
        
        {/* Account Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.totalAccounts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${statsData.totalBalance.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.statusCount.active || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Inactive Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.statusCount.inactive || 0}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Accounts Table */}
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
                <Button variant="outline" size="sm">
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
                  <TableHead>Type</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Open Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((account) => (
                    <TableRow 
                      key={account.id} 
                      className="cursor-pointer"
                      onClick={() => navigate(`/accounts/${account.id}`)}
                    >
                      <TableCell>{account.accountNumber}</TableCell>
                      <TableCell className="capitalize">{account.type}</TableCell>
                      <TableCell>${account.balance.toFixed(2)}</TableCell>
                      <TableCell>
                        <CustomBadge 
                          variant={
                            account.status === "active" 
                              ? "success" 
                              : account.status === "inactive" 
                                ? "secondary" 
                                : "outline"
                          }
                        >
                          {account.status}
                        </CustomBadge>
                      </TableCell>
                      <TableCell>{new Date(account.openDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      {searchQuery ? (
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-lg font-medium">No accounts found</p>
                          <p className="text-sm text-muted-foreground">
                            Try adjusting your search criteria
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-lg font-medium">No accounts yet</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Create an account for a customer to get started
                          </p>
                          <Button 
                            className="gap-1" 
                            onClick={() => navigate("/customers")}
                          >
                            <PlusCircle className="h-4 w-4" />
                            Add Account
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {accounts.length > 0 && (
            <div className="p-4 border-t flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <strong>{filteredAccounts.length}</strong> of <strong>{accounts.length}</strong> accounts
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled={filteredAccounts.length === accounts.length}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Accounts;
