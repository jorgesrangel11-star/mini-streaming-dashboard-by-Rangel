const PROXY = "https://cors.isomorphic-git.org/";
const DEEZER_URL = "https://api.deezer.com/search?q=";

export const searchDeezer = async (term) => {
  try {
    const response = await fetch(`${PROXY}${DEEZER_URL}${term}&limit=10`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error Deezer:", error);
    return [];
  }
};