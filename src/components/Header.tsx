import { Award } from "lucide-react";

const Header = () => {
  return (
    <header className="relative overflow-hidden border-b border-border/50 bg-card-gradient">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6 py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-5">
            {/* Placeholder Logo */}
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-wine-gradient shadow-wine">
              <Award className="h-10 w-10 text-primary-foreground" />
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Super Achievers
              </h1>
              <p className="mt-1 font-display text-lg text-accent">
                Team Celebration
              </p>
            </div>
          </div>

          {/* Event Badge */}
          <div className="flex flex-col items-center gap-2 md:items-end">
            <div className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
              <span className="text-sm font-medium text-accent">
                Accreditation Portal
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Manage and accredit team members
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
