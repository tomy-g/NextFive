import moviesInput from './moviesInput.json'

export const PROMPT = `The user has provided a list of movies or TV shows in JSON format as it follows: ${JSON.stringify(
  moviesInput
)}.
The user is looking for recommendations based on the previous provided list.
Please analyze the provided movies based on their genres and themes.
It is really important that you DON'T include any of the provided titles by the user in your recommendations.
Based on your analysis, recommend exactly FIVE movies or TV shows that are most similar to the user's input.
As an example of reference, if the user provides mostly mistery movies, you should recommend other mistery movies, if the user provides mostly romantic comedies, you should recommend other romantic comedies, and so on with the rest of the genres.
Do NOT recommend the same movie or TV show twice or more.
Avoid recommending popular movies or shows that the general public may already be familiar with.
ALL recommendations MUST be DIFFERENT between each other.
The movie or show title must be written with the correct accents, punctuation, and capitalization as it appears in the original title or in IMDB.
Return exactly FIVE recommendations. Do NOT provide more or less than five.`
