import { Suspense } from 'react';
import copy from 'copy-to-clipboard';
import { useSnackbar } from 'notistack';
import { Typography } from '@mui/material';

import cosmosImg from '~/images/symbols/cosmos.png';
import AddressButton from '~/Popup/components/AddressButton';
import Button from '~/Popup/components/common/Button';
import Image from '~/Popup/components/common/Image';
import Number from '~/Popup/components/common/Number';
import Skeleton from '~/Popup/components/common/Skeleton';
import { useAccounts } from '~/Popup/hooks/SWR/cache/useAccounts';
import { useAmountSWR } from '~/Popup/hooks/SWR/tendermint/useAmountSWR';
import { useCoinGeckoPriceSWR } from '~/Popup/hooks/SWR/useCoinGeckoPriceSWR';
import { useChromeStorage } from '~/Popup/hooks/useChromeStorage';
import { useCurrentAccount } from '~/Popup/hooks/useCurrent/useCurrentAccount';
import { useCurrentChain } from '~/Popup/hooks/useCurrent/useCurrentChain';
import { times, toDisplayDenomAmount } from '~/Popup/utils/big';
import type { TendermintChain } from '~/types/chain';

import {
  ButtonCenterContainer,
  ButtonContainer,
  Container,
  FirstLineContainer,
  FirstLineLeftContainer,
  FirstLineRightContainer,
  FourthLineContainer,
  FourthLineContainerItem,
  FourthLineContainerItemLeft,
  FourthLineContainerItemRight,
  SecondLineContainer,
  SecondLineLeftContainer,
  SecondLineLeftImageContainer,
  SecondLineLeftTextContainer,
  SecondLineRightContainer,
  StyledIconButton,
  ThirdLineContainer,
} from './styled';

import ExplorerIcon from '~/images/icons/Explorer.svg';
import ReceiveIcon from '~/images/icons/Receive.svg';
import SendIcon from '~/images/icons/Send.svg';

type TendermintNativeChainCardProps = {
  chain: TendermintChain;
};

export default function TendermintNativeChainCard({ chain }: TendermintNativeChainCardProps) {
  const { currentAccount } = useCurrentAccount();
  const { chromeStorage } = useChromeStorage();
  const accounts = useAccounts(true);
  const { totalAmount, delegationAmount, rewardAmount, unbondingAmount, vestingNotDelegate, vestingRelatedAvailable } = useAmountSWR(chain, true);
  const { data } = useCoinGeckoPriceSWR();

  const { enqueueSnackbar } = useSnackbar();

  const { decimals, coinGeckoId, explorerURL } = chain;

  const price = (coinGeckoId && data?.[coinGeckoId]?.[chromeStorage.currency]) || 0;

  const displayAmount = toDisplayDenomAmount(totalAmount, decimals);

  const value = times(displayAmount, price, 2);

  const currentAddress = accounts?.data?.find((account) => account.id === currentAccount.id)?.address?.[chain.id] || '';

  const handleOnClickCopy = () => {
    if (copy(currentAddress)) {
      enqueueSnackbar(`copied!`);
    }
  };

  return (
    <Container>
      <FirstLineContainer>
        <FirstLineLeftContainer>
          <AddressButton onClick={handleOnClickCopy}>{currentAddress}</AddressButton>
        </FirstLineLeftContainer>
        <FirstLineRightContainer>
          {explorerURL && (
            <StyledIconButton onClick={() => window.open(`${explorerURL}/account/${currentAddress}`)}>
              <ExplorerIcon />
            </StyledIconButton>
          )}
        </FirstLineRightContainer>
      </FirstLineContainer>
      <SecondLineContainer>
        <SecondLineLeftContainer>
          <SecondLineLeftImageContainer>
            <Image src={chain.imageURL} />
          </SecondLineLeftImageContainer>
          <SecondLineLeftTextContainer>
            <Typography variant="h3">{chain.displayDenom.toUpperCase()}</Typography>
          </SecondLineLeftTextContainer>
        </SecondLineLeftContainer>
        <SecondLineRightContainer>
          <Number fixed={6}>{displayAmount}</Number>
        </SecondLineRightContainer>
      </SecondLineContainer>
      <ThirdLineContainer>
        <Number typoOfIntegers="h5n" typoOfDecimals="h7n" fixed={2} currency={chromeStorage.currency}>
          {value}
        </Number>
      </ThirdLineContainer>
      <FourthLineContainer>
        <FourthLineContainerItem>
          <FourthLineContainerItemLeft>
            <Typography variant="h6">Available</Typography>
          </FourthLineContainerItemLeft>
          <FourthLineContainerItemRight>
            <Number typoOfIntegers="h5n" typoOfDecimals="h7n" fixed={6}>
              {toDisplayDenomAmount(vestingRelatedAvailable, decimals)}
            </Number>
          </FourthLineContainerItemRight>
        </FourthLineContainerItem>
        <FourthLineContainerItem>
          <FourthLineContainerItemLeft>
            <Typography variant="h6">Delegated</Typography>
          </FourthLineContainerItemLeft>
          <FourthLineContainerItemRight>
            <Number typoOfIntegers="h5n" typoOfDecimals="h7n" fixed={6}>
              {toDisplayDenomAmount(delegationAmount, decimals)}
            </Number>
          </FourthLineContainerItemRight>
        </FourthLineContainerItem>
        <FourthLineContainerItem>
          <FourthLineContainerItemLeft>
            <Typography variant="h6">Unbonding</Typography>
          </FourthLineContainerItemLeft>
          <FourthLineContainerItemRight>
            <Number typoOfIntegers="h5n" typoOfDecimals="h7n" fixed={6}>
              {toDisplayDenomAmount(unbondingAmount, decimals)}
            </Number>
          </FourthLineContainerItemRight>
        </FourthLineContainerItem>
        <FourthLineContainerItem>
          <FourthLineContainerItemLeft>
            <Typography variant="h6">Reward</Typography>
          </FourthLineContainerItemLeft>
          <FourthLineContainerItemRight>
            <Number typoOfIntegers="h5n" typoOfDecimals="h7n" fixed={6}>
              {toDisplayDenomAmount(rewardAmount, decimals)}
            </Number>
          </FourthLineContainerItemRight>
        </FourthLineContainerItem>
        <FourthLineContainerItem>
          <FourthLineContainerItemLeft>
            <Typography variant="h6">Vesting</Typography>
          </FourthLineContainerItemLeft>
          <FourthLineContainerItemRight>
            <Number typoOfIntegers="h5n" typoOfDecimals="h7n" fixed={6}>
              {toDisplayDenomAmount(vestingNotDelegate, decimals)}
            </Number>
          </FourthLineContainerItemRight>
        </FourthLineContainerItem>
      </FourthLineContainer>
      <ButtonContainer>
        <Button Icon={SendIcon} typoVarient="h5">
          Send
        </Button>
        <ButtonCenterContainer />
        <Button Icon={ReceiveIcon} typoVarient="h5">
          Receive
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export function TendermintNativeChainCardSkeleton({ chain }: TendermintNativeChainCardProps) {
  return (
    <Container>
      <FirstLineContainer>
        <FirstLineLeftContainer>
          <Skeleton width="12rem" height="2.4rem" />
        </FirstLineLeftContainer>
        <FirstLineRightContainer>
          <StyledIconButton>
            <ExplorerIcon />
          </StyledIconButton>
        </FirstLineRightContainer>
      </FirstLineContainer>
      <SecondLineContainer>
        <SecondLineLeftContainer>
          <SecondLineLeftImageContainer>
            <Image src={chain.imageURL} />
          </SecondLineLeftImageContainer>
          <SecondLineLeftTextContainer>
            <Typography variant="h3">{chain.displayDenom.toUpperCase()}</Typography>
          </SecondLineLeftTextContainer>
        </SecondLineLeftContainer>
        <SecondLineRightContainer>
          <Skeleton width="12rem" height="2.6rem" />
        </SecondLineRightContainer>
      </SecondLineContainer>
      <ThirdLineContainer>
        <Skeleton width="8rem" height="1.9rem" />
      </ThirdLineContainer>
      <FourthLineContainer>
        <FourthLineContainerItem>
          <FourthLineContainerItemLeft>
            <Typography variant="h6">Available</Typography>
          </FourthLineContainerItemLeft>
          <FourthLineContainerItemRight>
            <Skeleton width="8rem" height="1.9rem" />
          </FourthLineContainerItemRight>
        </FourthLineContainerItem>
        <FourthLineContainerItem>
          <FourthLineContainerItemLeft>
            <Typography variant="h6">Delegated</Typography>
          </FourthLineContainerItemLeft>
          <FourthLineContainerItemRight>
            <Skeleton width="8rem" height="1.9rem" />
          </FourthLineContainerItemRight>
        </FourthLineContainerItem>
        <FourthLineContainerItem>
          <FourthLineContainerItemLeft>
            <Typography variant="h6">Unbonding</Typography>
          </FourthLineContainerItemLeft>
          <FourthLineContainerItemRight>
            <Skeleton width="8rem" height="1.9rem" />
          </FourthLineContainerItemRight>
        </FourthLineContainerItem>
        <FourthLineContainerItem>
          <FourthLineContainerItemLeft>
            <Typography variant="h6">Reward</Typography>
          </FourthLineContainerItemLeft>
          <FourthLineContainerItemRight>
            <Skeleton width="8rem" height="1.9rem" />
          </FourthLineContainerItemRight>
        </FourthLineContainerItem>
        <FourthLineContainerItem>
          <FourthLineContainerItemLeft>
            <Typography variant="h6">Vesting</Typography>
          </FourthLineContainerItemLeft>
          <FourthLineContainerItemRight>
            <Skeleton width="8rem" height="1.9rem" />
          </FourthLineContainerItemRight>
        </FourthLineContainerItem>
      </FourthLineContainer>
      <ButtonContainer>
        <Button Icon={SendIcon} typoVarient="h5" disabled>
          Send
        </Button>
        <ButtonCenterContainer />
        <Button Icon={ReceiveIcon} typoVarient="h5" disabled>
          Receive
        </Button>
      </ButtonContainer>
    </Container>
  );
}