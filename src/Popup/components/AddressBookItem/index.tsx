import { useState } from 'react';
import { Typography } from '@mui/material';

import { CHAINS } from '~/constants/chain';
import type { AddressInfo } from '~/types/chromeStorage';

import ManagePopover from './ManagePopover';
import { AddressContainer, Container, LabelContainer, LabelLeftContainer, LabelRightContainer, MemoContainer, StyledButton, StyledImage } from './styled';

import Add24Icon from '~/images/icons/Add24.svg';

type AddressBookItemProps = {
  addressInfo: AddressInfo;
};

export default function AddressBookItem({ addressInfo }: AddressBookItemProps) {
  const { address, memo, label, chainId } = addressInfo;

  const chain = CHAINS.find((item) => item.id === chainId);

  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpenPopover = Boolean(popoverAnchorEl);

  return (
    <Container>
      <LabelContainer>
        <LabelLeftContainer>
          <StyledImage src={chain?.imageURL} />
          <Typography variant="h6">{label}</Typography>
        </LabelLeftContainer>
        <LabelRightContainer>
          <StyledButton
            data-is-active={isOpenPopover ? 1 : 0}
            onClick={(event) => {
              setPopoverAnchorEl(event.currentTarget);
            }}
          >
            <Add24Icon />
          </StyledButton>
        </LabelRightContainer>
      </LabelContainer>
      <AddressContainer>
        <Typography variant="h6">{address}</Typography>
      </AddressContainer>
      {memo && (
        <MemoContainer>
          <Typography variant="h6">{memo}</Typography>
        </MemoContainer>
      )}

      <ManagePopover
        addressInfo={addressInfo}
        marginThreshold={0}
        open={isOpenPopover}
        onClose={() => {
          setPopoverAnchorEl(null);
        }}
        anchorEl={popoverAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      />
    </Container>
  );
}
