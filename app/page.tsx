"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { FeaturedProducts } from "@/components/dashboard/FeaturedProducts";
import { PopularTools } from "@/components/dashboard/PopularTools";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black text-white">
      <Sidebar />
      
      <div className="ml-64">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-end mb-8">
            <Button className="bg-gradient-to-r from-[#d550ac] to-[#7773FA] hover:opacity-90 transition-opacity">
              Create New
            </Button>
          </div>
          
          <FeaturedProducts />
          <PopularTools />
        </main>
      </div>
    </div>
  );
}