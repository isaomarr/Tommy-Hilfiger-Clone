import { useEffect, useRef, useState } from "react";

const useScrollDirection = () => {
    const [showNavbar, setShowNavbar] = useState(true)
    const lastScrollY = useRef(0)
    
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY.current && currentScrollY > 80){
                setShowNavbar(false)
            } else {
                setShowNavbar(true)
            }
            lastScrollY.current = currentScrollY
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return showNavbar
}
export default useScrollDirection