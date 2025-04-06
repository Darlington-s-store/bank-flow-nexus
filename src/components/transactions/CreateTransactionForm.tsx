
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const transactionSchema = z.object({
  accountNumber: z.string().min(10, "Account number must be at least 10 digits"),
  customerName: z.string().min(2, "Customer name must be at least 2 characters"),
  type: z.enum(["deposit", "withdrawal", "transfer", "payment", "refund"]),
  amount: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Amount must be a positive number" }
  ),
  description: z.string().min(5, "Description must be at least 5 characters"),
  reference: z.string().optional(),
  destinationAccount: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface CreateTransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTransactionCreated: (transaction: any) => void;
}

const CreateTransactionForm = ({
  open,
  onOpenChange,
  onTransactionCreated,
}: CreateTransactionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      accountNumber: "",
      customerName: "",
      type: "deposit",
      amount: "",
      description: "",
      reference: "",
      destinationAccount: "",
    },
  });

  // Watch the transaction type to conditionally show fields
  const transactionType = form.watch("type");

  const onSubmit = async (data: TransactionFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to create the transaction
      // For demo purposes, we're simulating this with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate current date and time
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toTimeString().split(' ')[0];
      
      // Generate a reference number if not provided
      const ref = data.reference || `TRX${Math.floor(10000000 + Math.random() * 90000000)}`;
      
      // Create transaction object
      const newTransaction = {
        id: `T${Math.floor(1000 + Math.random() * 9000)}`,
        accountId: `A${Math.floor(1000 + Math.random() * 9000)}`,
        accountNumber: data.accountNumber,
        customerName: data.customerName,
        type: data.type,
        description: data.description,
        amount: parseFloat(data.amount),
        date,
        time,
        status: "completed",
        reference: ref,
        destinationAccount: data.destinationAccount || null
      };
      
      // Call the callback to add the transaction to the parent component's state
      onTransactionCreated(newTransaction);
      
      // Close the dialog and reset the form
      onOpenChange(false);
      form.reset();
      
      toast.success("Transaction created successfully");
    } catch (error) {
      toast.error("Failed to create transaction");
      console.error("Error creating transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
          <DialogDescription>
            Enter transaction details to create a new record.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transaction type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="deposit">Deposit</SelectItem>
                        <SelectItem value="withdrawal">Withdrawal</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="refund">Refund</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0.01" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {transactionType === "transfer" && (
              <FormField
                control={form.control}
                name="destinationAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination Account</FormLabel>
                    <FormControl>
                      <Input placeholder="Recipient account number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter transaction details" 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Transaction reference number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></span>
                    Processing...
                  </span>
                ) : (
                  "Create Transaction"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransactionForm;
