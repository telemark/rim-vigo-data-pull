[![Build Status](https://travis-ci.org/telemark/rim-vigo-data-pull.svg?branch=master)](https://travis-ci.org/telemark/rim-vigo-data-pull)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# rim-vigo-data-pull

Pulls data from VIGO and saves it as .json.

## Config

docker.env

```bash
COPIES_DIRECTORY_PATH=test/data/copies
ERRORS_DIRECTORY_PATH=test/data/errors
QUEUE_DIRECTORY_PATH=test/data/queue
URL=https://vigo.dummy.allthethings.win
USERNAME=my-username
PASSWORD=my-password
ANTALL_DOKUMENTER=1
FYLKE=8
FIREBASE_URL=https://your.firebase.url
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

## Related

- [rim-vigo-saksbehandling](https://github.com/telemark/rim-vigo-saksbehandling) Formats documents for archive
- [rim-laurentius](https://github.com/telemark/rim-laurentius) Archives the formatted data to Public360
- [rim-vigo-update-status](https://github.com/telemark/rim-vigo-update-status) Updates archive status for document

## License

[MIT](LICENSE)
