import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import UserTable from "@/components/UserTable";
import StatsCards from "@/components/StatsCards";
import AccreditModal from "@/components/AccreditModal";
import { Loader2 } from "lucide-react";

interface User {
  "Full Name": string;
  "Email Address": string;
  "Your Upline Director": string;
  "Your Upline World Team": string;
  "Your Status": string;
  Accredit: string;
  rowNumber: number;
}

const API_URL = "https://script.google.com/macros/s/AKfycbx_dR_L9U-j5hRaCuq664go-Do-fJLy-oz2ijjWfYmGFKwVYUufChcw2KZ0Hy4SHVSC/exec";

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccrediting, setIsAccrediting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccreditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleConfirmAccredit = async () => {
    if (!selectedUser) return;

    setIsAccrediting(true);
    try {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ rowNumber: selectedUser.rowNumber }),
      });

      // Update local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.rowNumber === selectedUser.rowNumber
            ? { ...user, Accredit: "1" }
            : user
        )
      );

      toast({
        title: "Success!",
        description: `${selectedUser["Full Name"]} has been successfully accredited.`,
      });

      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accredit user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAccrediting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 md:px-6">
        {/* Stats Section */}
        <section className="mb-8">
          <StatsCards users={users} />
        </section>

        {/* Search & Table Section */}
        <section className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Registrants
              </h2>
              <p className="mt-1 text-muted-foreground">
                Manage and accredit event participants
              </p>
            </div>
            <div className="w-full sm:max-w-md">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          {isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-xl border border-border/50 bg-card">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading registrants...</p>
              </div>
            </div>
          ) : (
            <UserTable
              users={users}
              searchQuery={searchQuery}
              onAccredit={handleAccreditClick}
            />
          )}
        </section>
      </main>

      {/* Accreditation Modal */}
      <AccreditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleConfirmAccredit}
        user={selectedUser}
        isLoading={isAccrediting}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-border/30 bg-card/50 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Super Achievers Team Celebration. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
