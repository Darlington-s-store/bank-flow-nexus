
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Account, getAccountById, updateAccount, deleteAccount } from "@/utils/accountsData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { CustomBadge } from "@/components/ui/custom-badge";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AccountDetails = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accountId) {
      const foundAccount = getAccountById(accountId);
      setAccount(foundAccount || null);
      setLoading(false);
    }
  }, [accountId]);

  const handleCloseAccount = () => {
    if (!account) return;
    
    try {
      // Update account status to closed
      const updatedAccount = {
        ...account,
        status: "closed"
      };
      updateAccount(account.id, updatedAccount);
      setAccount(updatedAccount);
      toast.success("Account closed successfully");
    } catch (error) {
      console.error("Error closing account:", error);
      toast.error("Failed to close account");
    }
  };

  const handleDeleteAccount = () => {
    if (!account) return;
    
    try {
      deleteAccount(account.id);
      toast.success("Account deleted successfully");
      navigate("/accounts");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <p>Loading account details...</p>
        </div>
      </MainLayout>
    );
  }

  if (!account) {
    return (
      <MainLayout>
        <div className="flex flex-col gap-6">
          <Button variant="ghost" className="w-fit gap-1" onClick={() => navigate("/accounts")}>
            <ArrowLeft className="h-4 w-4" /> Back to Accounts
          </Button>
          <div className="banking-card p-8 text-center">
            <p className="text-muted-foreground">Account not found</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="w-fit gap-1" onClick={() => navigate("/accounts")}>
            <ArrowLeft className="h-4 w-4" /> Back to Accounts
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <Edit className="h-4 w-4" /> Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-1">
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the account and remove it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>Account #{account.accountNumber}</CardDescription>
              </div>
              <CustomBadge 
                variant={
                  account.status === "active" ? "success" : 
                  account.status === "inactive" ? "secondary" : 
                  account.status === "closed" ? "destructive" : "outline"
                }
              >
                {account.status}
              </CustomBadge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Account Type</span>
                    <span className="font-medium">{account.type.charAt(0).toUpperCase() + account.type.slice(1)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Account Number</span>
                    <span className="font-medium">{account.accountNumber}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Customer ID</span>
                    <span className="font-medium">{account.customerId}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Date Opened</span>
                    <span className="font-medium">{new Date(account.openDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Last Activity</span>
                    <span className="font-medium">
                      {account.lastActivityDate ? new Date(account.lastActivityDate).toLocaleDateString() : "No activity"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Financial Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Current Balance</span>
                    <span className="font-medium text-xl">${account.balance.toFixed(2)}</span>
                  </div>
                  {/* Additional financial information would go here */}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Account Actions</h3>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" onClick={() => navigate(`/customers/${account.customerId}`)}>
                      View Customer
                    </Button>
                    {account.status !== "closed" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                            Close Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Close this account?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will mark the account as closed. The account will remain in the system but will no longer be active.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleCloseAccount}>Close Account</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AccountDetails;
