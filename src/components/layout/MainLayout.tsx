
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import BankingSidebar from "./BankingSidebar";
import Header from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <BankingSidebar />
        <div className="flex-1 overflow-auto">
          <Header />
          <main className="p-4 md:p-6 max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
