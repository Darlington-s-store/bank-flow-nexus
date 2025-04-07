
import { Button } from "@/components/ui/button";

interface AccountsPaginationProps {
  totalCount: number;
  filteredCount: number;
}

const AccountsPagination = ({ totalCount, filteredCount }: AccountsPaginationProps) => {
  if (totalCount === 0) return null;
  
  return (
    <div className="p-4 border-t flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> accounts
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm" disabled={filteredCount === totalCount}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default AccountsPagination;
