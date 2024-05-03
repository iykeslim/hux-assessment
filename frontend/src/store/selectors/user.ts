import { selector } from "recoil"
import { userAtom } from "../atoms"

export const getUser = selector({
  key: "getUser",
  get: ({ get }) => {
    const { _id, firstName, lastName, email, phoneNumber } = get(userAtom)

    return {
      _id,
      email,
      firstName,
      lastName,
      phoneNumber,
    }
  },
})

export const getAuthenticationStatus = selector({
  key: "getAuthenticationStatus",
  get: ({ get }) => {
    const { isAuthenticated } = get(userAtom)
    return isAuthenticated
  },
})
