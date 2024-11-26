// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { WebhookEvent, clerkClient } from "@clerk/clerk-sdk-node";
// import { createUser } from "@/lib/actions/user";
// import { NextResponse } from "next/server";
// import { IUser } from "@/lib/interfaces/user";

// export async function POST(req: Request) {
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  
//   if (!WEBHOOK_SECRET) {
//     throw new Error(
//       "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   const headerPayload = headers();
//   console.log(headerPayload);
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Error occurred -- no svix headers", {
//       status: 400,
//     });
//   }

//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   console.log(WEBHOOK_SECRET);
//   const wh = new Webhook(WEBHOOK_SECRET);

//   let evt: WebhookEvent;
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return new Response("Error occurred", {
//       status: 400,
//     });
//   }

//   if (evt.type === "user.created") {
//     const { id, email_addresses, first_name, last_name, image_url } = evt.data;

//     if (!id || !email_addresses) {
//       return new Response("Error occurred -- no id or email_addresses", {
//         status: 400,
//       });
//     }

//     console.log("User created event received", evt);

//     const user: IUser = {
//       email: email_addresses[0].email_address,
//       name: `${first_name} ${last_name}`,
//       user_clerk_id: id,
//     };

//     const newUser = await createUser(user);

//     if (newUser) {
//       await clerkClient.users.updateUserMetadata(id, {
//         publicMetadata: {
//           userId: newUser._id,
//         },
//       });
//       return NextResponse.json({
//         message: "User created successfully",
//         status: 201,
//       });
//     }
//   }

//   return new Response("", { status: 200 });
// }
