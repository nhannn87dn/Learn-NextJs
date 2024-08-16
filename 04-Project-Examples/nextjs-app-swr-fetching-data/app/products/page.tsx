
import ProductsList from '@/ui/ProductsList';
import type { Metadata } from 'next'




export const metadata: Metadata = {
  title: 'Products',
  description: 'Products desc'
}


export default async function Page() {
 
  return (
    <>
      <ProductsList />
    </>
  );
  }