export const searchITunes = async (term) => {
  try {
    const response = await fetch(`https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=10`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error iTunes:", error);
    return [];
  }
};