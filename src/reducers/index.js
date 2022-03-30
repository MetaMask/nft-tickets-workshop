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
      default: break
    }
  }
