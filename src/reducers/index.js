export const reducer = (state, action) => {
    switch (action.type) {
      case 'CONNECTED_PROVIDER': {
        state.provider = action.payload.provider
        state.signer = action.payload.signer
        state.name = action.payload.name
        state.chainId = action.payload.chainId
        state.foxcon2022 = action.payload.foxcon2022
        return
      }

      case 'SET_ACCOUNT': {
        state.user = action.payload
        state.isLoading = false
        state.isConnected = true
        return
      }

      case 'SET_LOADING': {
        state.isLoading = action.payload
        return
      }

      case 'CONNECTED_NETWORK': {
        state.chainId = action.payload
        return
      }

      case 'CONNECTED_SIGNER': {
        state.signer = action.payload
        return
      }

      case 'REGISTERED': {
        state.isRegistered = action.payload
        return
      }

      case 'SET_CLAIMED': {
        state.claimed = action.payload
        return
      }

      case 'DISCONNECT_ACCOUNT': {
        state = action.payload
        return
      }

      default: break
    }
  }
