FROM golang:1.22.1-alpine as builder

WORKDIR /app

COPY ./apps/api/go.* ./

RUN go mod download

COPY ./apps/api ./

RUN CGO_ENABLED=0 go build -a --trimpath --installsuffix cgo --ldflags="-s" -o main ./cmd/main.go

FROM gcr.io/distroless/static-debian12

COPY --from=builder /app/main ./

CMD [ "./main" ]