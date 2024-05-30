FROM golang:1.22.1-alpine as builder

WORKDIR /app

COPY ./backend/go.mod ./
COPY ./backend/go.sum ./

RUN go mod download

COPY ./api ./

RUN CGO_ENABLED=0 go build -a --trimpath --installsuffix cgo --ldflags="-s" -o main

FROM alpine:latest

COPY --from=builder /app/main ./

CMD [ "./main" ]