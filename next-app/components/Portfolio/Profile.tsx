import { useAccount, useConnect, useDisconnect } from 'wagmi'

import { SignMessage } from '../Wallet/SignMessage'

export function Profile() {
  const { isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        Whatttt The hElls
        <SignMessage />
      </div>
    )
  }

  return <div>Sign Carefully! Ghost here!</div>
}
