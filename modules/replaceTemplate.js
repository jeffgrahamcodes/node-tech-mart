module.exports = (template, product) => {
  let output = template.replace(
    /{%PRODUCTNAME%}/g,
    product.productName
  );
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%BRAND%}/g, product.brand);
  output = output.replace(/{%SPECS%}/g, product.specs);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.new) {
    output = output.replace(/{%NOT_NEW%}/g, 'not-new');
  }
  return output;
};
