FROM centos:centos7
ENV NODE_VERSION 14.16.0
WORKDIR /usr/local/src/talkn-media/

# RUN yum update -y && \
#     yum upgrade -y && \
#     yum install -y epel-release && \
#     yum install git -y && \
#     yum install -y gcc && \
#     yum install -y gcc-c++
# RUN yum install curl -y

# install nvm
# ref: https://github.com/creationix/nvm#install-script
# check latest version: https://github.com/nvm-sh/nvm
ADD https://raw.githubusercontent.com/creationix/nvm/v0.37.2/install.sh .
RUN bash install.sh
RUN source /root/.bashrc && nvm --version && node -v && nvm install v$NODE_VERSION
ENV PATH /root/.nvm/versions/node/v$NODE_VERSION/bin:$PATH

RUN npm install -g yarn && yarn -v
COPY ./ ./
RUN yarn install

EXPOSE 3000
CMD ["yarn", "run", "start"]
