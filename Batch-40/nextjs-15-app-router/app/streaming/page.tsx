import PostList from "@/ui/streaming/PostList";
import Tags from "@/ui/streaming/Tags";
import { Suspense } from "react";

export default function Page() {
  return (
      <div>
      {/* This content will be sent to the client immediately */}
      <header>
        <h1>Welcome to the Blog</h1>
        <p>Read the latest posts below.</p>
      </header>
      <main className="container mx-auto">
        <div className="layout_wrapper flex gap-x-5">
          {/* Blog post content */}
          {/*... */}
          <div className="blog_list w-3/4">
            <Suspense fallback={<>Loading....</>}>
            <PostList />
            </Suspense>
          </div>
          <aside className="sidebar w-1/4">
            {/* Sidebar content */}
            {/*... */}
            <h3>Tags</h3>
            <Suspense fallback={<>Loading....</>}>
            <Tags  />
            </Suspense>
          </aside>
        </div>
      </main>
    </div>
  )
}
