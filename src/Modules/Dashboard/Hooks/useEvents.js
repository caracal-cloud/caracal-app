import { useMachine } from '@xstate/react'
import { eventsMachine } from '../Machines/eventsMachine'

export function useEvents() {
  const [state] = useMachine(eventsMachine)

  const { data } = state.context
  const isLoading = state.matches('fetching.loading')
  const isEmpty = !isLoading && data && !data.length

  return {
    metadata: {
      data,
      isLoading,
      isEmpty
    }
  }
}
