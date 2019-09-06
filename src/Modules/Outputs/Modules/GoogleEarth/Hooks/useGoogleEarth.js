import { useMachine } from '@xstate/react'
import { googleEarthMachine } from '../Machines/googleEarthMachine'

export function useGoogleEarth() {
  const [state] = useMachine(googleEarthMachine)

  const { links } = state.context
  const isLoading = state.matches('fetching.loading')

  return {
    metadata: {
      links,
      isLoading
    }
  }
}
