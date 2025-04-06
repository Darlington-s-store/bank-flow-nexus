
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, MoreVertical, Plus, Search, Trash2, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample customer data
const customers = [
  {
    id: "C1001",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    phone: "(555) 123-4567",
    accountType: "Savings",
    status: "active",
    dateAdded: "2025-01-15",
    imageSrc: ""
  },
  {
    id: "C1002",
    name: "Robert Miller",
    email: "robert.miller@example.com",
    phone: "(555) 234-5678",
    accountType: "Current",
    status: "active",
    dateAdded: "2025-02-05",
    imageSrc: ""
  },
  {
    id: "C1003",
    name: "Lisa Johnson",
    email: "lisa.johnson@example.com",
    phone: "(555) 345-6789",
    accountType: "Savings",
    status: "inactive",
    dateAdded: "2025-02-18",
    imageSrc: ""
  },
  {
    id: "C1004",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "(555) 456-7890",
    accountType: "Current",
    status: "active",
    dateAdded: "2025-03-02",
    imageSrc: ""
  },
  {
    id: "C1005",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    phone: "(555) 567-8901",
    accountType: "Fixed Deposit",
    status: "pending",
    dateAdded: "2025-03-10",
    imageSrc: ""
  }
];

const Customers = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Customers</h1>
            <p className="text-muted-foreground">Manage customer accounts and profiles</p>
          </div>
          <Button className="gap-1">
            <UserPlus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
        
        <div className="banking-card">
          <div className="p-4 border-b">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative sm:w-[300px] md:w-[400px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search customers..." className="pl-8" />
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
          
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={customer.imageSrc} alt={customer.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {customer.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {customer.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{customer.email}</p>
                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{customer.accountType}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          customer.status === "active" 
                            ? "default" 
                            : customer.status === "inactive" 
                              ? "secondary" 
                              : "outline"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.dateAdded}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Eye className="h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="h-4 w-4" /> Edit Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" /> Delete Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <strong>5</strong> of <strong>25</strong> customers
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Customers;
