'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import type { Product } from '@/types';

interface ProductsIGProps {
  products: Product[];
  categories: string[];
}

export function ProductsIG({ products, categories }: ProductsIGProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(8);

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  const visible = filtered.slice(0, displayCount);
  const remaining = filtered.length - visible.length;

  function handleCategoryChange(category: string | null) {
    setActiveCategory(category);
    setDisplayCount(8);
  }

  return (
    <div className="flex flex-col gap-10 lg:gap-[72px] items-center">
      {/* Products Header */}
      <div className="flex flex-col gap-6 items-center max-w-[694px]">
        <h3 className="font-heading text-2xl md:text-[40px] text-brand-white text-center">
          Produtos com Indicação Geográfica
        </h3>
        <div className="flex gap-[10px] flex-wrap justify-center">
          {/* "Todos" tab */}
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-6 py-2.5 rounded-full border border-brand-white/20 min-w-[100px] md:min-w-[130px] text-center cursor-pointer transition-colors ${
              activeCategory === null
                ? 'bg-brand-cow'
                : 'hover:bg-brand-cow/80'
            }`}
          >
            <span className="font-just-sans text-sm text-brand-white">
              Todos
            </span>
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2.5 rounded-full border border-brand-white/20 min-w-[100px] md:min-w-[130px] text-center cursor-pointer transition-colors ${
                activeCategory === category
                  ? 'bg-brand-cow'
                  : 'hover:bg-brand-cow/80'
              }`}
            >
              <span className="font-just-sans text-sm text-brand-white">
                {category}
              </span>
            </button>
          ))}
        </div>
        <p className="font-just-sans text-sm text-brand-white/50">
          Mostrando {visible.length} de {filtered.length} produtos
        </p>
      </div>

      {/* Product Cards Grid */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[27px]">
        {visible.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            origin={product.origin}
            state={product.state}
            description={product.description}
            image={product.image}
            category={product.category}
          />
        ))}
      </div>

      {/* "Ver mais" button */}
      {remaining > 0 && (
        <button
          onClick={() => setDisplayCount((c) => c + 8)}
          className="px-8 py-3 rounded-full border border-[#FFF5EC]/20 text-[#FFF5EC] font-just-sans text-sm hover:bg-brand-white/5 transition-colors cursor-pointer"
        >
          Ver mais {activeCategory ?? 'produtos'} ({remaining})
        </button>
      )}
    </div>
  );
}
