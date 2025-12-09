import { Users, UserCheck, Clock, Award } from "lucide-react";

interface User {
  "Full Name": string;
  "Email Address": string;
  "Your Upline Director": string;
  "Your Upline World Team": string;
  "Your Status": string;
  Accredit: string;
  rowNumber: number;
}

interface StatsCardsProps {
  users: User[];
}

const StatsCards = ({ users }: StatsCardsProps) => {
  const totalUsers = users.length;
  const accreditedUsers = users.filter(u => u.Accredit !== "" && u.Accredit !== null).length;
  const pendingUsers = totalUsers - accreditedUsers;
  const accreditedPercentage = totalUsers > 0 ? Math.round((accreditedUsers / totalUsers) * 100) : 0;

  const stats = [
    {
      label: "Total Registrants",
      value: totalUsers,
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      label: "Accredited",
      value: accreditedUsers,
      icon: UserCheck,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      label: "Pending",
      value: pendingUsers,
      icon: Clock,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      label: "Completion Rate",
      value: `${accreditedPercentage}%`,
      icon: Award,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="animate-fade-in rounded-xl border border-border/50 bg-card-gradient p-6 shadow-elevated transition-all duration-300 hover:border-border hover:shadow-wine"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
            <div className={`rounded-xl ${stat.bgColor} ${stat.borderColor} border p-3`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
