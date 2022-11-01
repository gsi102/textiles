type ObjType = { [key: string]: any };
export type ThemeType = "day" | "night";
export type ProductsOnPageType = 4 | 6;
export type ShowType = "grid" | "list";
export type ProductSectionType = "Textiles" | "Rules" | "Suppliers";

export interface IProductShort {
  id: number;
  name: string;
  desc: string;
  img: string;
}

interface IProductFullTextilesComments {
  author: string;
  text: string;
}

interface IProductFullTextiles {
  comments: IProductFullTextilesComments[];
  desc: string;
  images: string[];
  material: string;
  title: string;
}

export interface IProductFull extends ObjType {
  id: number;
  name: string;
  desc: string;
  img: string;
  rules: any[];
  suppliers: any[];
  textiles: IProductFullTextiles[];
}
