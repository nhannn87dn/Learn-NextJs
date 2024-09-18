import Link from 'next/link'
//import UserArea from './UserArea'
import UserAreaV2 from './UserAreaV2';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Logo</h1>
        <div className="space-x-4 flex">
          <Link href="/">
            Home
          </Link>
          <Link href="/customers">
            Customers
          </Link>
          {/* <Link href="/login">
            Login
          </Link> */}
          {/* TODO: Thay đổi trạng thái sau khi login */}
         <UserAreaV2 />
        </div>
      </nav>
    </header>
  )
}
