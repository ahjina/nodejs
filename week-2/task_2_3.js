// Use fs.readFile() to read the products.json file and convert it to JS object.
// Print the total number of products to console.
// Convert dateUpdated of each item into real Date. (same property name)
//     Hint: Using Array.prototype.forEach and Date() constructor
// Install date-fns@next (2.x-alpha version) into the project
// Print the list to the console with following template for each product:
//     ${name} - ${price}VND - Cập nhật cách đây: ${fromNow}

//     Format the price with comma (,) as thousand separators. (Google for a snippet)
//     Use date-fns formatDistance to convert dateUpdated to fromNow with Vietnamese locale

var fs = require("fs");
var formatDistance = require("date-fns/formatDistance");
var locale = require("date-fns/locale/vi");
var format = require("date-fns/format");
const XLSX = require("xlsx");

fs.readFile("products.json", (error, data) => {
  const products = JSON.parse(data);

  console.log("Total products: " + products.length);

  products.forEach(product => {
    product.dateUpdated = new Date(product.dateUpdated);

    let fromNow = formatDistance(product.dateUpdated, new Date(), {
      locale: locale
    });

    console.log(
      `${
        product.name
      } - ${product.price.toLocaleString()}VND - Cập nhật cách đây: ${fromNow}`
    );

    product.updated = format(product.dateUpdated, "M/d/yyyy");
    delete product.dateUpdated;
  });

  process.nextTick(() => {
    // create 'worksheet' object from json
    const ws = XLSX.utils.json_to_sheet(products);

    // Optional: config columns width (character length)
    ws["!cols"] = [
      { width: 20 },
      { width: 15 },
      { width: 20 },
      { width: 20 },
      { width: 20 }
    ];

    // create 'workbook' object (which contains multiple sheet)
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    // convert to Microsoft EXCEL workbook and write to a Buffer object
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    fs.writeFile("products.xlsx", buf, err => {
      console.log("Write success");
    });
  });
});
