import Link from "next/link";
import UserArea from "../UserArea";

const Header = () => {
  return (
    <header className="bg-indigo-500 text-white">
      <div className="container mx-auto">
        <div className="header-middle flex justify-between py-4">
          <div className="logo">LOGO</div>
          <nav>
            <ul className="flex gap-x-4">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/products"}>Products</Link>
              </li>
              <li>
                <Link href={"/blog"}>Blog</Link>
              </li>
              <li>
                <Link href={"/customers"}>Customers</Link>
              </li>
              <li>
                <UserArea />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
