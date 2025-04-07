
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Account } from "@/utils/accountsData";

interface AccountsTableProps {
  accounts: Account[];
  filteredAccounts: Account[];
  searchQuery: string;
}

const AccountsTable = ({ accounts, filteredAccounts, searchQuery }: AccountsTableProps) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default AccountsTable;
