# script to run the backend python/flask docker image
# will build the image if it does not exist
# uses the same image as backend deploy script

docker inspect logicshare-backend > /dev/null

if [ $? -eq 1 ]; then
    docker build . -t logicshare-backend
fi

docker run -t logicshare-backend