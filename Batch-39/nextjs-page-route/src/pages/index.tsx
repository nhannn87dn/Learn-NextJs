import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>Home Page</h1>

      <button
        className="bg-blue-500 text-white p-3 border-0"
        onClick={() => {
          router.push("/products");
        }}
      >
        Go to Products
      </button>

      <Image width={160} height={160} alt="casio" src={"/casio.jpg"} />
      <Image
        width={160}
        height={160}
        alt="casio"
        src={
          "https://cdn.tgdd.vn/Products/Images/7264/271677/smile-kid-sl082-02-tre-em-thumbnew-600x600.jpeg"
        }
      />
    </div>
  );
}
