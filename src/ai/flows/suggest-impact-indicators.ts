'use server';

/**
 * @fileOverview A flow to suggest potential impact indicators based on the selected sector and purpose of financing.
 *
 * - suggestImpactIndicators - A function that suggests impact indicators.
 * - SuggestImpactIndicatorsInput - The input type for the suggestImpactIndicators function.
 * - SuggestImpactIndicatorsOutput - The return type for the suggestImpactIndicators function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImpactIndicatorsInputSchema = z.object({
  sector: z.string().describe('The sector of the project.'),
  purposeOfFinancing: z.string().describe('The stated purpose of the financing.'),
});
export type SuggestImpactIndicatorsInput = z.infer<
  typeof SuggestImpactIndicatorsInputSchema
>;

const SuggestImpactIndicatorsOutputSchema = z.object({
  suggestedIndicators: z
    .array(z.string())
    .describe('A list of suggested impact indicators.'),
});
export type SuggestImpactIndicatorsOutput = z.infer<
  typeof SuggestImpactIndicatorsOutputSchema
>;

export async function suggestImpactIndicators(
  input: SuggestImpactIndicatorsInput
): Promise<SuggestImpactIndicatorsOutput> {
  return suggestImpactIndicatorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestImpactIndicatorsPrompt',
  input: {schema: SuggestImpactIndicatorsInputSchema},
  output: {schema: SuggestImpactIndicatorsOutputSchema},
  prompt: `You are an expert sustainability data analyst. Given the sector and purpose of financing for a project, suggest a list of potential impact indicators that could be used to measure the project's sustainability impact.

Sector: {{{sector}}}
Purpose of Financing: {{{purposeOfFinancing}}}

Suggest at least 3 impact indicators.`,
});

const suggestImpactIndicatorsFlow = ai.defineFlow(
  {
    name: 'suggestImpactIndicatorsFlow',
    inputSchema: SuggestImpactIndicatorsInputSchema,
    outputSchema: SuggestImpactIndicatorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
