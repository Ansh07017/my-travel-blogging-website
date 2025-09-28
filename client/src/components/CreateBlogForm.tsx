import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { X, PlusCircle, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import type { InsertBlogPost, BlogPost } from '@shared/schema';

export default function CreateBlogForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<InsertBlogPost>({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    destination: '',
    imageUrl: '',
    tags: [],
  });

  const [currentTag, setCurrentTag] = useState('');

  const createBlogMutation = useMutation({
    mutationFn: async (data: InsertBlogPost): Promise<BlogPost> => {
      const response = await apiRequest('POST', '/api/blogs', data);
      return await response.json();
    },
    onSuccess: (newBlog: BlogPost) => {
      toast({
        title: 'Blog Created!',
        description: 'Your travel blog has been published successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] });
      // Navigate back to home page
      setLocation('/');
    },
    onError: (error) => {
      console.error('Error creating blog:', error);
      toast({
        title: 'Error',
        description: 'Failed to create your blog. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    const tags = formData.tags || [];
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...tags, currentTag.trim()],
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const tags = formData.tags || [];
    setFormData(prev => ({
      ...prev,
      tags: tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please provide a title for your blog.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please write some content for your blog.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.author.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please provide your name as the author.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.destination.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please specify the destination you visited.',
        variant: 'destructive',
      });
      return;
    }

    // Generate excerpt if not provided
    const excerpt = formData.excerpt.trim() || 
      formData.content.substring(0, 150) + (formData.content.length > 150 ? '...' : '');

    const blogData = {
      ...formData,
      excerpt,
      imageUrl: formData.imageUrl?.trim() || null,
    };

    createBlogMutation.mutate(blogData);
  };

  const handleCancel = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Button
            data-testid="button-back-home"
            variant="ghost"
            onClick={handleCancel}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Create Your <span className="text-primary">Travel Blog</span>
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            Share your amazing travel experience with the world
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Blog Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-base font-medium">
                    Title *
                  </Label>
                  <Input
                    data-testid="input-blog-title"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., My Amazing Adventure in Paris"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="destination" className="text-base font-medium">
                    Destination *
                  </Label>
                  <Input
                    data-testid="input-blog-destination"
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="e.g., Paris, France"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author" className="text-base font-medium">
                    Author Name *
                  </Label>
                  <Input
                    data-testid="input-blog-author"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl" className="text-base font-medium">
                    Featured Image URL
                  </Label>
                  <Input
                    data-testid="input-blog-image"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl || ''}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt" className="text-base font-medium">
                  Excerpt
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  A brief summary of your blog (will be auto-generated if left empty)
                </p>
                <Textarea
                  data-testid="textarea-blog-excerpt"
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="A captivating summary of your travel experience..."
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div>
                <Label htmlFor="content" className="text-base font-medium">
                  Blog Content *
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Tell us about your travel experience in detail
                </p>
                <Textarea
                  data-testid="textarea-blog-content"
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Share your travel story, experiences, tips, and memories..."
                  rows={12}
                  required
                  className="resize-none"
                />
              </div>

              <div>
                <Label className="text-base font-medium">Tags</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Add relevant tags to help others discover your blog
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(formData.tags || []).map((tag) => (
                    <Badge
                      key={tag}
                      data-testid={`tag-${tag}`}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        data-testid={`button-remove-tag-${tag}`}
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:bg-destructive/20 rounded-sm p-0.5"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    data-testid="input-new-tag"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button
                    data-testid="button-add-tag"
                    type="button"
                    variant="outline"
                    onClick={handleAddTag}
                    disabled={!currentTag.trim()}
                  >
                    <PlusCircle size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  data-testid="button-cancel-blog"
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  data-testid="button-publish-blog"
                  type="submit"
                  disabled={createBlogMutation.isPending}
                >
                  {createBlogMutation.isPending ? 'Publishing...' : 'Publish Blog'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}