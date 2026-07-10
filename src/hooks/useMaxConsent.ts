import { useState } from "react";

export const MAX_LINK = "https://max.ru/u/f9LHodD0cOIhDoRH_6LXfcSUOHBuL1Ox9Kjst5F3mN4736vAC4pXtz-GKzc";

export function useMaxConsent() {
  const [consent, setConsent] = useState(false);

  const openMax = (e: React.MouseEvent, onGoal?: () => void) => {
    if (!consent) {
      e.preventDefault();
      return;
    }
    onGoal?.();
  };

  return { consent, setConsent, openMax };
}
