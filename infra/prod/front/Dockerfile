FROM --platform=linux/amd64 twentycrm/twenty-front:0.2.0-beta as front

CMD ["/bin/sh", "-c", "/app/front/scripts/inject-runtime-env.sh && serve build"]
