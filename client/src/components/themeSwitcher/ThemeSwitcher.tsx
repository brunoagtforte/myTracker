import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/20/solid'

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme()
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, []) // Adicionando uma dependência vazia para garantir que useEffect seja chamado apenas uma vez

    if (!hasMounted) return null

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label='Toggle Dark Mode'
            type='button'
            className='h-4 w-4'
        >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
    )
}

export default ThemeSwitcher
