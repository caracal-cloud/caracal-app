import qs from 'query-string'

export function useQueryString(location) {
  return qs.parse(location.search)
}
