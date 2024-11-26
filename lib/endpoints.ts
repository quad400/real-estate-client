"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { envConfig } from "@/config/env";
import { toast } from "sonner";
import { CreateAgentDto } from "./interfaces/agent";

export async function getUser() {
  try {
    const res = await axios.get(`${envConfig.base_url}/users/me`, {
      headers: {
        Cookie: cookies().toString(),
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
}

export async function createAgent(body: {
  name: string;
  phoneNumber: string;
  imageUrl: string;
}) {
  const data = JSON.stringify({
    organization_name: body.name,
    organization_phone: body.phoneNumber,
    organization_image: body.imageUrl,
  });
  // {
  //   "organization_name":"yellow",
  //   "organization_phone":"+2348106",
  //   "organization_image":"https://utfs.io/f/N577hwiKq71crv6JHlbUIkdygEx8VDSOwmj60ftRsiZHo7Fu"}
  console.log(data);
  return await axios.post(`${envConfig.base_url}/agents`, "data", {
    headers: {
      Cookie: cookies().toString(),
    },
  });
}
