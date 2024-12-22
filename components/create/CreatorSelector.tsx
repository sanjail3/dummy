"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Creator, Voice } from "@/lib/types/creator";
import { formStyles } from '@/lib/styles/formStyles';
import { Play, Pause, Volume2, Music } from "lucide-react";

interface CreatorSelectorProps {
  creators: Creator[];
  voices: Voice[];
  onBack: () => void;
  onNext: (creator: Creator, voice: Voice) => void;
}

export function CreatorSelector({ creators, voices, onBack, onNext }: CreatorSelectorProps) {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const filteredVoices = voices.filter(voice => 
    selectedCreator && voice.gender === selectedCreator.gender
  );

  const handlePlay = (url: string, id: string) => {
    if (isPlaying === id) {
      setIsPlaying(null);
      // Stop audio logic
    } else {
      setIsPlaying(id);
      // Play audio logic
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h2 className={`${formStyles.heading} text-3xl`}>
          Choose an actor
        </h2>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {creators.map((creator) => (
          <Card
            key={creator.name}
            className={`${formStyles.card} relative cursor-pointer group overflow-hidden ${
              selectedCreator?.name === creator.name ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => setSelectedCreator(creator)}
          >
            <div className="aspect-[3/4]">
              <video
                src={creator.preview_url}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <Button
                size="icon"
                className="absolute top-2 right-2 bg-purple-900/80 hover:bg-purple-800 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay(creator.preview_url, creator.name);
                }}
              >
                {isPlaying === creator.name ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-semibold text-white mb-1">{creator.name}</h3>
                <p className="text-sm text-gray-200">Cloned actor, young {creator.gender === 'female' ? 'woman' : 'man'}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Voice Selection */}
      <div className="mb-12">
        <h2 className={`${formStyles.heading} text-2xl mb-6`}>Voice Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedCreator ? (
            filteredVoices.map((voice) => (
              <Card
                key={voice.voice_id}
                className={`${formStyles.card} p-4 cursor-pointer transition-all ${
                  selectedVoice?.voice_id === voice.voice_id ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => setSelectedVoice(voice)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-purple-100">{voice.name}</h4>
                    <p className="text-sm text-purple-200">{voice.description} • {voice.accent}</p>
                  </div>
                  <Button
                    size="icon"
                    className="bg-purple-900/80 hover:bg-purple-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(voice.preview_url, voice.voice_id);
                    }}
                  >
                    {isPlaying === voice.voice_id ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-purple-200 col-span-full text-center py-8">Please select an actor first</p>
          )}
        </div>
      </div>

      {/* Background Music */}
      <div>
        <h2 className={`${formStyles.heading} text-2xl mb-6`}>Music Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Bladerunner', 'Snowfall', 'Another love', 'Else - Paris'].map((track) => (
            <Card
              key={track}
              className={`${formStyles.card} p-4 cursor-pointer hover:from-purple-800/50 hover:to-purple-900/50`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-purple-100">{track}</h4>
                  <p className="text-sm text-purple-200">Futuristic, popular</p>
                </div>
                <Button
                  size="icon"
                  className="bg-purple-900/80 hover:bg-purple-800"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-12">
        <Button
          variant="ghost"
          onClick={onBack}
          className={formStyles.button.ghost}
        >
          Back
        </Button>
        <Button
          onClick={() => selectedCreator && selectedVoice && onNext(selectedCreator, selectedVoice)}
          disabled={!selectedCreator || !selectedVoice}
          className={formStyles.button.primary}
        >
          Next
        </Button>
      </div>
    </div>
  );
}