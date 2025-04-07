
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsDataType {
  totalAccounts: number;
  totalBalance: number;
  statusCount: Record<string, number>;
  typeCount: Record<string, number>;
}

interface AccountStatsProps {
  statsData: StatsDataType;
}

const AccountStats = ({ statsData }: AccountStatsProps) => {
  return (
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
  );
};

export default AccountStats;
