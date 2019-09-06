import { useMachine } from '@xstate/react'
import { changesMachine } from '../Machines/changesMachine'

export function useChanges() {
  const [state] = useMachine(changesMachine)

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
