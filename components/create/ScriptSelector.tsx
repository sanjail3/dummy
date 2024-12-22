"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Script } from "@/lib/types/script";
import { Book, Lightbulb, ListChecks, MessageCircle, PlayCircle } from "lucide-react";
import { formStyles } from '@/lib/styles/formStyles';
import { CreatorSelector } from "./CreatorSelector";
import { fetchCreatorsAndVoices } from "@/lib/api/creatorApi";

const icons = {
  "Don't Worry Style": MessageCircle,
  "Storytime Style": Book,
  "Problem-Solution Style": Lightbulb,
  "3 Reasons Why Style": ListChecks,
  "Tutorial Style": PlayCircle,
};

interface ScriptSelectorProps {
  scripts: Script[];
  onBack: () => void;
  onRegenerate: () => void;
}

export function ScriptSelector({ scripts, onBack, onRegenerate }: ScriptSelectorProps) {
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [showCreatorSelector, setShowCreatorSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [creatorData, setCreatorData] = useState<any>(null);

  const handleScriptSelect = async (script: Script) => {
    setSelectedScript(script);
    setIsLoading(true);
    try {
      const data = await fetchCreatorsAndVoices();
      setCreatorData(data);
      setShowCreatorSelector(true);
    } catch (error) {
      console.error('Error fetching creators:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showCreatorSelector && creatorData) {
    return (
      <CreatorSelector
        creators={creatorData.creators}
        voices={creatorData.voices}
        onBack={() => setShowCreatorSelector(false)}
        onNext={(creator, voice) => {
          console.log('Selected creator:', creator, 'voice:', voice);
          // Handle next step
        }}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className={`${formStyles.heading} text-2xl sm:text-3xl`}>
          Choose Your Script Style
        </h2>
        <p className="text-purple-200/90 text-base sm:text-lg mt-2">
          Select the script style that best fits your video
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {scripts.map((script, index) => {
          const Icon = icons[script.title as keyof typeof icons] || MessageCircle;
          return (
            <Card
              key={index}
              onClick={() => handleScriptSelect(script)}
              className={`${formStyles.card} p-6 hover:from-purple-800/50 hover:to-purple-900/50 transition-all cursor-pointer group ${
                selectedScript?.title === script.title ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-purple-600/50 to-pink-600/50 group-hover:from-purple-500/60 group-hover:to-pink-500/60 transition-colors shadow-lg shadow-purple-900/20">
                  <Icon className="w-6 h-6 text-purple-100" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-100">{script.title}</h3>
                  <p className="text-purple-200/90 line-clamp-3">{script.script}</p>
                </div>
              </div>
            </Card>
          );
        })}
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
          onClick={onRegenerate}
          className={formStyles.button.primary}
        >
          Regenerate
        </Button>
      </div>
    </div>
  );
}