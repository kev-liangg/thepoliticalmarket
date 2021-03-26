# script to run the frontend react docker image
# will build the image if it does not exist

docker inspect docker-react > /dev/null

if [ $? -eq 1 ]; then
    docker build . -t docker-react
fi

docker run -p 3000:3000 -t docker-react