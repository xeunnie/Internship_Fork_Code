import Button from '~/Popup/components/common/Button';
import { useNavigate } from '~/Popup/hooks/useNavigate';

import { BottomContainer, Container, StyledInput } from './styled';
import Description from '../components/Description';

export default function Entry() {
  const { navigate } = useNavigate();
  return (
    <form>
      <Container>
        <Description>Enter your secret phrase below to verify it is stored safely.</Description>
        <StyledInput placeholder="account name" />
        <BottomContainer>
          <Button>Next</Button>
        </BottomContainer>
      </Container>
    </form>
  );
}
