FROM node:14-buster

ARG USER=metacell
ARG REPO=meta-diagram
ARG BRANCH=develop

ENV BUILDDIR=/builddir

RUN mkdir -p ${BUILDDIR}

COPY package.json ${BUILDDIR}
#COPY yarn.lock ${BUILDDIR}
COPY installation.sh ${BUILDDIR}
WORKDIR ${BUILDDIR}
RUN rm -rf node_modules

# RUN apt -y install fit
RUN npm -g install yalc
# invalidate cache see https://stackoverflow.com/questions/36996046/how-to-prevent-dockerfile-caching-git-clone
ADD https://api.github.com/repos/$USER/$REPO/git/refs/heads/$BRANCH version.json
RUN git clone -b $BRANCH https://github.com/$USER/$REPO
WORKDIR ${BUILDDIR}/meta-diagram
RUN yarn && yarn run build:dev && yalc push --changed

WORKDIR ${BUILDDIR}
RUN yalc add @metacell/meta-diagram
RUN chmod +x installation.sh
RUN ./installation.sh -i 
RUN yarn global add concurrently wait-on react-app-rewired
#RUN yarn run test-no-watch

COPY . $BUILDDIR

ENV NODE_OPTIONS=--max_old_space_size=4096

CMD ["yarn", "run", "prod"]

EXPOSE 3000
