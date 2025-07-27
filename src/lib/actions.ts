"use server";

import { suggestImpactIndicators, SuggestImpactIndicatorsInput } from "@/ai/flows/suggest-impact-indicators";

export async function getIndicatorSuggestions(input: SuggestImpactIndicatorsInput) {
  try {
    const result = await suggestImpactIndicators(input);
    return result.suggestedIndicators;
  } catch (error) {
    console.error("Error getting suggestions:", error);
    return [];
  }
}
