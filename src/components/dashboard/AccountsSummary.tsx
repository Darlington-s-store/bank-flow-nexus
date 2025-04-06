import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, LineChart } from "@/components/ui/charts";
import { cn } from "@/lib/utils";

const AccountsSummary = () => {
  // Sample data for the charts
  const barChartData = [
    { name: "Checking", value: 1245 },
    { name: "Savings", value: 1843 },
    { name: "Money Market", value: 463 },
    { name: "CDs", value: 287 },
    { name: "IRAs", value: 129 },
  ];

  const lineChartData = [
    { name: "Jan", value: 2400 },
    { name: "Feb", value: 2210 },
    { name: "Mar", value: 2290 },
    { name: "Apr", value: 2000 },
    { name: "May", value: 2181 },
    { name: "Jun", value: 2500 },
    { name: "Jul", value: 2100 },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Accounts Overview</CardTitle>
          <CardDescription>
            Distribution and growth of different account types
          </CardDescription>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
          +12.5% growth
        </Badge>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="distribution">
          <TabsList className="mb-4">
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>
          <TabsContent value="distribution" className="h-[300px]">
            <BarChart data={barChartData} />
          </TabsContent>
          <TabsContent value="growth" className="h-[300px]">
            <LineChart data={lineChartData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AccountsSummary;
