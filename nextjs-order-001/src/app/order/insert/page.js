"use client";
import css from "@/css/insert.module.css";
import { selectAll } from "@/app/api/product";
import { useEffect, useState } from "react";

const InsertPage = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const searchInsertItem = async () => {
      const result = await selectAll();
      setProductList([...result]);
    };
    searchInsertItem();
  }, []);
  const searchList = productList.map((product) => {
    return <li key={product.p_code}>{product.p_name}</li>;
  });
};
const OrderInsert = () => {
  return (
    <>
      <h1 className="css.main">주문번호:O01001</h1>
      <form className="css.form">
        <div>
          <input placeholder="고객코드"></input>
          <button>검색</button>
        </div>
        <div>
          <input placeholder="상품코드"></input>
          <button>검색</button>
        </div>
        <div>
          <input placeholder="상품추가"></input>
          <button>상품추가</button>
        </div>
      </form>
      <div>
        <h3>상품리스트</h3>
        <ul>
          <li className="css.list"></li>
          <li>상품명</li>
          <li>주문수량</li>
        </ul>
      </div>
    </>
  );
};
export default OrderInsert;
