import { Wallet } from 'lucide-react';

interface CreditsBalanceProps {
  credits: number;
}

export function CreditsBalance({ credits }: CreditsBalanceProps) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-2">
      <div className="flex items-center gap-2">
        <Wallet className="h-5 w-5 text-primary" />
        <div>
          <p className="text-xs text-muted-foreground">Your Balance</p>
          <p className="text-xl font-bold text-foreground">{credits || 0}</p>
        </div>
      </div>
    </div>
  );
}
