import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@payload-config';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

async function getPost(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  return docs[0] || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post não encontrado' };

  return {
    title: `${post.seo?.metaTitle || post.title} | Connection Experience`,
    description: post.seo?.metaDescription || post.excerpt || '',
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const featuredImage =
    typeof post.featuredImage === 'object' && post.featuredImage !== null
      ? post.featuredImage
      : null;

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-16 bg-bg-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gold text-sm mb-8 hover:gap-3 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao blog
          </Link>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-text-light mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-text-muted">
            {publishedDate && <span>{publishedDate}</span>}
            {post.author && (
              <>
                <span>•</span>
                <span>{post.author}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {featuredImage?.filename && (
        <section className="bg-bg-darker">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="aspect-video relative rounded-2xl overflow-hidden -mt-4">
              <Image
                src={`/media/${featuredImage.filename}`}
                alt={featuredImage.alt || post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16 bg-bg-darker">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          {post.excerpt && (
            <p className="text-lg text-text-cream mb-8 font-medium leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {post.legacyHtml ? (
            <div
              className="prose prose-invert prose-gold max-w-none
                prose-headings:font-heading prose-headings:text-text-light
                prose-p:text-text-cream prose-p:leading-relaxed
                prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:mx-auto
                prose-strong:text-text-light"
              dangerouslySetInnerHTML={{ __html: post.legacyHtml }}
            />
          ) : (
            <p className="text-text-muted">Conteúdo em breve.</p>
          )}
        </div>
      </section>

      {/* Back to blog */}
      <section className="py-12 bg-bg-dark border-t border-gold/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao blog
          </Link>
        </div>
      </section>
    </div>
  );
}
