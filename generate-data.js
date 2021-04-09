const faker = require("faker");
const fs = require("fs");

// Set locale to use Vietnamese
faker.locale = 'vi';

// Random data
const randomCategoryList = (number) => {
  const categories = [];
  
  // loop and push category
  Array.from(new Array(number)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    categories.push(category);
  });
  return categories;
}

const randomProductList = (categories, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];
  const products = [];
  
  for (const category of categories) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        thumbnail: faker.image.imageUrl(400, 400),
        categoryId: category.id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      products.push(product);
    });
  }
  
  return products;
}

// IFFE
(() => {
  // random data
  const categories = randomCategoryList(4);
  const products = randomProductList(categories, 5);
  
  // prepare db object
  const db = {
    categories,
    products,
    profile: {
      name: "Po"
    }
  }
  
  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully');  
  });
  
})()