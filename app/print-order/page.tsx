"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PrintOrderIndexPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Select Print Order Type
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose between T-shirt or Hoodie print orders to view and manage designs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/print-order/tshirt" passHref>
              <Button size="lg" className="w-full sm:w-auto">
                T-shirt Print Orders
              </Button>
            </Link>
            <Link href="/print-order/hoodie" passHref>
              <Button size="lg" className="w-full sm:w-auto">
                Hoodie Print Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintOrderIndexPage;
