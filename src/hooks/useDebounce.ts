import { useState, useEffect, useRef } from "react";


export default function useDebounce<T>(value: T, delay?: number): T {
  const [valueDebounce, setValueDebounce] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setValueDebounce(value)
    }, delay || 500)
    return () => clearTimeout(timer)
  }, [value, delay])

  return valueDebounce
}