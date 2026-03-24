import { Metadata } from 'next';
import Link from 'next/link';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Blog | Connection Experience',
  description: 'Artigos, notícias e conteúdos sobre Indicações Geográficas, terroirs brasileiros, gastronomia e turismo.',
};

const posts = [
  {
    id: '1',
    title: 'O que são Indicações Geográficas e por que elas importam',
    excerpt: 'Entenda como as IGs protegem produtos únicos e valorizam territórios brasileiros.',
    category: 'Educação',
    date: '15 Jan 2026',
    readTime: '5 min',
    image: '/images/blog/ig-intro.jpg',
  },
  {
    id: '2',
    title: 'Os vinhos da Serra Gaúcha: uma história de sucesso',
    excerpt: 'Como a região se tornou referência mundial em vinhos finos e espumantes.',
    category: 'Terroirs',
    date: '12 Jan 2026',
    readTime: '7 min',
    image: '/images/blog/vinhos-serra.jpg',
  },
  {
    id: '3',
    title: 'Cacau de Rondônia: o chocolate amazônico conquista o mundo',
    excerpt: 'A trajetória do cacau rondoniense até ganhar reconhecimento internacional.',
    category: 'Terroirs',
    date: '10 Jan 2026',
    readTime: '6 min',
    image: '/images/blog/cacau-rondonia.jpg',
  },
  {
    id: '4',
    title: 'Como participar das Rodadas de Negócio',
    excerpt: 'Guia completo para aproveitar ao máximo as oportunidades de networking.',
    category: 'Evento',
    date: '08 Jan 2026',
    readTime: '4 min',
    image: '/images/blog/rodadas-negocio.jpg',
  },
  {
    id: '5',
    title: 'Turismo de experiência: a nova fronteira do setor',
    excerpt: 'Por que viajantes buscam cada vez mais experiências autênticas e locais.',
    category: 'Turismo',
    date: '05 Jan 2026',
    readTime: '5 min',
    image: '/images/blog/turismo-experiencia.jpg',
  },
  {
    id: '6',
    title: 'Gramado: muito além do chocolate',
    excerpt: 'Descubra os atrativos da cidade-sede do Connection Experience.',
    category: 'Destino',
    date: '02 Jan 2026',
    readTime: '6 min',
    image: '/images/blog/gramado.jpg',
  },
];

const categories = ['Todos', 'Educação', 'Terroirs', 'Evento', 'Turismo', 'Destino'];

export default function BlogPage() {
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

      {/* Categories */}
      <section className="py-8 bg-bg-darker border-b border-gold/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  category === 'Todos'
                    ? 'bg-gold text-bg-darker'
                    : 'bg-bg-dark text-text-cream hover:bg-gold/20 hover:text-gold'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-bg-darker">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-2xl bg-bg-dark border border-gold/10 overflow-hidden hover:border-gold/30 transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="aspect-video bg-bg-brown relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gold/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Tag variant="gold" size="sm">{post.category}</Tag>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} de leitura</span>
                  </div>
                  <h2 className="font-heading text-xl text-text-light mb-2 group-hover:text-gold transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-text-cream text-sm mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all"
                  >
                    Ler mais
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline">Carregar mais artigos</Button>
          </div>
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
