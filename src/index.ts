import * as cheerio from 'cheerio'

import { genkit, z } from 'genkit'
import { gpt4o, openAI } from 'genkitx-openai'

import { logger } from 'genkit/logging'
logger.setLogLevel('debug')

// Configure Genkit with necessary plugins and settings
const ai = genkit({
  // Use the OpenAI plugin with the provided API key.
  // Ensure the OPENAI_API_KEY environment variable is set before running.
  plugins: [openAI({ apiKey: process.env.OPENAI_API_KEY })],
})

// Tool definition for loading web content
const webLoader = ai.defineTool(
  {
    name: 'webLoader',
    description: 'Loads a webpage and returns the textual content.',
    inputSchema: z.object({ url: z.string() }),
    outputSchema: z.string(),
  },
  async ({ url }) => {
    // Fetch the content from the provided URL
    const res = await fetch(url)
    const html = await res.text()
    // Load the HTML content into Cheerio for parsing
    const $ = cheerio.load(html)

    // Remove unnecessary elements
    $('script, style, noscript').remove()

    // Prefer 'article' content, fallback to 'body' if not available
    return $('article').length ? $('article').text() : $('body').text()
  },
)

// Flow definition for summarizing web content
export const summarizeFlow = ai.defineFlow(
  {
    name: 'summarizeFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (url: string) => {
    const llmResponse = await ai.generate({
      prompt: `First, fetch this link: "${url}". Then, summarize the content within 20 words.`,
      model: gpt4o, // Specify the model to use for generation
      tools: [webLoader], // Include the webLoader tool defined earlier for fetching webpage content
      config: {
        temperature: 1, // Set the creativity/variation of the response
      },
    })

    return llmResponse.text
  },
)
