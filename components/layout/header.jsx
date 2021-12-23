import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import { resetCart } from "../../redux/cart/cart.actions";
import { resetWishlist } from "../../redux/wishlist/whishlist.actions";
import {
  HeaderContainer,
  LogoContainer,
  NavContainer,
  IconContainer,
} from "./header.styles";
const Header = () => {
  const categories = useSelector((state) => state.categories.categories);
  const wishlist = useSelector((state) => state.wishlist.products);
  const dispatch = useDispatch();
  const [session, loading] = useSession();
  const logoutHandler = async () => {
    try {
      await updateWishlistHandler(wishlist);
    } catch (error) {
      alert("Failed to upload wishlist!");
    }

    await signOut({ redirect: false });
    dispatch(resetCart());
    dispatch(resetWishlist());
  };
  return (
    <HeaderContainer>
      <IconContainer name="sidebar" size="big" inverted />
      <Link href="/">
        <LogoContainer>BeOshare</LogoContainer>
      </Link>
      <nav>
        <NavContainer>
          {!session && !loading && (
            <li>
              <Link href="/auth">
                <IconContainer name="user" size="large" inverted />
              </Link>
            </li>
          )}
          {session && (
            <li onClick={logoutHandler}>
              <IconContainer name="sign-out" size="large" inverted />
            </li>
          )}
          <li>
            <Link href="/checkout">
              <IconContainer name="shopping cart" size="large" inverted />
            </Link>
          </li>
        </NavContainer>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
