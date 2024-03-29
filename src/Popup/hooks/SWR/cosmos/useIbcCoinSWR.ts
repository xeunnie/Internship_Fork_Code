import type { AxiosError } from 'axios';
import useSWR from 'swr';

import { useNodeInfoSWR } from '~/Popup/hooks/SWR/cosmos/useNodeinfoSWR';
import { get } from '~/Popup/utils/axios';
import type { CosmosChain } from '~/types/chain';
import type { IbcCoinPayload } from '~/types/cosmos/ibcCoin';

export function useIbcCoinSWR(chain: CosmosChain, suspense?: boolean) {
  const nodeInfo = useNodeInfoSWR(chain, suspense);

  const chainId = nodeInfo?.data?.node_info.network;

  const fetcher = (fetchUrl: string) => get<IbcCoinPayload>(fetchUrl);

  const requestURL = `https://api-utility.cosmostation.io/v1/ibc/tokens/${chainId || ''}`;

  const { data, error, mutate } = useSWR<IbcCoinPayload, AxiosError>(requestURL, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 14000,
    refreshInterval: 0,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    suspense,
    isPaused: () => !chainId,
  });

  return { data, error, mutate };
}
