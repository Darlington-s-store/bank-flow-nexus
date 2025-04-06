
import MainLayout from "@/components/layout/MainLayout";

const Reports = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Generate and view financial reports and analytics</p>
        </div>
        
        <div className="banking-card p-8 text-center">
          <h2 className="text-xl font-medium mb-4">Reports Module Coming Soon</h2>
          <p className="text-muted-foreground">
            This section will include transaction reports, profit & loss statements, 
            customer behavior analytics, and regulatory compliance reports.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
