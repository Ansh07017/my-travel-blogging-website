
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import BlogCard from './BlogCard';
import { Skeleton } from './ui/skeleton';
import type { BlogPost } from '@shared/schema';

export default function BlogsSection() {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['/api/blogs'],
    queryFn: async (): Promise<BlogPost[]> => {
      const response = await apiRequest('GET', '/api/blogs');
      return await response.json();
    },
  });

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-500">
            Failed to load blogs. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Travel Stories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing travel experiences and destinations shared by our community of travelers
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p className="text-lg mb-4">No travel stories yet!</p>
            <p>Be the first to share your amazing travel experience.</p>
          </div>
        )}
      </div>
    </section>
  );
}
