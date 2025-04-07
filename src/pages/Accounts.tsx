
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Account, getAllAccounts, getAccountStats } from "@/utils/accountsData";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AccountStats from "@/components/accounts/AccountStats";
import AccountsToolbar from "@/components/accounts/AccountsToolbar";
import AccountsTable from "@/components/accounts/AccountsTable";
import AccountsPagination from "@/components/accounts/AccountsPagination";

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
        <AccountStats statsData={statsData} />
        
        {/* Accounts Table */}
        <div className="banking-card">
          <AccountsToolbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <AccountsTable 
            accounts={accounts}
            filteredAccounts={filteredAccounts}
            searchQuery={searchQuery}
          />
          
          <AccountsPagination 
            totalCount={accounts.length}
            filteredCount={filteredAccounts.length}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Accounts;
