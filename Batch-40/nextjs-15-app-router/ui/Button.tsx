'use client'; //client component
export default function Button() {
  return (
    <button className="bg-amber-600 p-2" onClick={()=>{
        console.log('Hello');
      }}>Hello</button>
  )
}
