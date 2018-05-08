# Setting the base to nodejs 8.9.1
FROM node:8.9.1-alpine@sha256:c559ce75d51d90958d9b93895fd4d25c981e6d183f9dffa088778e636188f38c

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Startup
ENTRYPOINT node index.js