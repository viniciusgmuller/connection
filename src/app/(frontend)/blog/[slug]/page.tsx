import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@payload-config';

export const dynamic = 'force-dynamic';

function mediaUrl(filename: string) {
  return `/media/${filename}`;
}

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

  // Calculate reading time from content
  const textContent = (post.legacyHtml as string || '').replace(/<[^>]*>/g, '');
  const wordCount = textContent.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="pt-32">
      {/* Header */}
      <section className="py-16 pb-12 bg-bg-dark">
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
            <span>•</span>
            <span>{readingTime} min de leitura</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {featuredImage?.filename && (
        <section className="pt-8 bg-bg-darker">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="aspect-video relative rounded-2xl overflow-hidden">
              <Image
                src={(featuredImage as any).url || mediaUrl(featuredImage.filename)}
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
              className="max-w-none text-text-cream/90 text-lg
                [&_p]:leading-[1.8] [&_p]:mb-6
                [&_h2]:font-heading [&_h2]:text-text-light [&_h2]:text-3xl [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:font-heading [&_h3]:text-text-light [&_h3]:text-2xl [&_h3]:mt-8 [&_h3]:mb-3
                [&_h4]:font-heading [&_h4]:text-text-light [&_h4]:text-xl [&_h4]:mt-6 [&_h4]:mb-2
                [&_a]:text-gold [&_a]:underline hover:[&_a]:no-underline
                [&_strong]:text-text-light [&_strong]:font-semibold
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
                [&_li]:mb-2 [&_li]:leading-[1.8]
                [&_img]:rounded-xl [&_img]:mx-auto [&_img]:my-8
                [&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-text-cream/80 [&_blockquote]:my-6
                [&_hr]:border-gold/20 [&_hr]:my-8"
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
