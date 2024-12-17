import { CategoriesModel } from './../../domain/models/categoriesModel';
export type CategoriesModel = {
  value: number;
  text: string;
};



export namespace Categories {
  export type Model = CategoriesModel;
}

export interface Categories {
  categories(): Promise<Categories.Model>;
}
