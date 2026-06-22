import Link from "next/link"

const Header = () => {
  return (
    <header className="w-full h-16 bg-indigo-600 flex items-center justify-center">
        <div className="container mx-auto">
                <div className="header-middle flex items-center justify-between">
                    <div className="logo text-white font-bold text-xl">LOGO</div>
                    <nav>
                        <ul className="flex gap-4">
                            <li>
                                <Link href="/" className="text-white hover:text-gray-300">Home</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-white hover:text-gray-300">Blog</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-white hover:text-gray-300">Contact</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
        </div>
    </header>
  )
}

export default Header