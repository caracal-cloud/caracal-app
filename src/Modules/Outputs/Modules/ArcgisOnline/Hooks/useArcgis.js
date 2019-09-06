import { useMachine } from '@xstate/react'
import { arcgisMachine } from '../Machines/arcgisMachine'

export function useArcgis() {
  const [state, send] = useMachine(arcgisMachine)

  const { url, status, data } = state.context
  const isOffline = status === 'offline'
  const isOnline = status === 'online'
  const isChecking = state.matches('checking.loading')
  const isLoading = state.matches('loadingIframeUrl.loading')
  const isWaiting = state.matches('waitingAuth')
  const isConnecting = state.matches('connecting.loading')
  const isDisconnecting = state.matches('disconnecting.loading')

  function handleConnect() {
    send('CONNECT')
  }

  function handleDisconnect() {
    send('DISCONNECT')
  }

  return {
    handleConnect,
    handleDisconnect,
    metadata: {
      isOnline,
      isOffline,
      isChecking,
      isLoading,
      isWaiting,
      isConnecting,
      isDisconnecting,
      status,
      url,
      data
    }
  }
}
