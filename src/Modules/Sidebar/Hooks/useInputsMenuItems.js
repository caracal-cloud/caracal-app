import * as R from 'ramda'
import { useQuery } from 'react-query'

import * as authApi from 'Modules/Auth/Api'

export function useInputsMenuItems() {
  const { data: res } = useQuery('getAccountStatus', authApi.getAccountStatus)
  const enabled = R.path(['data', 'isJackalEnabled'], res)
  const menuItems = [
    { text: 'Collars', to: '/inputs/collars' },
    { text: 'Cloud Drives', to: '/inputs/cloud-drive' },
    // { text: 'Radios', to: '/inputs/radios' }
    { text: 'REST API', to: '/inputs/rest-api' }
  ]

  return enabled
    ? [...menuItems, { text: 'Jackal', to: '/inputs/jackal' }]
    : menuItems
}
