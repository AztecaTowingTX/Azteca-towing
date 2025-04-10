export default async function handler(req, res) {
    const apiKey = process.env.YELP_API_KEY;
    const businessId = "azteca-towing-austin-3"; // Replace with your Yelp business alias
  
    try {
      const response = await fetch(`https://api.yelp.com/v3/businesses/${businessId}/reviews`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const data = await response.json();
      res.status(200).json(data.reviews || []);
    } catch (err) {
      console.error("Yelp API Error:", err);
      res.status(500).json({ error: "Failed to fetch Yelp reviews" });
    }
  }
  