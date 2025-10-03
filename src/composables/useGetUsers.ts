import { ref } from "vue";
import { IUser } from "../components/types/types";

export function useGetUser() {
  const users = ref<IUser[]>([]);

  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      users.value = data as IUser[];
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  };
  return {
    users,
    fetchUsers,
  };
}
