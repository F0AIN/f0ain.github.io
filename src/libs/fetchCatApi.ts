export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export async function fetchCat(): Promise<CatImage> {
  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await response.json();

  return images[0];
}
