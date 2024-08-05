<div align="center">

[![Next JS][nextjs-badge]][nextjs-url]
[![Vercel SDK][sdk-badge]][sdk-url]
[![NextUI][nextui-badge]][nextui-url]
[![React][react-badge]][react-url]
[![TypeScript][typescript-badge]][typescript-url]
[![TailwindCSS][tailwind-badge]][tailwind-url]
[![OpenAI API][openai-badge]][openai-url]

<a href="https://nextfive.vercel.app/" target="_blank">
 <img src="https://github.com/user-attachments/assets/dbfd3a1f-2835-42f9-b7bc-8b72a50e06be" width="400">
</a>

by [@tomy-g](https://tomyg.vercel.app/)
# 



NextFive is a web app that uses the power of AI to recommend 5 movies or TV shows based on your preferences. Simply select your favorite titles, and let the AI suggest personalized options, saving you time and effort in finding what to watch next.

<a href="https://nextfive.vercel.app/" target="_blank">
  🌐 Visit the website
</a>
<br/>
<br/>
💡 This project participates in the <a target="_blank" href="https://github.com/midudev/hackaton-vercel-2024/">2024 Vercel Hackathon</a> organized by <a target="_blank" href="https://github.com/midudev/">@midudev</a>
</div>

## Features

- ✨ **AI-Powered Recommendations**: Uses OpenAI's API to understand your preferences and provide real-time personalized movie and TV show suggestions.
- 🔍 **Integrated Search**: Easily search for your favorite movies or shows within the app.
- ☝️ **Simple Selection Process**: Just choose 5 movies or TV shows you like, and get tailored recommendations without needing to specify genres or other characteristics.
- 📺 **Customizable Filter**: Filter recommendations by type (Movie/TV) to match your viewing preferences.
- 🎥 **Detailed Movie Information:** Click on a movie card to view detailed information about the title.
- ⏮️ **Stored Recommendations**: Keeps track of all your recommendations in your browser memory for easy access later.
- 📜 **History Management**: View and manage all your past recommendations, with the option to clear your history if desired.
- 🔑 **Custom API Key**: By default, the app uses a shared API key with with limited access. You can set your own OpenAI API key for unlimited access, stored securely in your browser memory.
- 🤖 **AI Model Selection**: Uses the GPT-4o mini model by default. If you set up your own API key, you can choose between GPT-4o mini and GPT-4o.

## Screenshots

  ![705shots_so](https://github.com/user-attachments/assets/3c725acb-bb16-44c9-ad66-619db31da90c)
  ![463shots_so](https://github.com/user-attachments/assets/47f0353a-1961-4ce6-acc5-73f56d7d0315)


## Run Locally

The project is already deployed <a href="https://nextfive.vercel.app/" target="_blank">
  Here.
</a>
However, you can still configure and deploy NextFive on your own machine.

1. Clone the Repository

   ```bash
     git clone https://github.com/tomy-g/NextFive.git
     cd NextFive
   ```

2. Install Dependencies

   ```bash
     npm install
   ```
3. Set Up Environment Variables

   Create a .env.local file in the root directory of the project and add the following variables:
   Without this file correctly set up, the project will not run as expected.

   ```env
     OPENAI_API_KEY=A valid Open AI API key
     MOVIES_API_KEY=A valid OMDB API key
     MOVIE_API_URL=https://www.omdbapi.com/
     LIMIT_ACTIVE='false'
   ```
4. Run the Development Server

   ```bash
     npm run dev
   ```
   Open http://localhost:3000 with your browser to see the result.
   
5. Build for Production

   ```bash
     npm run build
   ```
6. Start the Production Server

   ```bash
     npm run start
   ```

[nextjs-badge]: https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white
[nextjs-url]: https://nextjs.org/
[nextui-badge]: https://img.shields.io/badge/next%20ui-%23000000.svg?style=for-the-badge&logo=node.js&logoColor=white
[nextui-url]: https://nextui.org/
[react-badge]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[react-url]: https://react.dev/
[typescript-badge]: https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&color=blue
[typescript-url]: https://www.typescriptlang.org/
[tailwind-badge]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[openai-badge]: https://img.shields.io/badge/OpenAI%20API-74aa9c?style=for-the-badge&logo=openai&logoColor=white
[openai-url]: https://openai.com/api/
[sdk-badge]: https://img.shields.io/badge/Vercel%20AI%20SDK-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[sdk-url]: https://sdk.vercel.ai/



 
 
