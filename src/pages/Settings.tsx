
import MainLayout from "@/components/layout/MainLayout";

const Settings = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Configure system and application settings</p>
        </div>
        
        <div className="banking-card p-8 text-center">
          <h2 className="text-xl font-medium mb-4">Settings Module Coming Soon</h2>
          <p className="text-muted-foreground">
            This section will include system configuration, user management,
            role-based access controls, notification settings, and more.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
