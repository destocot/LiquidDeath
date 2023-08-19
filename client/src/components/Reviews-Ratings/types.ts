export interface ReviewsRatingsProps {
  reviewsMeta: ReviewsMeta;
  currProductId: number;
  currProductName: string;
  initReviews: ReviewsData;
}

export interface RatingBreakdownProps {
  filters: {ratings: number[]},
  updateFilters: any,
  reviewsMeta: ReviewsMeta
}

export interface ReviewFormProps {
  setAForm: any,
  reviewsMeta: ReviewsMeta,
  currProductName: string,
  currProductId: string
}

export interface ReviewsMeta {
  product_id: string,
  ratings: ObjOfInts,
  recommended: Recommended,
  characteristics: Characteristics
};

interface ObjOfInts {
  [key: number]: number
};

export interface Recommended {
  [key: string]: string
}

interface Characteristics {
  [key: string]: Characteristic;
};

interface Characteristic {
  id: number,
  value: string,
};

interface ReviewsData {
  product: string,
  page: number,
  count: number,
  results: ReviewObj[],
}

interface ReviewObj {
  review_id: number,
  rating: number,
  summary: string,
  recommend: boolean,
  response: string,
  body: string,
  date: string,
  reviewer_name: string,
  helpfulness: number,
  photos: [{ id: number, url: string}]
}

export interface RefObj {
  [key: string]: { low: string; high: string };
}
