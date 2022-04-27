import { MINTSCAN_URL } from '~/constants/common';
import crescentImg from '~/images/symbols/crescent.png';
import type { Coin, TendermintChain } from '~/types/chain';

export const CRESCENT: TendermintChain = {
  id: 'c4c9e553-24a2-487d-a3a9-106b0f70b4ce',
  line: 'TENDERMINT',
  type: '',
  chainId: 'crescent-1',
  chainName: 'Crescent',
  restURL: 'https://lcd-crescent.cosmostation.io',
  imageURL: crescentImg,
  baseDenom: 'ucre',
  displayDenom: 'cre',
  decimals: 6,
  bip44: {
    purpose: "44'",
    coinType: "118'",
    account: "0'",
    change: '0',
  },
  bech32Prefix: { address: 'cre' },
  explorerURL: `${MINTSCAN_URL}/crescent`,
  gasRate: {
    tiny: '0.01',
    low: '0.02',
    average: '0.1',
  },
  gas: { send: '100000' },
};

const imageURL = 'https://raw.githubusercontent.com/cosmostation/cosmostation_token_resource/master/coin_image';

export const CRESCENT_COINS: Coin[] = [
  {
    baseDenom: 'ubcre',
    decimals: 6,
    displayDenom: 'bcre',
    imageURL: `${imageURL}/tokens/token-bcre.svg`,
  },
];
