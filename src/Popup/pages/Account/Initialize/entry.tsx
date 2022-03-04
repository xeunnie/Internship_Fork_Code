import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

import { useNavigate } from '~/Popup/hooks/useNavigate';
import { newAccountState } from '~/Popup/recoils/newAccount';

import IconButton from './components/IconButton';
import { ButtonContainer, Container, LogoContainer, LogoImageContainer, LogoTextContainer } from './styled';

import Cosmostation21Icon from '~/images/icons/Cosmostation21.svg';
import CreateAccount28Icon from '~/images/icons/CreateAccount28.svg';
import Import28Icon from '~/images/icons/Import28.svg';
import Logo40Icon from '~/images/icons/Logo40.svg';

export default function Entry() {
  const { navigate } = useNavigate();

  const resetNewAccount = useResetRecoilState(newAccountState);

  useEffect(() => {
    resetNewAccount();
  }, [resetNewAccount]);
  return (
    <Container>
      <LogoContainer>
        <LogoImageContainer>
          <Logo40Icon />
        </LogoImageContainer>
        <LogoTextContainer>
          <Cosmostation21Icon />
        </LogoTextContainer>
      </LogoContainer>
      <ButtonContainer>
        <IconButton Icon={CreateAccount28Icon}>Create account</IconButton>
        <IconButton Icon={Import28Icon}>Import account</IconButton>
      </ButtonContainer>
    </Container>
  );
}
