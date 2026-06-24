export interface Review {
  id: number;
  author: string;
  rating: number; // 1–5
  date: string;   // e.g. "May 2025"
  body: string;
  source: "google" | "facebook" | "other";
}

export const reviews: Review[] = [
  {
    id: 1,
    author: "Joshua Culp PLEng, Owner: 49 Parallel Engineering",
    rating: 5,
    date: "May 2026",
    body: "As the owner of 49 Parallel Engineering Ltd. I have full confidence in Dennis doing survey work for me. Dennis is highly knowledgeable in land surveying and geomatics, and I have learned a lot from him through our work together. I highly recommend Tantalus Geomatics for businesses and home owners.",
    source: "google",
  },
  {
    id: 2,
    author: "Delle Booth",
    rating: 5,
    date: "May 2026",
    body: "Dennis at Tantalus Geomatics completed a Property Line Survey for me. I highly recommend this professional engineer for property line surveying work. On my very first inquiry, he responded the same day and communicated clearly throughout the entire process. He was extremely knowledgeable, diligent, and completed the job in a timely manner. He provided regular updates, answered questions thoroughly, and was very personable and easy to work with. The final documents and property line work were completed with excellent precision and attention to detail. It was a treat to find a professional who is meticulous, conscientious and shows integrity. Overall, a truly professional job from start to finish. I would not hesitate to use his services again or recommend him to others.",
    source: "google",
  },
  {
    id: 3,
    author: "Shady Acres",
    rating: 5,
    date: "June 2026",
    body: "Dennis was excellent to work with. I recommend him.",
    source: "google",
  },
];
