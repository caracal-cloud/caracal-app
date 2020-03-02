import { useQuery } from 'react-query'

import * as api from '../Api'

export function usePhone({ uid }) {
  const { data, loading } = useQuery([`phone ${uid}`, { uid }], api.getPhone)
  return {
    metadata: {
      phone: data && data.data,
      isLoading: loading
    }
  }
}
