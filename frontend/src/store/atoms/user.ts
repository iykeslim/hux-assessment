import { atom } from "recoil";

// SERVICES
import { StorageService } from "@/service"

const storage = new StorageService();

const localPersist = ({
  onSet,
  setSelf,
  node,
}: {
  onSet: any
  setSelf: any
  node: any
}) => {
  const storedData = storage.getItem(node.key)
  if (storedData != null) {
    setSelf(JSON.parse(storedData))
  }
  onSet((newData: any, _: any, isReset: any) => {
    isReset
      ? storage.clearItem(node.key)
      : storage.setItem(node.key, JSON.stringify(newData))
  })
}

export const userAtom = atom({
  key: "userState",
  default: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    isAuthenticated: false,
  },
  // effects: [localPersist]
})

