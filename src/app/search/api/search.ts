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

//   const [dogs, setDogs] = useState<Dog[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [from, setFrom] = useState<string | undefined>(undefined);
//   const [next, setNext] = useState<string | undefined>(undefined);
//   const [prev, setPrev] = useState<string | undefined>(undefined);
//   const dogsPerPage = 24;

// useEffect(() => {
//     const fetchDogs = async () => {
//       setLoading(true);
//       const data = await searchDog(
//         [],
//         [],
//         undefined,
//         undefined,
//         from,
//         dogsPerPage,
//         { field: "name", direction: "asc" }
//       );

//       setDogs(data.resultIds || []);
//       setNext(data.next || null);
//       setPrev(data.prev || null);
//       setLoading(false);
//     };
//     fetchDogs();
//   }, [from]);
