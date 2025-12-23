import { History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreditsBalance } from '@/components/payment/credits-balance';

interface CreditsHeaderProps {
  credits: number;
  showHistory: boolean;
  onToggleHistory: () => void;
}

export function CreditsHeader({
  credits,
  showHistory,
  onToggleHistory,
}: CreditsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Buy Credits</h1>
        <p className="mt-2 text-muted-foreground">Purchase credits to generate AI headshots</p>
      </div>

      <div className="flex items-center gap-4">
        <CreditsBalance credits={credits} />
        <Button variant="outline" onClick={onToggleHistory}>
          <History className="mr-2 h-4 w-4" />
          {showHistory ? 'View Packages' : 'View History'}
        </Button>
      </div>
    </div>
  );
}
