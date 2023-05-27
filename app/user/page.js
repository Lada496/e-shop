"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useGetWishlistQuery } from "../../redux/api/wishlist/wishlist.api";
import ProductsList from "../../components/products-list/products-list";

const WishListPage = () => {
  const { data: session } = useSession();

  if (!session) {
    redirect("/auth");
  }
  const { data, isFetching, error } = useGetWishlistQuery();
  if (isFetching || error) {
    return <div>WishListPage Loading</div>;
  }
  console.log({ data });
  return <ProductsList categoryObject={data} />;
};

export default WishListPage;
