"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreatePageHeader } from "@/components/create/CreatePageHeader";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { LoadingSpinner } from "@/components/create/LoadingSpinner";
import { ProductForm } from "@/components/create/ProductForm";
import { ApiResponse } from "@/lib/types/product";
import { fetchProductInfo } from "@/lib/api/productApi";
import { formStyles } from '@/lib/styles/formStyles';

export default function CreateVideoPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState('');

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const data = await fetchProductInfo(url);
      setProductData(data);
    } catch (err) {
      setError('Failed to fetch product information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <CreatePageHeader 
          title="AI Video Ads" 
          subtitle="Generate videos from your product links" 
        />
        
        {isLoading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <LoadingSpinner />
          </div>
        ) : productData ? (
          <ProductForm 
            productInfo={productData.product_information}
            screenshot={productData.screenshot.data}
            onBack={() => setProductData(null)}
          />
        ) : (
          <div className="max-w-3xl mx-auto mt-12 sm:mt-24">
            <Card className={`${formStyles.card} p-6 sm:p-12`}>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className={`${formStyles.heading} text-3xl sm:text-4xl mb-4`}>
                  Share your product link
                </h2>
                <p className="text-purple-200/90 text-base sm:text-lg">
                  Create engaging video ads with AI in just a few clicks
                </p>
              </div>
              
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-purple-400" />
                </div>
                <Input 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your product URL here..."
                  className={`${formStyles.input} h-14 pl-12 pr-32 text-lg`}
                />
                <div className="absolute right-2 top-2">
                  <Button 
                    onClick={handleSubmit}
                    className={`${formStyles.button.primary} px-6 h-10`}
                  >
                    Generate Video
                  </Button>
                </div>
              </div>
              {error && (
                <p className="text-red-400 text-center mt-4 text-sm">{error}</p>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}