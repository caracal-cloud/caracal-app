/** @jsx jsx */
import { useEffect } from 'react'

export function ArcgisCallback() {
  useEffect(() => {
    localStorage.removeItem('arcgis-connect')
    localStorage.setItem('arcgis-connect', true)
    window.close()
  }, [])
  return null
}
