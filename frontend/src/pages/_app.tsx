import React from "react"
import { AppProps } from "next/app"
import { RecoilRoot } from "recoil";


import { PrimeReactProvider } from "primereact/api"
        

import "@/styles/globals.css"
import "primeicons/primeicons.css"
import "primereact/resources/themes/saga-blue/theme.css"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <PrimeReactProvider>
        <Component {...pageProps} />
      </PrimeReactProvider>
    </RecoilRoot>
  )
}

export default App
