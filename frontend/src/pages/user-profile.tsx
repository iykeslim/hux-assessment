import React, { useContext, useEffect, useRef, Fragment, useState } from "react"
import axios from "axios"
// import Image from "next/image"
import { Menu } from "primereact/menu"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"

// HELPERS
import _isEmpty from "lodash/isEmpty"
import { areAllPropertiesEmpty } from "@/helpers"; 

// RECOIL
import { useRecoilValue } from "recoil"
import { getAuthenticationStatus, getUser } from "@/store"
import { MenuItem } from "primereact/menuitem"
import { useRouter } from "next/router"

const Profile: React.FC = () => {
  const router = useRouter();
  const menuLeft = useRef<any>(null)
  const userPayload = useRecoilValue(getUser)
  const authenticationStatus = useRecoilValue(getAuthenticationStatus)

  // COMPONENT STATE
  const [visible, setVisible] = useState(false)
  const [addVisible, setAddVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [selectedContact, setSelectedContact] = useState<any>({
    _id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  })
  const [contactForm, setContactForm] = useState<any>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  })
  const [tableItems, setTableItems] = useState<MenuItem[]>([])
  const [contacts, setContacts] = useState<any[]>([])
  const [spoolingContacts, setSpoolingContacts] = useState(false)
  const [addingNewContact, setAddingNewContact] = useState(false)
  const [editingContact, setEditingContact] = useState(false)
  const [deletingContact, setDeletingContact] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const editContact = () => {
    setEditVisible(true)
  }

  const deleteContact = async () => {
    try {
      setDeletingContact(true)
      const response = await axios.delete(
        `http://localhost:5000/api/contacts/${selectedContact._id}`,
      )

      const { success, message } = response.data

      setTimeout(() => {
        setDeletingContact(false)
        setSelectedContact({})
      }, 1000)

      if (success) {
        spoolContacts()
        alert(message)
      } else {
        alert(message)
      }
    } catch (error: any) {
      setDeletingContact(false)

      console.error({ error })
      throw new Error(error)
    }
  }

  const getUserId = (): string => {
    if (userPayload) return userPayload._id
    else return ""
  }

  const getAvatarURL = (fullName: string) => {
    return `https://ui-avatars.com/api/?name=${fullName}&background=random`
  }

  const triggerContactModal = (payload: any) => {
    setVisible(true)
    setSelectedContact(payload)
  }

  const closeContactModal = () => {
    setVisible(false)
    setSelectedContact({})
  }

  const closeEditContactModal = () => {
    setEditVisible(false)
    setSelectedContact([])
  }

  const closeAddContactModal = () => {
    setAddVisible(false)
  }

  const onMenuClick = (event: any, payload: any) => {
    setSelectedContact(payload)

    setTableItems([
      {
        label: "Edit",
        icon: "pi pi-pen-to-square",
        command: editContact,
      },
      {
        label: deletingContact ? 'Deleting...' : "Delete",
        icon: "pi pi-trash",
        command: deleteContact,
      },
    ])

    menuLeft.current.toggle(event)
  }

  const spoolContacts = async () => {
    try {
      setSpoolingContacts(true)
      const response = await axios.get("http://localhost:5000/api/contacts")

      const { success, message, data } = response.data

      setTimeout(() => {
        setSpoolingContacts(false)
      }, 1000)

      console.log({ response })

      if (success) {
        setContacts(data)
      } else {
        alert(message)
      }
    } catch (error: any) {
      setSpoolingContacts(false)
      console.error({ error })
      throw new Error(error?.response?.data?.message)
    }
  }

  const addNewContact = async () => {
    try {
      setAddingNewContact(true);
      const response = await axios.post(
        "http://localhost:5000/api/contacts",
        contactForm,
      )

      const { success, message } = response.data;

      setTimeout(() => {
        closeAddContactModal();
        setAddingNewContact(false);
      }, 1000);

      if (success) {
        spoolContacts();
        alert(message);
      }
    } catch (error: any) {
      setAddingNewContact(false)

      console.error({ error });
      throw new Error(error);
    }
  }

  const updateContact = async () => {
    try {
      setEditingContact(true)
      const { firstName, lastName, phoneNumber } = selectedContact;
      const response = await axios.put(
        `http://localhost:5000/api/contacts/${selectedContact._id}`,
        {
          firstName,
          lastName,
          phoneNumber,
        },
      )

      const { success, message } = response.data

      setTimeout(() => {
        closeEditContactModal();
        setEditingContact(false)
        setSelectedContact({ })
      }, 1000)

      if (success) {
        spoolContacts()
        alert(message)
      } else {
        alert(message)
      }
    } catch (error: any) {
      setEditingContact(false)

      console.error({ error })
      throw new Error(error)
    }
  }

  const logout = async () => {
    try {
        setLoggingOut(true)
      const response = await axios.post(
        "http://localhost:5000/api/users/logout",
      )

      const { success, message } = response.data;

      setTimeout(() => {
        setLoggingOut(false);
        router.replace('/');
      }, 1000);

      if (success) {
        alert(message)
      } else {
        alert(message);
      }
    } catch (error: any) {
        setLoggingOut(false)
      console.error({ error })
      throw new Error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    spoolContacts()
  }, [])

  return (
    <Fragment>
      {authenticationStatus && !_isEmpty(userPayload) ? (
        <>
          <div className="px-7 mt-8 mb-6 flex items-center justify-between">
            <h2 className="text-blue-200 text-2xl">
              Welcome, {userPayload.firstName} {userPayload.lastName}!
            </h2>

            <button
              onClick={logout}
              type="button"
              className="py-2 px-5 flex items-center space-x-2 text-base font-medium bg-red-100 text-red-900 rounded"
            >
              {loggingOut ? <></> : <i className="pi pi-sign-out"></i>}
              <span>{loggingOut ? 'Logging out. Please wait!' : 'Logout'}</span>
            </button>
          </div>

          <div className="grid place-items-center">
            <div className="w-[96%] p-4 sm:p-6 border border-blue-200 rounded-md grid grid-cols-4">
              <div className="flex flex-col gap-y-1 text-blue-200 col-span-4 lg:col-span-1">
                <span className="font-bold text-inherit">First Name</span>
                <span className="text-inherit">{userPayload.firstName}</span>
              </div>

              <div className="flex flex-col gap-y-1 text-blue-200 col-span-4 lg:col-span-1">
                <span className="font-bold text-inherit">Last Name</span>
                <span className="text-inherit">{userPayload.lastName}</span>
              </div>

              <div className="flex flex-col gap-y-1 text-blue-200 col-span-4 lg:col-span-1">
                <span className="font-bold text-inherit">Email Address</span>
                <span className="text-inherit">{userPayload.email}</span>
              </div>

              <div className="flex flex-col gap-y-1 text-blue-200 col-span-4 lg:col-span-1">
                <span className="font-bold text-inherit">Phone Number</span>
                <span className="text-inherit">{userPayload.phoneNumber}</span>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold leading-tight text-blue-200">
                  Contacts
                </h2>

                <button
                  onClick={() => setAddVisible(true)}
                  type="button"
                  className="px-5 py-2 flex items-center bg-blue-200 text-blue-900 rounded space-x-2"
                >
                  <i className="pi pi-plus"></i>
                  <span>Add new Contact</span>
                </button>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Full Name
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Phone Number
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10 relative rounded-full overflow-hidden">
                                <img
                                  src={getAvatarURL(
                                    `${contact.firstName} ${contact.lastName}`,
                                  )}
                                  alt={"user avatar"}
                                  className="w-full h-full rounded-full"
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {`${contact.firstName} ${contact.lastName}`}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {`${contact.phoneNumber}`}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={(event) =>
                                  triggerContactModal(contact)
                                }
                                type="button"
                                className="py-2 px-4 text-xs uppercase tracking-wide font-medium text-blue-500 hover:bg-blue-50 rounded"
                              >
                                View
                              </button>
                              <button
                                onClick={(event) => onMenuClick(event, contact)}
                                type="button"
                                className="h-8 w-8 rounded-full hover:bg-blue-50 active:bg-blue-50 text-blue-500 border-none grid place-items-center"
                              >
                                <span className="material-symbols-outlined text-inherit text-[17px]">
                                  more_vert
                                </span>
                              </button>
                              <Menu
                                model={tableItems}
                                popup
                                ref={menuLeft}
                                id="popup_menu_left"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <Dialog
            header="Contact Details"
            visible={visible}
            style={{ width: "50vw" }}
            onHide={() => setVisible(false)}
          >
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full relative overflow-hidden">
                  <img
                    src={getAvatarURL(
                      `${selectedContact.firstName} ${selectedContact.lastName}`,
                    )}
                    alt={"avatar"}
                    className="w-full h-full"
                  />
                </div>

                <span>{`${selectedContact.firstName} ${selectedContact.lastName}`}</span>
              </div>

              <div className="flex">
                <span className="font-bold mr-2">Contact:</span>{" "}
                {selectedContact.phoneNumber}
              </div>
            </div>
          </Dialog>

          <Dialog
            header="Edit Contact"
            visible={editVisible}
            style={{ width: "50vw" }}
            onHide={() => setEditVisible(false)}
          >
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1 capitalize">
                  First Name
                </label>
                <input
                  required
                  defaultValue={selectedContact["firstName"]}
                  name="firstName"
                  className="w-full border p-2 focus:outline-none hover:ring-2 hover:ring-blue-500/50 border-gray rounded"
                  onChange={(e) =>
                    setSelectedContact((prev: any) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1 capitalize">
                  Last Name
                </label>
                <input
                  required
                  defaultValue={selectedContact["lastName"]}
                  name="lastName"
                  className="w-full border p-2 focus:outline-none hover:ring-2 hover:ring-blue-500/50 border-gray rounded"
                  onChange={(e) =>
                    setSelectedContact((prev: any) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1 capitalize">
                  Phone Number
                </label>
                <input
                  required
                  defaultValue={selectedContact["phoneNumber"]}
                  name="phoneNumber"
                  className="w-full border p-2 focus:outline-none hover:ring-2 hover:ring-blue-500/50 border-gray rounded"
                  onChange={(e) =>
                    setSelectedContact((prev: any) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex w-full items-center justify-between">
                <button
                  onClick={closeEditContactModal}
                  type="button"
                  className="bg-gray-500 text-gray-300 rounded py-2 px-6"
                >
                  Cancel
                </button>
                <button
                  onClick={updateContact}
                  type="button"
                  disabled={areAllPropertiesEmpty(selectedContact)}
                  className="bg-blue-500 text-blue-100 rounded py-2 px-6"
                >
                  {editingContact ? "Please wait..." : "Save"}
                </button>
              </div>
            </div>
          </Dialog>

          <Dialog
            header="Add New Contact"
            visible={addVisible}
            style={{ width: "50vw" }}
            onHide={() => setAddVisible(false)}
          >
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1 capitalize">
                  First Name
                </label>
                <input
                  required
                  name="firstName"
                  className="w-full border p-2 focus:outline-none hover:ring-2 hover:ring-blue-500/50 border-gray rounded"
                  onChange={(e) =>
                    setContactForm((prev: any) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1 capitalize">
                  Last Name
                </label>
                <input
                  required
                  name="lastName"
                  className="w-full border p-2 focus:outline-none hover:ring-2 hover:ring-blue-500/50 border-gray rounded"
                  onChange={(e) =>
                    setContactForm((prev: any) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1 capitalize">
                  Phone Number
                </label>
                <input
                  required
                  name="phoneNumber"
                  className="w-full border p-2 focus:outline-none hover:ring-2 hover:ring-blue-500/50 border-gray rounded"
                  onChange={(e) =>
                    setContactForm((prev: any) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex w-full items-center justify-between">
                <button
                  onClick={closeAddContactModal}
                  type="button"
                  className="bg-gray-500 text-gray-300 rounded py-2 px-6"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewContact}
                  type="button"
                  disabled={areAllPropertiesEmpty(contactForm)}
                  className="bg-blue-500 text-blue-100 rounded py-2 px-6"
                >
                  {addingNewContact ? "Please wait..." : "Add"}
                </button>
              </div>
            </div>
          </Dialog>
        </>
      ) : (
        <></>
      )}
    </Fragment>
  )
}

export default Profile
