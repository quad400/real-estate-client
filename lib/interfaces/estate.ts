import { IAgent } from "./agent";

export interface IEstate {
  _id: string;
  title: string;
  images: string[];
  price: number;
  location: string;
  category: string;
  details?: string;
  agent: IAgent;
}
