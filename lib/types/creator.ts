export interface Creator {
  name: string;
  preview_url: string;
  gender: 'male' | 'female';
}

export interface Voice {
  voice_id: string;
  name: string;
  accent: string;
  description: string;
  age: string;
  gender: 'male' | 'female';
  use_case: string;
  preview_url: string;
}

export interface CreatorResponse {
  creators: Creator[];
  voices: Voice[];
}