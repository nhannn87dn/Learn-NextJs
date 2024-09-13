import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-indigo-500 text-white py-4 flex gap-x-4">
      <Link href={"/"}>Home</Link>
      <Link href={"/products"}>Products</Link>
    </div>
  );
};

export default Navbar;
