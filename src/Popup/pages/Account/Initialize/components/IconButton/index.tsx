import { Typography } from '@mui/material';

import { ImageContainer, StyledButton, TextContainer } from './styled';

type IconButtonProps = Omit<React.ComponentType<typeof StyledButton>, 'children'> & {
  Icon?: SvgElement;
  children?: string;
};

export default function IconButton({ Icon, children, ...remainder }: IconButtonProps) {
  return (
    <StyledButton {...remainder}>
      <ImageContainer>
        <Icon />
      </ImageContainer>
      <TextContainer>
        <Typography variant="h4">{children}</Typography>
      </TextContainer>
    </StyledButton>
  );
}
