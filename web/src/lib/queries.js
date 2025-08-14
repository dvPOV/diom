import groq from 'groq';

export const qPortfolio = groq`*[_type=="portfolioItem"]|order(order asc){
  kind, videoId, title
}`;

export const qLocations = groq`*[_type=="locationImage"]|order(order asc){
  image, alt
}`;

export const qServices = groq`*[_type=="service"]|order(order asc){
  title, bullets
}`;

export const qPricing = groq`*[_type=="pricingCard"]|order(order asc){
  title, price, features
}`;

export const qVocal = groq`*[_type=="vocalOffer"][0]{
  title, text, bullets, priceNote
}`;
