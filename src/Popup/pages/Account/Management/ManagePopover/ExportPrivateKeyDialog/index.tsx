import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import type { DialogProps } from '@mui/material';

import Dialog from '~/Popup/components/common/Dialog';
import DialogHeader from '~/Popup/components/common/Dialog/Header';
import { useChromeStorage } from '~/Popup/hooks/useChromeStorage';
import { useCurrentChain } from '~/Popup/hooks/useCurrent/useCurrentChain';
import { getKeyPair } from '~/Popup/utils/common';
import { sha512 } from '~/Popup/utils/crypto';
import type { Account } from '~/types/chromeStorage';

import PrivateKeyView from './PrivateKeyView';
import { Container, StyledButton, StyledInput } from './styled';
import type { PasswordForm } from './useSchema';
import { useSchema } from './useSchema';

type ExportPrivateKeyDialogProps = Omit<DialogProps, 'children'> & { account: Account };

export default function ExportPrivateKeyDialog({ onClose, account, ...remainder }: ExportPrivateKeyDialogProps) {
  const { chromeStorage, setChromeStorage } = useChromeStorage();

  const { currentChain } = useCurrentChain();

  const { bip44 } = currentChain;

  const { accountName, encryptedPassword } = chromeStorage;

  const [password, setPassword] = useState('');

  const [privateKey, setPrivateKey] = useState('');

  const invalidNames = [...Object.values(accountName)];
  invalidNames.splice(invalidNames.indexOf(accountName[account.id], 1));

  const { passwordForm } = useSchema({ encryptedPassword: encryptedPassword! });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PasswordForm>({
    resolver: joiResolver(passwordForm),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
  });

  const submit = () => {
    const keyPair = getKeyPair(account, currentChain, password);

    setPrivateKey(keyPair?.privateKey.toString('hex') ?? '');
  };

  const handleOnClose = () => {
    onClose?.({}, 'backdropClick');
    setTimeout(() => {
      reset();
      setPassword('');
      setPrivateKey('');
    }, 200);
  };

  return (
    <Dialog {...remainder} onClose={handleOnClose}>
      {privateKey ? (
        <PrivateKeyView privateKey={privateKey} onClose={handleOnClose} />
      ) : (
        <>
          <DialogHeader onClose={handleOnClose}>View Private Key</DialogHeader>
          <Container>
            <form onSubmit={handleSubmit(submit)}>
              <StyledInput
                inputProps={register('password', {
                  setValueAs: (v: string) => {
                    setPassword(v);
                    return v ? sha512(v) : '';
                  },
                })}
                type="password"
                placeholder="Please type password to confirm"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <StyledButton type="submit" disabled={!isDirty}>
                Submit
              </StyledButton>
            </form>
          </Container>
        </>
      )}
    </Dialog>
  );
}