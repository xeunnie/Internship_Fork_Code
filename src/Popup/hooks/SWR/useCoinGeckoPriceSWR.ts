import type { AxiosError } from 'axios';
import useSWR from 'swr';

import { NETWORKS } from '~/constants/chain';
import { CURRENCY_TYPE } from '~/constants/chromeStorage';
import { useCurrentAllowedChains } from '~/Popup/hooks/useCurrent/useCurrentAllowedChains';
import { get } from '~/Popup/utils/axios';
import type { CosmosChain } from '~/types/chain';
import type { SimplePrice } from '~/types/coinGecko';

import { useAssetsSWR } from './cosmos/useAssetsSWR';
import { useChromeStorage } from '../useChromeStorage';

export function useCoinGeckoPriceSWR(suspense?: boolean) {
  const { currentAllowedChains } = useCurrentAllowedChains();

  const cosmosAssets = useAssetsSWR();

  const { chromeStorage } = useChromeStorage();

  const { additionalEthereumNetworks, ethereumTokens, cosmosTokens } = chromeStorage;
  const networkCoinGeckoIds = [...NETWORKS, ...additionalEthereumNetworks].filter((item) => !!item.coinGeckoId).map((item) => item.coinGeckoId);
  const ethereumTokenCoinGeckoIds = ethereumTokens.filter((item) => !!item.coinGeckoId).map((item) => item.coinGeckoId!);
  const cosmosTokenCoinGeckoIds = cosmosTokens.filter((item) => !!item.coinGeckoId).map((item) => item.coinGeckoId!);
  const cosmosAssetsCoinGeckoIds = cosmosAssets.data.map((item) => item.coinGeckoId);

  const allCoinGeckoIds = Array.from(
    new Set([...networkCoinGeckoIds, ...ethereumTokenCoinGeckoIds, ...cosmosTokenCoinGeckoIds, ...cosmosAssetsCoinGeckoIds]),
  ).filter((item) => item);
  const joinedAllCoinGeckoIds = allCoinGeckoIds.length > 0 ? `,${allCoinGeckoIds.join(',')}` : '';

  const coinGeckoIds = `${(currentAllowedChains.filter((chain) => chain.line === 'COSMOS' && chain.coinGeckoId) as CosmosChain[])
    .map((chain) => chain.coinGeckoId)
    .join(',')}${joinedAllCoinGeckoIds}`;

  const currencySymbols = Object.values(CURRENCY_TYPE).join(',');

  const requestURL = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=${currencySymbols}&ids=${coinGeckoIds}&include_market_cap=true&include_24hr_change=true`;

  const fetcher = (fetchUrl: string) => get<SimplePrice>(fetchUrl);

  const { data, error, mutate } = useSWR<SimplePrice, AxiosError>(requestURL, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 14000,
    refreshInterval: 15000,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    suspense,
  });

  return { data, error, mutate };
}
