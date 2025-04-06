
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

const loanSchema = z.object({
  customerName: z.string().min(2, "Customer name must be at least 2 characters"),
  accountNumber: z.string().min(10, "Account number must be at least 10 digits"),
  type: z.enum(["Personal", "Home", "Auto", "Business", "Education"]),
  amount: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Loan amount must be a positive number" }
  ),
  term: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Term must be a positive number" }
  ),
  interestRate: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 100,
    { message: "Interest rate must be a positive number less than 100" }
  ),
  purpose: z.string().min(5, "Loan purpose must be at least 5 characters"),
});

type LoanFormValues = z.infer<typeof loanSchema>;

interface CreateLoanFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoanCreated: (loan: any) => void;
}

const CreateLoanForm = ({
  open,
  onOpenChange,
  onLoanCreated,
}: CreateLoanFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      customerName: "",
      accountNumber: "",
      type: "Personal",
      amount: "",
      term: "36",
      interestRate: "8.5",
      purpose: "",
    },
  });

  const onSubmit = async (data: LoanFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to create the loan
      // For demo purposes, we're simulating this with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a unique ID for the new loan
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 7); // Start date is 7 days in the future
      const nextPaymentDate = new Date(startDate);
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1); // First payment due 1 month after start
      
      const amount = parseFloat(data.amount);
      const term = parseInt(data.term);
      const interestRate = parseFloat(data.interestRate);
      
      // Calculate monthly payment (simplified)
      const monthlyRate = interestRate / 100 / 12;
      const nextPaymentAmount = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                               (Math.pow(1 + monthlyRate, term) - 1);
      
      const newLoan = {
        id: `L${Math.floor(1000 + Math.random() * 9000)}`,
        accountId: `A${Math.floor(1000 + Math.random() * 9000)}`,
        accountNumber: data.accountNumber,
        customerName: data.customerName,
        type: data.type,
        amount: amount,
        amountPaid: 0,
        interestRate: interestRate,
        term: term,
        monthsRemaining: term,
        startDate: startDate.toISOString().split('T')[0],
        nextPaymentDate: nextPaymentDate.toISOString().split('T')[0],
        nextPaymentAmount: nextPaymentAmount,
        status: "pending",
        purpose: data.purpose
      };
      
      // Call the callback to add the loan to the parent component's state
      onLoanCreated(newLoan);
      
      // Close the dialog and reset the form
      onOpenChange(false);
      form.reset();
      
      toast.success("Loan application submitted successfully");
    } catch (error) {
      toast.error("Failed to submit loan application");
      console.error("Error creating loan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Loan Application</DialogTitle>
          <DialogDescription>
            Enter loan details to create a new application.
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
                    <FormLabel>Loan Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Home">Home</SelectItem>
                        <SelectItem value="Auto">Auto</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
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
                    <FormLabel>Loan Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1000" step="1000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Term (Months)</FormLabel>
                    <FormControl>
                      <Input type="number" min="12" max="360" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="interestRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interest Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="30" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Purpose</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe the purpose of this loan" {...field} />
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
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLoanForm;
