import type { HTMLInputTypeAttribute } from 'react';
import { useState } from 'react';
import type { OutlinedInputProps } from '@mui/material';
import { InputAdornment, Typography } from '@mui/material';

import IconButton from '~/Popup/components/common/IconButton';

import { HelperTextContainer, StyledTextField, StyledVisibility, StyledVisibilityOff } from './styled';

type InputProps = OutlinedInputProps & {
  helperText?: string;
};

export default function Input({ type, helperText, ...remainder }: InputProps) {
  const [textFieldType, setTextFieldType] = useState<HTMLInputTypeAttribute | undefined>(type);

  return (
    <>
      <StyledTextField
        type={type === 'password' ? textFieldType : type}
        endAdornment={
          type === 'password' && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setTextFieldType((prev) => (prev === 'password' ? 'text' : 'password'));
                }}
                edge="end"
              >
                {textFieldType === 'password' ? <StyledVisibility /> : <StyledVisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }
        {...remainder}
      />
      {helperText && (
        <HelperTextContainer error={remainder.error ? 1 : 0}>
          <Typography variant="h6">{helperText}</Typography>
        </HelperTextContainer>
      )}
    </>
  );
}
