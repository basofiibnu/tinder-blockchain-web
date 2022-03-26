import { useState, createContext, useEffect } from 'react'
import { faker } from '@faker-js/faker'
import { useMoralis } from 'react-moralis'

export const TinderContext = createContext()

export const TinderProvider = ({ children }) => {
  const [cardData, setCardData] = useState([])
  const [currentAccount, setCurrentAccount] = useState()
  const [currentUser, setCurrentUser] = useState()
  const { authenticate, isAuthenticated, user, Moralis } = useMoralis()

  const checkWalletConnection = async () => {
    if (isAuthenticated) {
      const address = user.get('ethAddress')
      setCurrentAccount(address)
      requestToCreateUserProfile(address, faker.name.findName())
    } else {
      setCurrentAccount('')
    }
  }

  const connectWallet = async () => {
    if (!isAuthenticated) {
      try {
        await authenticate({
          signingMessage: 'Log in using Moralis',
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const disconnectWallet = async () => {
    await Moralis.User.logOut()
    setCurrentAccount('')
  }

  const requestToCreateUserProfile = async (walletAddress, name) => {
    try {
      await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userWalletAddress: walletAddress,
          name: name,
        }),
      })
    } catch (error) {
      console.log(error)
    }
  }

  const requestCurrentUserData = async (walletAddress) => {
    try {
      const response = await fetch(
        `/api/fetchCurrentUser?activeAccount=${walletAddress}`
      )
      const data = await response.json()

      setCurrentUser(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const requestUserData = async (activeAccount) => {
    try {
      const response = await fetch(
        `/api/fetchAllUser?activeAccount=${activeAccount}`
      )
      const data = await response.json()

      setCardData(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkWalletConnection()

    if (isAuthenticated) {
      requestUserData(user.get('ethAddress'))
      requestCurrentUserData(user.get('ethAddress'))
    }
  }, [isAuthenticated])

  return (
    <TinderContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        currentAccount,
        currentUser,
      }}
    >
      {children}
    </TinderContext.Provider>
  )
}
