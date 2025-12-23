
import { cookies, headers } from "next/headers";
import { User } from "..";

import {cache} from "react";

export const getCurrentUserServer = cache(async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    // call backend api to get current user
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"
      }/auth/me`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const { data } = await response.json();

    return data?.user as User;

  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
});