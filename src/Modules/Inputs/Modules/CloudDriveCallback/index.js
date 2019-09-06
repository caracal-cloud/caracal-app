/** @jsx jsx */
import { useEffect } from 'react'

export function CloudDriveCallback() {
  useEffect(() => {
    localStorage.removeItem('cloud-drive-auth')
    localStorage.setItem('cloud-drive-auth', true)
    window.close()
  }, [])
  return null
}
