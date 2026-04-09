import { useEffect, useState } from 'react';
import { getMarketplaceData } from '../data/marketplaceData';
import type { MarketplaceData } from '../types';

interface AsyncState {
  data: MarketplaceData | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useMarketplaceSnapshot() {
  const [state, setState] = useState<AsyncState>({
    data: null,
    isLoading: true,
    errorMessage: null,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setState({
          data: getMarketplaceData(),
          isLoading: false,
          errorMessage: null,
        });
      } catch {
        setState({
          data: null,
          isLoading: false,
          errorMessage: 'Unable to load marketplace snapshot.',
        });
      }
    }, 120);

    return () => window.clearTimeout(timer);
  }, []);

  return state;
}
