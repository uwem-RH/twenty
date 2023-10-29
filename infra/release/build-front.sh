
docker buildx build \
--push \
--no-cache \
--platform linux/amd64,linux/arm64 \
-f ./infra/build/front/Dockerfile -t twentycrm/twenty-front:0.2.0-beta  .
