import React, { useState } from "react";
import style from "./adminpage.module.css";
import { CreateCategory } from "../../components/modals/create-category/CreateCategory";
import { Link, useParams } from "react-router-dom";
import { ProductTable } from "./product-table/ProductTable";
import { AdminLayout } from "../../components/adminLayout/AdminLayout";
import { BrandTable } from "./brand-table/BrandTable";
import { CategoryTable } from "./category-table/CategoryTable";
import { SizesTable } from "./sizes-table/SizesTable";

export const AdminPage = () => {
  const param = useParams();
  const category = param.category;
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  return (
    <AdminLayout>
      <div className={style.container}>
        <div className={style.left}>
          <Link to="/admin/products" className={style.adminButton}>
            Товары
          </Link>
          <Link to="/admin/categories" className={style.adminButton}>
            Категории
          </Link>
          <Link to="/admin/brand" className={style.adminButton}>
            Бренды
          </Link>
        </div>
        <div className={style.right}>
          {category === "categories" && <CategoryTable></CategoryTable>}
          {category === "products" && <ProductTable></ProductTable>}
          {category === "brand" && <BrandTable></BrandTable>}
          {category === "sizes" && <SizesTable></SizesTable>}
        </div>
      </div>
    </AdminLayout>
  );
};
