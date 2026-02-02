import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total clients"
          value="12,456"
          change="+2.5%"
          trend="up"
        />
        <SummaryCard
          title="Total revenue"
          value="₨ 3,465 M"
          change="+0.5%"
          trend="up"
        />
        <SummaryCard
          title="Active bookings"
          value="1,136"
          change="-0.2%"
          trend="down"
        />
        <SummaryCard
          title="Pending installments"
          value="1,789"
          change="+0.12%"
          trend="up"
        />
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BarChart3 className="size-4" />
            </span>
            <h2 className="text-base font-semibold text-foreground">
              Revenue overview
            </h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Connect your data source for revenue by period.
          </p>
          <div className="mt-6 h-64 rounded-lg border border-dashed border-border bg-muted/30 flex items-center justify-center" aria-hidden>
            <span className="text-xs text-muted-foreground">Chart will appear here</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <PieChart className="size-4" />
            </span>
            <h2 className="text-base font-semibold text-foreground">
              Sales by category
            </h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Connect your data for category breakdown.
          </p>
          <div className="mt-6 h-64 rounded-lg border border-dashed border-border bg-muted/30 flex items-center justify-center" aria-hidden>
            <span className="text-xs text-muted-foreground">Chart will appear here</span>
          </div>
        </div>
      </section>
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Activity className="size-4" />
          </span>
          <h2 className="text-base font-semibold text-foreground">
            Recent activity
          </h2>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Connect your data for recent bookings and payments.
        </p>
        <div className="mt-6 h-32 rounded-lg border border-dashed border-border bg-muted/30 flex items-center justify-center" aria-hidden>
          <span className="text-xs text-muted-foreground">Activity feed will appear here</span>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  change,
  trend,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}) {
  const Icon = trend === "up" ? TrendingUp : TrendingDown;
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-border/80">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{value}</p>
      <p
        className={`mt-1.5 flex items-center gap-1.5 text-xs font-medium ${
          trend === "up" ? "text-success" : "text-destructive"
        }`}
      >
        <Icon className="size-3.5 shrink-0" aria-hidden />
        {change} from last period
      </p>
    </div>
  );
}
