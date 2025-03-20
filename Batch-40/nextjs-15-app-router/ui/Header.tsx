import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-indigo-700 text-white">
        <div className="container mx-auto">
            <div className="header-wrapper flex justify-between items-center py-4">
                <div className="logo">LOGO</div>
                <nav>
                    <ul className="flex gap-x-3">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li><Link href="/customers">Customers</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
  )
}
