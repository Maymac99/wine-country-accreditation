import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, UserCheck, CheckCircle2 } from "lucide-react";

interface User {
  "Full Name": string;
  "Email Address": string;
  "Your Upline Director": string;
  "Your Upline World Team": string;
  "Your Status": string;
  Accredit: string;
  rowNumber: number;
}

interface UserTableProps {
  users: User[];
  searchQuery: string;
  onAccredit: (user: User) => void;
}

type SortField = "Full Name" | "Email Address" | "Your Upline Director" | "Your Upline World Team" | "Your Status";
type SortDirection = "asc" | "desc";

const UserTable = ({ users, searchQuery, onAccredit }: UserTableProps) => {
  const [sortField, setSortField] = useState<SortField>("Full Name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (user) =>
          user["Full Name"]?.toLowerCase().includes(query) ||
          user["Email Address"]?.toLowerCase().includes(query) ||
          user["Your Upline Director"]?.toLowerCase().includes(query) ||
          user["Your Upline World Team"]?.toLowerCase().includes(query) ||
          user["Your Status"]?.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      const aValue = String(a[sortField] ?? "").toLowerCase();
      const bValue = String(b[sortField] ?? "").toLowerCase();
      
      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      }
      return bValue.localeCompare(aValue);
    });

    return result;
  }, [users, searchQuery, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 inline h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 inline h-4 w-4" />
    );
  };

  const getStatusVariant = (status: string) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower.includes("world") || statusLower.includes("diamond")) return "gold";
    if (statusLower.includes("director") || statusLower.includes("senior")) return "success";
    if (statusLower.includes("manager") || statusLower.includes("team")) return "warning";
    return "secondary";
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-elevated">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead 
                onClick={() => handleSort("Full Name")}
                className="cursor-pointer font-semibold text-foreground transition-colors hover:text-accent"
              >
                Full Name <SortIcon field="Full Name" />
              </TableHead>
              <TableHead 
                onClick={() => handleSort("Email Address")}
                className="cursor-pointer font-semibold text-foreground transition-colors hover:text-accent"
              >
                Email Address <SortIcon field="Email Address" />
              </TableHead>
              <TableHead 
                onClick={() => handleSort("Your Upline Director")}
                className="hidden cursor-pointer font-semibold text-foreground transition-colors hover:text-accent md:table-cell"
              >
                Upline Director <SortIcon field="Your Upline Director" />
              </TableHead>
              <TableHead 
                onClick={() => handleSort("Your Upline World Team")}
                className="hidden cursor-pointer font-semibold text-foreground transition-colors hover:text-accent lg:table-cell"
              >
                Upline World Team <SortIcon field="Your Upline World Team" />
              </TableHead>
              <TableHead 
                onClick={() => handleSort("Your Status")}
                className="cursor-pointer font-semibold text-foreground transition-colors hover:text-accent"
              >
                Status <SortIcon field="Your Status" />
              </TableHead>
              <TableHead className="text-right font-semibold text-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  {searchQuery ? "No users found matching your search." : "No users available."}
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedUsers.map((user, index) => (
                <TableRow 
                  key={user.rowNumber || index}
                  className="animate-fade-in border-border/30 transition-colors hover:bg-secondary/30"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell className="font-medium text-foreground">
                    {user["Full Name"]}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user["Email Address"]}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {user["Your Upline Director"]}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {user["Your Upline World Team"]}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(user["Your Status"])}>
                      {user["Your Status"]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {user.Accredit === "" || user.Accredit === null ? (
                      <Button
                        variant="accredit"
                        size="sm"
                        onClick={() => onAccredit(user)}
                      >
                        <UserCheck className="mr-2 h-4 w-4" />
                        Accredit
                      </Button>
                    ) : (
                      <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        Accredited
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Table Footer Stats */}
      <div className="flex items-center justify-between border-t border-border/30 bg-secondary/20 px-6 py-4">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredAndSortedUsers.length}</span> of{" "}
          <span className="font-semibold text-foreground">{users.length}</span> users
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">
              {users.filter(u => u.Accredit !== "" && u.Accredit !== null).length} Accredited
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">
              {users.filter(u => u.Accredit === "" || u.Accredit === null).length} Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
