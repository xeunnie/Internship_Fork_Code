import { useEffect, useRef } from 'react';
import { Typography } from '@mui/material';

import Image from '~/Popup/components/common/Image';
import SettingAccordion from '~/Popup/components/SettingAccordion';
import { useChromeStorage } from '~/Popup/hooks/useChromeStorage';
import { useCurrentAccount } from '~/Popup/hooks/useCurrent/useCurrentAccount';
import { getSiteIconURL } from '~/Popup/utils/common';

import {
  Container,
  ListContainer,
  OriginItemContainer,
  OriginItemImageContainer,
  OriginItemLeftContainer,
  OriginItemTextContainer,
  OriginListContainer,
  StyledIconButton,
} from './styled';

import Close16Icon from '~/images/icons/Close16.svg';

export default function Entry() {
  const { chromeStorage, setChromeStorage } = useChromeStorage();

  const ref = useRef<HTMLDivElement>(null);

  const { accounts, accountName, allowedOrigins, autoSigns } = chromeStorage;

  const { currentAccount } = useCurrentAccount();

  const accountsWithName = accounts.map((account) => ({ ...account, name: accountName[account.id] }));

  useEffect(() => {
    setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0);
  }, []);

  return (
    <Container>
      <ListContainer>
        {accountsWithName.map((account) => {
          const accountAllowedOrigins = allowedOrigins.filter((origin) => origin.accountId === account.id);

          if (accountAllowedOrigins.length === 0) {
            return null;
          }

          const isCurrentAccount = currentAccount.id === account.id;

          return (
            <SettingAccordion key={account.id} account={account} defaultExpanded={isCurrentAccount} ref={isCurrentAccount ? ref : undefined}>
              <OriginListContainer>
                {accountAllowedOrigins.map((origin) => {
                  const faviconURL = (() => {
                    try {
                      return getSiteIconURL(new URL(origin.origin).host);
                    } catch {
                      return undefined;
                    }
                  })();
                  return (
                    <OriginItemContainer key={`${origin.accountId}-${origin.origin}`}>
                      <OriginItemLeftContainer>
                        {faviconURL && (
                          <OriginItemImageContainer>
                            <Image src={faviconURL} />
                          </OriginItemImageContainer>
                        )}
                        <OriginItemTextContainer>
                          <Typography variant="h6">{origin.origin}</Typography>
                        </OriginItemTextContainer>
                      </OriginItemLeftContainer>
                      <StyledIconButton
                        onClick={async () => {
                          const newAllowedOrigins = allowedOrigins.filter((item) => !(origin.accountId === item.accountId && origin.origin === item.origin));
                          await setChromeStorage('allowedOrigins', newAllowedOrigins);

                          const newAutoSigns = autoSigns.filter((autoSign) => !(autoSign.accountId === origin.accountId && autoSign.origin === origin.origin));
                          await setChromeStorage('autoSigns', newAutoSigns);
                        }}
                      >
                        <Close16Icon />
                      </StyledIconButton>
                    </OriginItemContainer>
                  );
                })}
              </OriginListContainer>
            </SettingAccordion>
          );
        })}
      </ListContainer>
    </Container>
  );
}
