'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

interface Product {
  id: number
  name: string
  price_in_cents: number
  image_url: string
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="girly-card transition-all duration-300 hover:shadow-lg hover:-translate-y-2 float-animation border-2 border-pink-200/50">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden rounded-t-xl">
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl font-display font-bold text-primary mb-3 pulse-soft-animation">
          {product.name}
        </CardTitle>
        <CardDescription className="text-2xl font-bold text-accent">
          {formatPrice(product.price_in_cents)}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full girly-button text-white font-semibold py-3 rounded-xl border-0 bounce-gentle-animation" variant="default">
          💕 加入購物車 💕
        </Button>
      </CardFooter>
    </Card>
  )
}

function ProductSkeleton() {
  return (
    <Card className="girly-card border-2 border-pink-200/30 pulse-soft-animation">
      <CardHeader className="p-0">
        <Skeleton className="aspect-square w-full rounded-t-xl bg-pink-100/50" />
      </CardHeader>
      <CardContent className="p-6">
        <Skeleton className="h-6 w-3/4 mb-3 bg-pink-200/30 rounded-full" />
        <Skeleton className="h-8 w-1/2 bg-purple-200/30 rounded-full" />
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Skeleton className="h-12 w-full bg-pink-300/30 rounded-xl" />
      </CardFooter>
    </Card>
  )
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50/80 to-purple-50/80 backdrop-blur-sm py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-pink-200/70 text-pink-800 px-4 py-2 text-sm font-medium rounded-full sparkle-animation">
            ✨ 精選商品 ✨
          </Badge>
          <h1 className="text-5xl font-display font-bold text-primary sm:text-6xl md:text-7xl mb-6 float-animation">
            💖 探索美好生活 💖
          </h1>
          <p className="text-xl text-foreground/80 max-w-4xl mx-auto mb-10 font-body leading-relaxed">
            精心挑選的優質商品，為您的生活增添更多色彩與品味 🌸
          </p>
          <Button size="lg" className="girly-button text-lg px-10 py-4 rounded-full text-white font-semibold border-0">
            🛍️ 開始購物 ✨
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-pink-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-primary mb-6 pulse-soft-animation">
              🌟 熱門商品 🌟
            </h2>
            <p className="text-xl text-foreground/70 font-body max-w-2xl mx-auto">
              每一件商品都經過精心挑選，品質保證 💎
            </p>
          </div>

          {error && (
            <div className="text-center py-12">
              <div className="bg-pink-100/80 border border-pink-300/50 rounded-2xl p-8 max-w-md mx-auto girly-card">
                <p className="text-pink-700 font-body text-lg">
                  💔 載入商品時發生錯誤：{error.message}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : products.map((product, index) => (
                  <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-pink-100/50 to-transparent border-t border-pink-200/30 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-foreground/60 font-body text-lg sparkle-animation">
            © 2024 Vibe Store. 為您帶來美好的購物體驗 💕
          </p>
        </div>
      </footer>
    </div>
  )
}
