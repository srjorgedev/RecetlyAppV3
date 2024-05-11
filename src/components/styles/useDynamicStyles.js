import { Appearance } from "react-native"
import { useEffect, useState } from "react"
import { LightTheme, DarkTheme } from "./ColorScheme"

export default function useDynamicStyles() {
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? DarkTheme : LightTheme)

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? DarkTheme : LightTheme)
        })

        return () => subscription.remove()
    }, [])

    return theme
}