
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomBadge } from "@/components/ui/custom-badge";
import { useNavigate } from "react-router-dom";
import { Account } from "@/utils/accountsData";

interface CustomerAccountsProps {
  customerId: string;
  accounts: Account[];
}

const CustomerAccounts = ({ customerId, accounts }: CustomerAccountsProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Accounts</CardTitle>
        <Button variant="outline" size="sm" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          Add Account
        </Button>
      </CardHeader>
      <CardContent>
        {accounts.length > 0 ? (
          <div className="space-y-4">
            {accounts.map((account) => (
              <div 
                key={account.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/accounts/${account.id}`)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{account.type.charAt(0).toUpperCase() + account.type.slice(1)} Account</p>
                    <CustomBadge 
                      variant={account.status === "active" ? "success" : 
                              account.status === "inactive" ? "secondary" : "outline"}
                    >
                      {account.status}
                    </CustomBadge>
                  </div>
                  <p className="text-sm text-muted-foreground">Account #: {account.accountNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${account.balance.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    Opened {new Date(account.openDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center border border-dashed rounded-lg">
            <p className="text-muted-foreground mb-4">No accounts found for this customer</p>
            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Create New Account
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerAccounts;
