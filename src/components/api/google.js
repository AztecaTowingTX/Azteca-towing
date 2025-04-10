export default async function handler(req, res) {
    const apiKey = process.env.GOOGLE_API_KEY;
    const placeId = "ChIJDz_cIXXKRIYROZ3gCPSiJds"; // Replace with your own Google Place ID
  
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data.result.reviews || []);
    } catch (err) {
      console.error("Google API Error:", err);
      res.status(500).json({ error: "Failed to fetch Google reviews" });
    }
  }
  