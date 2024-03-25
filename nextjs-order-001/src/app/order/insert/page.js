"use client";
import css from "@/css/insert.module.css";
import { useEffect, useState } from "react";

const InsertPage = () => {
  // const [productList, setProductList] = useState([]);
  // useEffect(() => {
  //   const searchInsertItem = async (c_code) => {
  //     const result = await selectAll(c_code);
  //     setProductList([...result]);
  //   };
  //   searchInsertItem();
  // }, []);
  // const searchList = productList.map((product) => {
  //   return <li key={product.p_code}>{product.p_name}</li>;
  // });
  const changeHandler = (e) => {
    const { text } = e.target.value;
  };
  return (
    <>
      <h1 className="css.main">주문번호:O01001</h1>
      <form className="css.form">
        <div>
          <input
            placeholder="고객코드"
            value
            onChange={changeHandler}
          />
        </div>
        <div className={css.button}>
          <button>검색</button>
        </div>
      </form>
      <div className={css.list}>
        <ul>
          <li>
            <storng>고객코드 : </storng>
          </li>
          <li>
            <storng>고객명 : </storng>
          </li>
          <li>
            <storng>연락처 : </storng>
          </li>
        </ul>
      </div>
      <form className={css.form}>
        <div>
          <input placeholder="상품코드" />
        </div>
        <div className={css.button}>
          <button>검색</button>
        </div>
      </form>
      <form className={css.form}>
        <div>
          <input placeholder="주문수량" />
        </div>
        <div className={css.button}>
          <button>상품추가</button>
        </div>
      </form>
    </>
  );
};

export default InsertPage;
