
import MainLayout from "@/components/layout/MainLayout";

const Compliance = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Compliance</h1>
          <p className="text-muted-foreground">Manage regulatory compliance and security</p>
        </div>
        
        <div className="banking-card p-8 text-center">
          <h2 className="text-xl font-medium mb-4">Compliance Module Coming Soon</h2>
          <p className="text-muted-foreground">
            This section will include KYC management, AML monitoring, GDPR compliance tools,
            security settings, and audit logs for compliance reporting.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Compliance;
