fetch(' http://localhost/Api/Products/ProductsController.php')
  .then(res => res.json())
  .then(data => {
    console.log(data.products);
    console.log(data.pagination);
  });
