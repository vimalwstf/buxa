// hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

// Custom hook for using localStorage with type safety
function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store the value
  const [storedValue, setStoredValue] = useState<T | undefined>(undefined);

  // Get the value from localStorage
  const getStoredValue = (): T | undefined => {
    if (typeof window === "undefined") return undefined; // Prevent server-side rendering issues

    try {
      const item = window.localStorage.getItem(key);
      // Parse the stored item or return initial value if not found
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key", key, error);
      return initialValue; // Return fallback value if there's an error
    }
  };

  // Set value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Determine the value to store
      const valueToStore =
        value instanceof Function ? value(storedValue as T) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error setting localStorage key", key, error);
    }
  };

  // Effect to run once when the component mounts, to load the stored value
  useEffect(() => {
    setStoredValue(getStoredValue());
  }, []); // Only run once when the component mounts

  return { value: storedValue, setValue } as const; // Returns the value and setter function
}

export default useLocalStorage;
