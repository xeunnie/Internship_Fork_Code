import { MINTSCAN_URL } from '~/constants/common';
import starnameImg from '~/images/symbols/starname.png';
import type { CosmosChain } from '~/types/chain';

export const STARNAME: CosmosChain = {
  id: '320cfa03-401d-44b5-a40a-0de7c0d705eb',
  line: 'COSMOS',
  type: '',
  chainId: 'iov-mainnet-ibc',
  chainName: 'Starname',
  restURL: 'https://lcd-starname.cosmostation.io',
  imageURL: starnameImg,
  baseDenom: 'uiov',
  displayDenom: 'IOV',
  decimals: 6,
  bip44: {
    purpose: "44'",
    coinType: "234'",
    account: "0'",
    change: '0',
  },
  bech32Prefix: { address: 'star' },
  coinGeckoId: 'starname',
  explorerURL: `${MINTSCAN_URL}/starname`,
  gasRate: {
    tiny: '0.1',
    low: '1',
    average: '1',
  },
  gas: { send: '100000' },
};
