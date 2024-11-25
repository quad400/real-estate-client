"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { envConfig } from "@/config/env";
import { toast } from "sonner";

export async function getUser() {
  try {
    const res = await axios.get("http://localhost:3001", {
      headers: {
        Cookie: cookies().toString(),
      },
    });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
}

export async function createAgent(body: any) {
  try {
    await axios.post(`${envConfig.base_url}/agent`, body, {
      headers: {
        Cookie: cookies().toString(),
      },
    });

    toast.success("You have become an agent");
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data);
  }
}
