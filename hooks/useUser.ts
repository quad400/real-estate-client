import { getUser } from "@/lib/endpoints";
import axios from "axios";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUsers(user);
    })();
  }, []);

  return { users };
};
