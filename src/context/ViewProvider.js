import { createContext, useEffect, useCallback } from 'react'
import { initialState } from './initialState.js'
import { reducer } from '../reducers'

/* Additional Imports */

export const ViewContext = createContext(initialState)

/* Num Format Utilities */

export const ViewProvider = ({ children }) => {
  /* Top Level Code */

  const setAccount = useCallback(async (accounts) => {
    /* setAccount callback */
  }, [])

  const connectUser = useCallback(async () => {
    /* connectUser callback */
  }, [])

  useEffect(() => {
    /* connectUser Effect */
  }, [])

  /* Destructure State */

  /* connect function */

  return (
    <ViewContext.Provider 
      value={{
        /* Provider State Values */
      }}
    >
      {children}
    </ViewContext.Provider>
  )
}
