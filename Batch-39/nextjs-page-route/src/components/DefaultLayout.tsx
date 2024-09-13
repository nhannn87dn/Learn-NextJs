import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      <Navbar />
      <main className="py-4">{children}</main>
      <Footer />
    </div>
  );
}
