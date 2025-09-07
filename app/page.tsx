'use client';

import { TshirtDesigner } from '@/components/TshirtDesigner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shirt, Palette, Upload, Type } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Design Your Perfect T-Shirt
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create custom T-shirt designs with our intuitive designer. Add text, images, and choose from various styles and colors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/design">
              <Button size="lg" className="w-full sm:w-auto">
                Start Designing
              </Button>
            </Link>
            <Link href="/checkout">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose Our Designer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shirt className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Multiple Styles</CardTitle>
                <CardDescription>
                  Choose from various T-shirt styles including classic tees, polos, hoodies, and more.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Palette className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Custom Colors</CardTitle>
                <CardDescription>
                  Pick from a wide range of colors or use our color picker for the perfect shade.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Upload className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Easy Upload</CardTitle>
                <CardDescription>
                  Upload your own images or add custom text with our simple drag-and-drop interface.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Create?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start designing your custom T-shirt today and bring your ideas to life.
          </p>
          <Link href="/design">
            <Button size="lg">
              <Type className="mr-2 h-5 w-5" />
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}