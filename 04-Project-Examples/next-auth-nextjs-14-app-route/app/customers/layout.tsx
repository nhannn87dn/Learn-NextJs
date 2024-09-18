import Link from "next/link"


const CustomerLayout = ({children} : {children: React.ReactNode}) => {
    return (
     
      <div className="flex gap-x-5">
        <div className="customer_nav w-[200px] flex flex-col gap-y-4 bg-slate-200 p-4">
            <Link href={'/customers'}>Dashboard</Link>
            <Link href={'/customers/profile'}>Profile</Link>
            <Link href={'/customers/orders'}>Order</Link>
        </div>
        <div className="layout_content flex-1">
            {children}
        </div>
      </div>
      
    )
  }
  
  export default CustomerLayout