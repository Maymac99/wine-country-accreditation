import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserCheck, X } from "lucide-react";

interface User {
  "Full Name": string;
  "Email Address": string;
  "Upline Director": string;
  "Upline Worldteam": string;
  "Status": string;
  Accredit: string;
  rowNumber: number;
}

interface AccreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User | null;
  isLoading?: boolean;
}

const AccreditModal = ({ isOpen, onClose, onConfirm, user, isLoading }: AccreditModalProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="animate-scale-in border-border/50 bg-card sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-wine-gradient shadow-wine">
            <UserCheck className="h-8 w-8 text-primary-foreground" />
          </div>
          <DialogTitle className="font-display text-2xl font-bold text-foreground">
            Confirm Accreditation
          </DialogTitle>
          <DialogDescription className="mt-3 text-muted-foreground">
            Are you sure you want to accredit{" "}
            <span className="font-semibold text-foreground">{user["Full Name"]}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 rounded-xl border border-border/50 bg-secondary/30 p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium text-foreground">{user["Email Address"]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium text-accent">{user["Status"]}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3 sm:gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            variant="accredit"
            onClick={onConfirm}
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Processing...
              </span>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Yes, Accredit
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccreditModal;
