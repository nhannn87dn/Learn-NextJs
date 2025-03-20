import Link from "next/link"

export default function CustomerLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="customer-layout flex gap-x-[20px]">
        <aside className="sidebar w-1/4">
            <nav>
                <ul>
                    <li><Link href="/customers">Dashboard</Link></li>
                    <li><Link href="/customers/profile">Profile</Link></li>
                    <li><Link href="/customers/orders">Orders</Link></li>
                </ul>
            </nav>
        </aside>
        <main className="main w-3/4">
            {children}
        </main>
    </section>
  }