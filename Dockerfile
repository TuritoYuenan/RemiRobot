FROM denoland/deno:alpine AS base

# The port that your application listens to.
EXPOSE 1993

WORKDIR /app

# These steps will be re-run upon each file change in your working directory:
COPY . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache src/typescript/main.ts

CMD ["run", "--allow-all", "src/typescript/main.ts"]
