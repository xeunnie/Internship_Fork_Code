import { Suspense } from 'react';

import { COSMOS_CHAINS } from '~/constants/chain';
import Lock from '~/Popup/components/Lock';
import AccessRequest from '~/Popup/components/requests/AccessRequest';
import ActivateChainRequest from '~/Popup/components/requests/ActivateChainRequest';
import LedgerPublicKeyRequest from '~/Popup/components/requests/LedgerPublicKeyRequest';
import { useCurrentAdditionalChains } from '~/Popup/hooks/useCurrent/useCurrentAdditionalChains';
import { useCurrentQueue } from '~/Popup/hooks/useCurrent/useCurrentQueue';
import type { Queue } from '~/types/chromeStorage';
import type { CosSignAmino } from '~/types/message/cosmos';

import Entry from './entry';
import Layout from './layout';

export default function AddChain() {
  const { currentQueue } = useCurrentQueue();
  const { currentCosmosAdditionalChains } = useCurrentAdditionalChains();

  if (currentQueue && isCosSignAmino(currentQueue)) {
    const selecteChain = [...COSMOS_CHAINS, ...currentCosmosAdditionalChains].find((item) => item.chainName === currentQueue.message.params.chainName);

    if (selecteChain) {
      return (
        <Lock>
          <LedgerPublicKeyRequest>
            <AccessRequest>
              <ActivateChainRequest>
                <Layout>
                  <Suspense fallback={null}>
                    <Entry queue={currentQueue} chain={selecteChain} />
                  </Suspense>
                </Layout>
              </ActivateChainRequest>
            </AccessRequest>
          </LedgerPublicKeyRequest>
        </Lock>
      );
    }
  }

  return null;
}

function isCosSignAmino(queue: Queue): queue is Queue<CosSignAmino> {
  return queue?.message?.method === 'cos_signAmino' || queue?.message?.method === 'ten_signAmino';
}
