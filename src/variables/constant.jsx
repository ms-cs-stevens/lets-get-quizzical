import countryQuestions from "../dataset/country-capitals.json";
import mathematicsQuestions from "../dataset/mathematics.json";
import antonymsQuestions from "../dataset/antonyms.json";
import solarSystemQuestions from "../dataset/solar-system.json";

export const categoryList = {
  'country-capitals': 'Country Capitals',
  "mathematics": "Mathematics",
  "antonyms": "Antonyms",
  "solar-system": "Solar System"
}

export const allQuestions = {
  'country-capitals': countryQuestions,
  "mathematics": mathematicsQuestions,
  "antonyms": antonymsQuestions,
  "solar-system": solarSystemQuestions
}

export const DEFAULT_CATEGORY = "country-capitals";

export const LIGHT_PURPLE_COLOR = '#8169d3';
export const PURPLE_COLOR = '#6148be'; //'#6841c6';
export const WHITE_COLOR = '#fff';
export const PINK_COLOR = '#ffa4dc';