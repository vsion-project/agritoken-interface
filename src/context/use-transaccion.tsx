'use client'
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react"

interface TypeContext {
  isLoading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
}

const initContext: TypeContext = {
  isLoading: false,
  setLoading: () => { }
}

export const LoadingContext = createContext<TypeContext>(initContext)

const useAccionLoading = (): TypeContext => {

  const [isLoading, setLoading] = useState<boolean>(false)
  return {
    isLoading,
    setLoading
  }
}

export const LoadingProvider = (props: PropsWithChildren): JSX.Element => {
  const value = useAccionLoading()
  return (<LoadingContext.Provider value={value} > {props.children} </LoadingContext.Provider>)
}
