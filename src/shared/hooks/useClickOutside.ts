import { useEffect } from 'react'

export function useClickOutside(ref, handler) {
    useEffect(() => {
        const listener = event => {
            if (!ref.current || ref.current.contains(event.target)) {
                return
            } else {
                handler(event)
            }
            if (ref.current && !ref.current.contains(event.target)) {
                handler(event)
            }
        }
        // document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)
        document.addEventListener('click', listener)
        return () => {
            // document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
            document.removeEventListener('click', listener)
        }
    }, [ref, handler])
}
