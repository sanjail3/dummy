"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "./LoadingSpinner";
import { ScriptSelector } from "./ScriptSelector";
import Image from 'next/image';
import { ProductInfo } from '@/lib/types/product';
import { ImagePlus } from 'lucide-react';
import { generateScripts } from '@/lib/api/scriptApi';
import { Script } from '@/lib/types/script';
import { formStyles } from '@/lib/styles/formStyles';

interface ProductFormProps {
  productInfo: ProductInfo;
  screenshot: string;
  onBack: () => void;
}

export function ProductForm({ productInfo, screenshot, onBack }: ProductFormProps) {
  const [isGeneratingScripts, setIsGeneratingScripts] = useState(false);
  const [scripts, setScripts] = useState<Script[]>([]);
  const [formData, setFormData] = useState(productInfo);

  const handleNext = async () => {
    setIsGeneratingScripts(true);
    try {
      const response = await generateScripts(formData);
      setScripts(response.scripts);
    } catch (error) {
      console.error('Error generating scripts:', error);
    } finally {
      setIsGeneratingScripts(false);
    }
  };

  if (isGeneratingScripts) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (scripts.length > 0) {
    return (
      <ScriptSelector 
        scripts={scripts} 
        onBack={() => setScripts([])} 
        onRegenerate={handleNext}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card className={`${formStyles.card} p-6 sm:p-8`}>
        <h2 className={`${formStyles.heading} text-2xl sm:text-3xl mb-6 sm:mb-8`}>
          Add media and product details
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {Object.entries(formData).slice(0, 4).map(([key, value]) => (
                <div key={key}>
                  <label className={formStyles.label}>
                    {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </label>
                  <Textarea 
                    value={value}
                    onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                    className={formStyles.input}
                    rows={key === 'product_description' ? 4 : 3}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className={formStyles.label}>Product screenshot</label>
            <div className="relative aspect-video mb-4 overflow-hidden rounded-lg border border-purple-600/40 shadow-lg shadow-purple-900/20">
              {screenshot ? (
                <Image
                  src={`data:image/jpeg;base64,${screenshot}`}
                  alt="Product screenshot"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className={`flex items-center justify-center h-full ${formStyles.input}`}>
                  <ImagePlus className="w-8 h-8 text-purple-400" />
                </div>
              )}
            </div>

            <div className="space-y-4">
              {Object.entries(formData).slice(4).map(([key, value]) => (
                <div key={key}>
                  <label className={formStyles.label}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <Textarea 
                    value={value}
                    onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                    className={formStyles.input}
                    rows={key === 'pricing' ? 1 : 3}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className={formStyles.button.ghost}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            className={formStyles.button.primary}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}