
import { 
  getStoreData,
  saveStoreData,
  addStoreItem,
  updateStoreItem,
  deleteStoreItem,
  StoreKeys
} from "./localStorage";

export interface Account {
  id: string;
  customerId: string;
  accountNumber: string;
  type: string; // 'checking', 'savings', 'money_market', 'cd', 'ira'
  balance: number;
  status: string; // 'active', 'inactive', 'suspended', 'closed'
  openDate: string;
  lastActivityDate?: string;
}

// Helper function to generate a unique account number
export const generateAccountNumber = (): string => {
  const prefix = "ACT";
  const randomDigits = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  return `${prefix}${randomDigits}`;
};

// Get all accounts
export const getAllAccounts = (): Account[] => {
  return getStoreData<Account>('accounts');
};

// Get accounts for a specific customer
export const getCustomerAccounts = (customerId: string): Account[] => {
  const accounts = getAllAccounts();
  return accounts.filter(account => account.customerId === customerId);
};

// Get account by ID
export const getAccountById = (accountId: string): Account | undefined => {
  const accounts = getAllAccounts();
  return accounts.find(account => account.id === accountId);
};

// Create a new account
export const createAccount = (account: Account): Account => {
  addStoreItem<Account>('accounts', account);
  return account;
};

// Update an existing account
export const updateAccount = (accountId: string, updatedAccount: Account): Account => {
  updateStoreItem<Account>('accounts', accountId, updatedAccount);
  return updatedAccount;
};

// Delete an account
export const deleteAccount = (accountId: string): void => {
  deleteStoreItem<Account>('accounts', accountId);
};

// Update account balance
export const updateAccountBalance = (accountId: string, amount: number, isCredit: boolean): Account | undefined => {
  const account = getAccountById(accountId);
  
  if (!account) {
    return undefined;
  }
  
  const newBalance = isCredit 
    ? account.balance + amount 
    : account.balance - amount;
  
  const updatedAccount = {
    ...account,
    balance: newBalance,
    lastActivityDate: new Date().toISOString().split('T')[0]
  };
  
  updateAccount(accountId, updatedAccount);
  return updatedAccount;
};

// Generate account statistics
export const getAccountStats = () => {
  const accounts = getAllAccounts();
  
  // Count accounts by type
  const typeCount: Record<string, number> = {};
  accounts.forEach(account => {
    const type = account.type || "unknown";
    typeCount[type] = (typeCount[type] || 0) + 1;
  });
  
  // Calculate total balances
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  
  // Count accounts by status
  const statusCount: Record<string, number> = {};
  accounts.forEach(account => {
    const status = account.status || "unknown";
    statusCount[status] = (statusCount[status] || 0) + 1;
  });
  
  return {
    totalAccounts: accounts.length,
    totalBalance,
    typeCount,
    statusCount
  };
};
