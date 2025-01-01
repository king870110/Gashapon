import { ThemeProvider } from "next-themes"
import { ChakraProvider } from "@chakra-ui/react"
import App from "next/app"

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider attribute="class">
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</ThemeProvider>
	)
}

export default MyApp
