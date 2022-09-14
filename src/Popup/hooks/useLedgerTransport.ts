import { useRef } from 'react';
import type Transport from '@ledgerhq/hw-transport';

import { createTransport } from '~/Popup/utils/ledger';

import { useChromeStorage } from './useChromeStorage';

export function useLedgerTransport() {
  const transport = useRef<Transport | undefined>(undefined);

  const { chromeStorage } = useChromeStorage();

  const { ledgerTransportType } = chromeStorage;

  return {
    transport: transport.current,
    createTransport: async () => {
      if (transport.current) {
        return transport.current;
      }
      // eslint-disable-next-line no-return-assign
      return (transport.current = await createTransport(ledgerTransportType));
    },
    closeTransport: async () => {
      await transport.current?.close();
      transport.current = undefined;
    },
  };
}
