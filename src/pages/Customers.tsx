
import { useState } from "react";
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
import { Edit, Eye, MoreVertical, Search, Trash2, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateCustomerForm from "@/components/customers/CreateCustomerForm";

// Sample customer data - this will be empty initially and populated by admin
const initialCustomers: any[] = [];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCustomerCreated = (newCustomer: any) => {
    setCustomers([...customers, newCustomer]);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Customers</h1>
            <p className="text-muted-foreground">Manage customer accounts and profiles</p>
          </div>
          <Button className="gap-1" onClick={() => setCreateDialogOpen(true)}>
            <UserPlus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
        
        <div className="banking-card">
          <div className="p-4 border-b">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative sm:w-[300px] md:w-[400px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search customers..." 
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
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={customer.imageSrc} alt={customer.name} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {customer.name.split(" ").map((n: string) => n[0]).join("")}
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
                            <DropdownMenuItem 
                              className="flex items-center gap-2 text-destructive"
                              onClick={() => handleDeleteCustomer(customer.id)}
                            >
                              <Trash2 className="h-4 w-4" /> Delete Customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      {searchQuery ? (
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-lg font-medium">No customers found</p>
                          <p className="text-sm text-muted-foreground">
                            Try adjusting your search criteria
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-lg font-medium">No customers yet</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Add your first customer to get started
                          </p>
                          <Button 
                            className="gap-1" 
                            onClick={() => setCreateDialogOpen(true)}
                          >
                            <UserPlus className="h-4 w-4" />
                            Add Customer
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {customers.length > 0 && (
            <div className="p-4 border-t flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <strong>{filteredCustomers.length}</strong> of <strong>{customers.length}</strong> customers
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled={filteredCustomers.length === customers.length}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CreateCustomerForm 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCustomerCreated={handleCustomerCreated}
      />
    </MainLayout>
  );
};

export default Customers;
