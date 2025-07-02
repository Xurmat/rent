export interface Car {
    id: number;
    category: string;
    categoryId: number;
    image: string;
    daytax: string;
    carName: string;
    imageBrand: string;
    deposit: string;

    images?: string[];
    specs?: { icon: string; label: string }[];
    tariffs?: { label: string; price: string }[];
  }
  