FROM --platform=linux/arm64 twentycrm/twenty-front

WORKDIR /app/front

CMD ["/bin/sh", "-c", "/app/front/scripts/inject-runtime-env.sh && serve build"]
