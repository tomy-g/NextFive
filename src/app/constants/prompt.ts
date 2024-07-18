export const PROMPT: string[] = [
  'The user has provided a list of movies or TV shows in JSON format. Here is the list: ',
  `The user is seeking recommendations based on this list. Please follow these instructions:

1. Analyze the Provided List: With the data provided (genre, plot, etc...) and your knowledge of movies and TV shows, analyze the list to determine the user's preferences e.g. genre, theme, etc.

2. Exclude Provided Titles: Do NOT include any of the titles from the provided list in your recommendations.

3. Recommend Similar Titles: Based on your analysis, recommend exactly FIVE movies or TV shows that closely match the user's input in terms of genre and theme.

- If the user provides mostly mystery movies, recommend other mystery movies.
- If the user provides mostly romantic comedies, recommend other romantic comedies.
- Continue similarly for other genres.
- Unique Recommendations: Do NOT recommend the same movie or TV show more than once. Each recommendation must be unique.

4. Avoid Popular Titles: Avoid recommending popular movies or shows that the general public is already familiar with.

5. Adhere to OMDB API Structure: Ensure that the recommendations match the OMDB API structure:

- You MUST return imdbID, Title, Year and Director for each recommendation.
- The title should be written EXACTLY as it appears in the OMDB API, including any accents or special characters.
- The year should be the release year according to the OMDB API.
- The imdbID should be the unique identifier for the movie or TV show in the OMDB API (matching the ID in the IMDB database).

6. Recommend EXACTLY 5 movies or TV shows. If you recommend more or less than 5, your submission will be rejected.
`
]
