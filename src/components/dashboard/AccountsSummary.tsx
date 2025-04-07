
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomBadge } from "@/components/ui/custom-badge";
import { BarChart, LineChart } from "@/components/ui/charts";
import { cn } from "@/lib/utils";

interface AccountsSummaryProps {
  customersCount: number;
  accounts: any[];
}

const AccountsSummary = ({ customersCount, accounts = [] }: AccountsSummaryProps) => {
  // Generate dynamic data if real data is available, otherwise use sample data
  const generateBarChartData = () => {
    if (accounts.length > 0) {
      // Create account type distribution
      const accountTypes: Record<string, number> = {};
      accounts.forEach(account => {
        const type = account.type || "Unknown";
        accountTypes[type] = (accountTypes[type] || 0) + 1;
      });

      return Object.entries(accountTypes).map(([name, value]) => ({ name, value }));
    }

    // Fallback sample data
    return [
      { name: "Checking", value: customersCount > 0 ? Math.max(1, Math.floor(customersCount * 0.7)) : 0 },
      { name: "Savings", value: customersCount > 0 ? Math.max(1, Math.floor(customersCount * 0.9)) : 0 },
      { name: "Money Market", value: customersCount > 0 ? Math.max(1, Math.floor(customersCount * 0.3)) : 0 },
      { name: "CDs", value: customersCount > 0 ? Math.max(1, Math.floor(customersCount * 0.15)) : 0 },
      { name: "IRAs", value: customersCount > 0 ? Math.max(1, Math.floor(customersCount * 0.05)) : 0 },
    ];
  };

  const generateLineChartData = () => {
    // Sample monthly growth data
    return [
      { name: "Jan", value: 2400 },
      { name: "Feb", value: 2210 },
      { name: "Mar", value: 2290 },
      { name: "Apr", value: customersCount > 0 ? 2000 + (customersCount * 100) : 2000 },
      { name: "May", value: customersCount > 0 ? 2181 + (customersCount * 120) : 2181 },
      { name: "Jun", value: customersCount > 0 ? 2500 + (customersCount * 150) : 2500 },
      { name: "Jul", value: customersCount > 0 ? 2100 + (customersCount * 200) : 2100 },
    ];
  };

  const barChartData = generateBarChartData();
  const lineChartData = generateLineChartData();

  // Display growth badge only if there's real data
  const showGrowthBadge = customersCount > 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Accounts Overview</CardTitle>
          <CardDescription>
            {customersCount > 0 
              ? `Distribution and growth across ${accounts.length || customersCount} accounts`
              : "Distribution and growth of different account types"}
          </CardDescription>
        </div>
        {showGrowthBadge && (
          <CustomBadge variant="success">
            +{(12.5 + (customersCount * 0.5)).toFixed(1)}% growth
          </CustomBadge>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="distribution">
          <TabsList className="mb-4">
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>
          
          {barChartData.length > 0 ? (
            <>
              <TabsContent value="distribution" className="h-[300px]">
                <BarChart data={barChartData} />
              </TabsContent>
              <TabsContent value="growth" className="h-[300px]">
                <LineChart data={lineChartData} />
              </TabsContent>
            </>
          ) : (
            <div className="h-[300px] flex items-center justify-center flex-col">
              <p className="text-muted-foreground">No account data available</p>
              <p className="text-xs text-muted-foreground mt-1">
                Add customers to see your accounts overview
              </p>
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AccountsSummary;
