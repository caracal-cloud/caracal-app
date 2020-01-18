import * as R from 'ramda'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import * as authApi from 'Modules/Auth/Api'

export function useInputsMenuItems() {
  const { data: res } = useQuery('getAccountStatus', authApi.getAccountStatus)
  const [menuItems, setMenuItems] = useState([
    { text: 'Collars', to: '/inputs/collars' },
    { text: 'Cloud Drives', to: '/inputs/cloud-drive' },
    { text: 'Radios', to: '/inputs/radios' }
  ])

  useEffect(() => {
    const enabled = R.path(['data', 'isJackalEnabled'], res)
    console.log(enabled)
    if (enabled) {
      setMenuItems([...menuItems, { text: 'Jackal', to: '/inputs/jackal' }])
    }
  }, [menuItems, res])

  return menuItems
}
