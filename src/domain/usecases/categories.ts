import { CategoriesModel } from './../models/categoriesModel';

export namespace Categories {
  export type Model = CategoriesModel
}

export interface Categories {
  get(): Promisse<Categoris.Model>
}
