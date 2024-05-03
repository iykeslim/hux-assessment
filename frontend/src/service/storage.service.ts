export class StorageService {
  private storage: Storage | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.storage = localStorage
    }
  }

  setItem(key: string, value: any): void {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value))
    } else {
      console.warn("Storage is not available on the server.")
      // Handle or log the situation where storage is not available (e.g., use an alternative approach).
    }
  }

  getItem(key: string): any {
    if (this.storage) {
      const storedValue = this.storage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : null
    } else {
      console.warn("Storage is not available on the server.")
      return null // Return null or handle the situation where storage is not available.
    }
  }

  clearItem(key: string): void {
    if (this.storage) {
      this.storage.removeItem(key)
    } else {
      console.warn("Storage is not available on the server.")
      // Handle or log the situation where storage is not available (e.g., use an alternative approach).
    }
  }

  // Additional methods for sessionStorage
  setSessionItem(key: string, value: any): void {
    if (typeof window !== "undefined") {
      this.storage = sessionStorage
      this.storage.setItem(key, JSON.stringify(value))
    } else {
      console.warn("sessionStorage is not available on the server.")
      // Handle or log the situation where sessionStorage is not available.
    }
  }

  getSessionItem(key: string): any {
    if (typeof window !== "undefined") {
      this.storage = sessionStorage
      const storedValue = this.storage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : null
    } else {
      console.warn("sessionStorage is not available on the server.")
      return null // Return null or handle the situation where sessionStorage is not available.
    }
  }

  clearSessionItem(key: string): void {
    if (typeof window !== "undefined") {
      this.storage = sessionStorage
      this.storage.removeItem(key)
    } else {
      console.warn("sessionStorage is not available on the server.")
      // Handle or log the situation where sessionStorage is not available.
    }
  }
}
