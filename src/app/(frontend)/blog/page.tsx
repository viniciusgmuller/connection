import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

function mediaUrl(filename: string) {
  return `/media/${encodeURIComponent(filename)}`;
}

export const metadata: Metadata = {
  title: 'Blog | Connection Experience',
  description: 'Artigos, notícias e conteúdos sobre Indicações Geográficas, terroirs brasileiros, gastronomia e turismo.',
};

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default async function BlogPage() {
  const payload = await getPayload({ config });
  const { docs: posts, totalDocs } = await payload.find({
    collection: 'blog-posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 30,
    depth: 1,
  });

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-bg-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Blog"
            subtitle="Conteúdo para você conhecer mais sobre Indicações Geográficas, terroirs brasileiros e o mundo da gastronomia"
            align="center"
          />
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-bg-darker">
        <div className="container mx-auto px-4 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-text-muted text-lg">Nenhum artigo publicado ainda.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const featuredImage = typeof post.featuredImage === 'object' && post.featuredImage !== null
                  ? post.featuredImage
                  : null;

                return (
                  <article
                    key={post.id}
                    className="group rounded-2xl bg-bg-dark border border-gold/10 overflow-hidden hover:border-gold/30 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="aspect-video bg-bg-brown relative overflow-hidden">
                      {featuredImage?.filename ? (
                        <Image
                          src={mediaUrl(featuredImage.filename)}
                          alt={featuredImage.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gold/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                        {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                        {post.author && (
                          <>
                            <span>•</span>
                            <span>{post.author}</span>
                          </>
                        )}
                      </div>
                      <h2 className="font-heading text-xl text-text-light mb-2 group-hover:text-gold transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      {post.excerpt && (
                        <p className="text-text-cream text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      )}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all"
                      >
                        Ler mais
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {totalDocs > 30 && (
            <div className="text-center mt-12">
              <Button variant="outline">Carregar mais artigos</Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-bg-brown">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl text-text-light mb-4">
              Receba novidades em primeira mão
            </h2>
            <p className="text-text-cream mb-8">
              Assine nossa newsletter e fique por dentro das últimas notícias sobre IGs, eventos e oportunidades.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-3 rounded-full bg-bg-dark border border-gold/20 text-text-light placeholder-text-muted focus:outline-none focus:border-gold"
              />
              <Button type="submit">Inscrever</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
