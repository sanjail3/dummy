import { CreatorResponse } from '../types/creator';
import { dummyCreatorData } from '../data/dummyCreators';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

export async function fetchCreatorsAndVoices(): Promise<CreatorResponse> {
  try {
    const response = await fetch(`${API_URL}/creators`);
    if (!response.ok) throw new Error('Failed to fetch creators');
    return await response.json();
  } catch (error) {
    console.log('Using dummy creator data:', error);
    return dummyCreatorData;
  }
}