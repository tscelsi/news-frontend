# pileof.news frontend

**The pileof.news scraping engine can be found [here](https://github.com/tscelsi/news-scraping).**

Welcome to the pileof.news frontend repository. The frontend is powered by the [T3 Stack](https://create.t3.gg/).

The core components of the T3 Stack are:
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

More information can be found [here](https://create.t3.gg/).

## Core repository components

The repository follows the typical NextJS structure, i.e. src/pages directory contains all the pages of the application etc. For more information see [here](https://nextjs.org).

- `prisma/` - Contains the Prisma schema that is connected to a MongoDB database instance.
- `triggers/` - Contains a MongoDB trigger that is used to reset the daily scrape limit for users. This essentially limits users to triggering 1 scrape of their news articles per day.
- `src/docs/` - Contains documentation about the project.
- `src/fonts/` - Contains the great Satoshi font. HIGHLY RECOMMEND.


## Frontend concepts

A user has access to a news feed. Every day, we want to update that feed. We update the feed by scraping the news articles from the websites that the user has added to their feed. We then store those articles in MongoDB and display them to the user by retrieving them from the database. Every day when a user first interacts with the app, they trigger a scrape. At the moment, a user can only trigger 1 scrape per day.