import { useState, useEffect } from 'react'

// Define general type for useWindowSize hook, which includes width and height
interface Size {
  width: number | undefined

  height: number | undefined
}

type WindowSizeReturns = {
  windowSize: Size
  breakpoint: string
}

function useWindowSize(): WindowSizeReturns {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  })
  const [breakpoint, setBreakpoint] = useState<string>('')

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      if (window.innerWidth > 640) {
        setBreakpoint('md')
      } else if (window.innerWidth > 768) {
        setBreakpoint('lg')
      } else if (window.innerWidth > 1024) {
        setBreakpoint('xl')
      } else if (window.innerWidth > 1280) {
        setBreakpoint('2xl')
      } else {
        setBreakpoint('sm')
      }
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return { windowSize, breakpoint }
}

export default useWindowSize