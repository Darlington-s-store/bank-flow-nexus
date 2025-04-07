
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AccountsToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AccountsToolbar = ({ searchQuery, setSearchQuery }: AccountsToolbarProps) => {
  return (
    <div className="p-4 border-b">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-[300px] md:w-[400px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search accounts..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountsToolbar;
