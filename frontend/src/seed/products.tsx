interface Product {
  id: string;
  title: string;
  price: string;
}

interface Products {
  [key: string]: Product;
}

let products: Products = {
  "1": {
    id: "1",
    title: "Carrots",
    price: "2.99"
  },
  "2": {
    id: "2",
    title: "Potatoes",
    price: "4.99"
  },
  "3": {
    id: "3",
    title: "Spinach",
    price: "2.45"
  },
  "4": {
    id: "4",
    title: "Celery",
    price: "1.19"
  }
};

export default products;
