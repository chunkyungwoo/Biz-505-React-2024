const ProductSearch = ({
  productList,
  setProduct,
  setProductList,
}) => {
  const onClickHandler = (product) => {
    setProduct(product);
    setProductList([]);
  };
  const viewList = productList.map((item) => {
    <li
      pname={item.p_code}
      p_code={item.p_code}
      onClick={() => onClickHandler(item)}
    >
      {item.p_code} {item.p_name}
    </li>;
  });
  return <ul>{viewList}</ul>;
};
export default ProductSearch;
