FROM ubuntu:latest

MAINTAINER Tim Rodger

# Install dependencies
RUN apt-get update -qq && \
    apt-get -y install \
    nodejs \
    npm

CMD ["/home/app/run.sh"]

# Move files into place
COPY src/ /home/app/

# deal with unbuntu's daft naming of node binary
RUN sudo ln -s "$(which nodejs)" /usr/bin/node

# Install dependencies
WORKDIR /home/app

RUN npm install
