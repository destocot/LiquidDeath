export interface ReviewsRatingsProps {
  reviewsMeta: ReviewsMeta;
  currProductId: number;
  currProductName: string;
  initReviews: ReviewsData;
}

interface ReviewsMeta {
  product_id: string,
  ratings: ObjOfInts,
  recommend: ObjOfInts,
  characteristics: Characteristics
};

interface ObjOfInts {
  [key: number]: number
};

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

interface AxiosResponse {
  config: any,
  data: ReviewsData,
  headers: any,
  request: any,
  results: ReviewObj[],
  status: number,
  statusText: string
}
