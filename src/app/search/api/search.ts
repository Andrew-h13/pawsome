import { Dog } from "@/models/types";

interface SearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  sort?: string;
  size?: number;
}

export const fetchDogs = async (
  params: SearchParams
): Promise<Dog[] | null> => {
  const queryParams = new URLSearchParams();

  if (params.breeds) queryParams.append("breeds", params.breeds.join(","));
  if (params.zipCodes)
    queryParams.append("zipCodes", params.zipCodes.join(","));
  if (params.ageMin !== undefined)
    queryParams.append("ageMin", params.ageMin.toString());
  if (params.ageMax !== undefined)
    queryParams.append("ageMax", params.ageMax.toString());
  if (params.sort) queryParams.append("sort", params.sort);
  if (params.size !== undefined)
    queryParams.append("size", params.size.toString());

  try {
    const response = await fetch(`/api/search?${queryParams.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch dogs");

    const data: Dog[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return null;
  }
};
