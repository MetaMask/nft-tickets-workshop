import React, { createContext, useEffect, useCallback } from 'react'
import { useImmerReducer } from 'use-immer'
import { ethers } from 'ethers'

import { initialState } from './initialState.js'
import { reducer } from '../reducers'

import foxcon2022Abi from '../lib/Foxcon2022.json'

export const ViewContext = createContext(initialState)

//utils
export const bigNumberify = (amt) => {
  return ethers.utils.parseEther(amt)
}
export const smolNumberify = (amt, decimals = 18) => {
  return parseFloat(ethers.utils.formatUnits(amt, decimals))
}
//utils

export const ViewProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  const foxcon2022Address = process.env.REACT_APP_CONTRACT_ADDRESS

  const setAccount = useCallback(async (accounts) => {
    if (accounts.length > 0) {
      try {
        const connectedAccount = {
          address: accounts[0],
        }
        dispatch({ type: 'SET_ACCOUNT', payload: connectedAccount })
      } catch (e) {
        console.log(e)
      }
    } else {
      dispatch({ type: 'SET_ACCOUNT', payload: initialState.user })
    }
  }, [dispatch])

  const connectUser = useCallback(async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      if (provider) {
        const signer = await provider.getSigner()
        const { name, chainId } = await provider.getNetwork()
        const foxcon2022 = new ethers.Contract(foxcon2022Address, foxcon2022Abi.abi, signer)
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        setAccount(accounts)
        dispatch({
          type: 'CONNECTED_PROVIDER',
          payload: {
            provider,
            signer,
            chainId,
            name,
            foxcon2022
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }, [setAccount, dispatch])

  useEffect(() => {
    if (window.ethereum) {
      connectUser()
      window.ethereum.on('accountsChanged', () => {
        connectUser()
      })
      window.ethereum.on('chainChanged', () => {
        connectUser()
      })
      window.ethereum.on('disconnect', () => {
        dispatch({ type: 'SET_ACCOUNT', payload: initialState.user })
      })
    }
  }, [connectUser, dispatch])

  const { foxcon2022, isConnected, name, chainId, provider, user } = state

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ViewContext.Provider
      value={{
        state,
        dispatch,
        foxcon2022,
        isConnected,
        provider,
        user,
        name,
        chainId,
        actions: { connect }
      }}>
      {children}
    </ViewContext.Provider>
  )
}
