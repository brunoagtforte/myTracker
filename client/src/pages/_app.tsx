import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import ThemeSwitcher from '../components/themeSwitcher/ThemeSwitcher'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className='container'>
            <NextUIProvider>
                <NextThemesProvider attribute='class' defaultTheme='light'>
                    <ThemeSwitcher />
                    <Component {...pageProps} />
                </NextThemesProvider>
            </NextUIProvider>
        </div>
    )
}
