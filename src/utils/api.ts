const BASE_URL = "https://frontend-take-home-service.fetch.com";

export const loginUser = async (name: string, email: string) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email }),
    });

    if (!res.ok) throw new Error("Login Failed");
    console.log("Login successful!");
    return true;
  } catch (error) {
    console.log("Error logging in", error);
    return false;
  }
};

export const logoutUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) throw new Error("Logout failed");

    console.log("Logout successful!");

    return true;
  } catch (error) {
    console.log("Error logging out", error);
    return false;
  }
};

export const getBreeds = async () => {
  try {
    const res = await fetch(`${BASE_URL}/dogs/breeds`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch breeds");
    return await res.json();
  } catch (error) {
    console.error("Error fetching breeds: ", error);
    return [];
  }
};

// export const searchDog = async (
//   breeds: string[] = [],
//   zipCodes: string[] = [],
//   ageMin?: number,
//   ageMax?: number,
//   from?: string,
//   size: number = 24,
//   sort?: { field: "breed" | "name" | "age"; direction: "asc" | "desc" }
// ) => {
//   const queryParams = new URLSearchParams();

//   if (breeds.length > 0) queryParams.append("breeds", JSON.stringify(breeds));
//   if (zipCodes.length > 0)
//     queryParams.append("zipCodes", JSON.stringify(zipCodes));
//   if (ageMin) queryParams.append("ageMin", ageMin.toString());
//   if (ageMax) queryParams.append("ageMax", ageMax.toString());
//   if (from) queryParams.append("from", from);
//   queryParams.append("size", size.toString());
//   if (sort) {
//     queryParams.append("sort", `${sort.field}:${sort.direction}`);
//   }

//   const url = `${BASE_URL}/dogs/search?${queryParams.toString()}`;

//   try {
//     const res = await fetch(url, {
//       method: "GET",
//       credentials: "include",
//     });
//     if (!res.ok) {
//       const errorText = await res.text();
//       throw new Error(`Failed to search dogs ${errorText}`);
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error searching for dogs", error);
//     return { resultIds: [], total: 0, next: null, prev: null };
//   }
// };

export const searchDog = async (
  breeds: string[] = [],
  zipCodes: string[] = [],
  ageMin?: number,
  ageMax?: number,
  from?: string,
  size: number = 25,
  sort?: { field: "breed" | "name" | "age"; direction: "asc" | "desc" }
) => {
  const queryParams = new URLSearchParams();

  if (breeds.length > 0) queryParams.append("breeds", breeds.join(","));
  if (zipCodes.length > 0) queryParams.append("zipCodes", zipCodes.join(","));
  if (ageMin !== undefined) queryParams.append("ageMin", ageMin.toString());
  if (ageMax !== undefined) queryParams.append("ageMax", ageMax.toString());
  if (from) queryParams.append("from", from);
  queryParams.append("size", size.toString());
  if (sort) {
    queryParams.append("sort", `${sort.field}:${sort.direction}`);
  }

  const url = `${BASE_URL}/dogs/search?${queryParams.toString()}`;
  console.log("Constructed URL:", url);

  try {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to search dogs ${errorText}`);
    }
    const data = await res.json();
    console.log("Search Dog Response:", data);
    return data;
  } catch (error) {
    console.error("Error searching for dogs", error);
    return { resultIds: [], total: 0, next: undefined, prev: undefined };
  }
};

export const getDogs = async (dogIds: string[]) => {
  try {
    const res = await fetch(`${BASE_URL}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dogIds),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch dogs");

    const data = await res.json();
    console.log("Dogs fetched successfully!", data);
    return data;
  } catch (error) {
    console.log("Error fetching dogs", error);
    return null;
  }
};
