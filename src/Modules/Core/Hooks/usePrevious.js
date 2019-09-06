import { useEffect, useRef } from 'react'

export const usePrevious = (value, defaultValue) => {
  const ref = useRef(defaultValue)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
