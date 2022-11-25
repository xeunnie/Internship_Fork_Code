import { Typography } from '@mui/material';

import Image from '~/Popup/components/common/Image';

import { LeftContainer, LeftImageContainer, LeftTextChainContainer, LeftTextContainer, RightContainer, StyledButton } from './styled';

import Check24Icon from '~/images/icons/Check24.svg';

type TokenItemProps = {
  // name: string;
  symbol: string;
  logo?: string;
  onClick?: () => void;
  isActive: boolean;
};

export default function TokenItem({ onClick, isActive, symbol, logo }: TokenItemProps) {
  return (
    <StyledButton type="button" onClick={onClick}>
      <LeftContainer>
        <LeftImageContainer>
          <Image src={logo} />
        </LeftImageContainer>
        <LeftTextContainer>
          <LeftTextChainContainer>
            <Typography variant="h5"> {symbol} </Typography>
            {/* <Typography variant="h6" color="#727E91">
              {name}
            </Typography> */}
          </LeftTextChainContainer>
        </LeftTextContainer>
      </LeftContainer>
      <RightContainer>{isActive && <Check24Icon />}</RightContainer>
    </StyledButton>
  );
}
