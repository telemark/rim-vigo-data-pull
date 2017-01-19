[![Build Status](https://travis-ci.org/telemark/rim-vigo-data-pull.svg?branch=master)](https://travis-ci.org/telemark/rim-vigo-data-pull)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# rim-vigo-data-pull
Pulls data from VIGO and saves it as .json.

## Config

docker.env

```bash
QUEUE_DIRECTORY_PATH=test/data/queue
COPIES_DIRECTORY_PATH=test/data/copies
ERRORS_DIRECTORY_PATH=test/data/error
URL=https://vigo.dummy.allthethings.win
USERNAME=my-username
PASSWORD=my-password
ANTALL_DOKUMENTER=1
FYLKE=8
```

## Docker

Build

```bash
$ docker build -t rim-vigo-data-pull .
```

### Usage

```bash
$ docker run --env-file=docker.env --volume=/test/data/jobs:/src/test/data/jobs --rm rim-vigo-data-pull
```

or from pre-built image

```bash
$ docker run --env-file=docker.env --volume=/test/data/jobs:/src/test/data/jobs --rm telemark/rim-vigo-data-pull
```

- This will start a container. 
- Download documents. 
- Generate .json file in the queue directory.
- Stop the container and remove it.

# License
[MIT](LICENSE)

![alt text](https://robots.kebabstudios.party/rim-vigo-data-pull.png "Robohash image of rim-vigo-data-pull")