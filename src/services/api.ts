import type { Question } from '@/types';

const API_BASE_URL = 'http://localhost:5000/api';

export async function generateQuiz(): Promise<Question[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to generate quiz');
    }

    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
}
