variable "network_external_id" {
  type    = string
  default = "0f9c3806-bd21-490f-918d-4a6d1c648489"
}

variable "network_external_name" {
  type    = string
  default = "ext-floating1"
}

variable "network_internal_dev" {
  type    = string
  default = "internal_dev"
}

variable "network_subnet_cidr" {
  type    = string
  default = "10.0.1.0/24"
}

variable "ssh_public_key_default_user" {
  type    = string
  default = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDQkIf32EwYaPgJ0rPBj+gR+5cGaFdQPfOIFc4EWdYI2w2ZMMDxtAWmuBq5POhD6e49BqYcP9m26axartNDNlXdqveRNRSkXVDNHv/mTAB4alrrHwzYMBuB0xmxjRd+q3LzJ6GiaJC4tf27iEGs5Vb/rGhmG9JA2ZvQsucnmpaQTp1QDitKrO6yFhAuLJ+h42/KWfnQ/xyQ7c7F8GbpO2qZlRyKw6iCEaPG9PMahVrq0mcVUkXeIRzKokJ4Hdbygk8afLzNyU8KaZ9kylt8kjsbXUcvD05LQMwHu9gcTJelpcAOiTrIW8AqHMcqmcEoecoxJfjid+A4u3ZusaWJdXgYuVkSMezkvrVRA4KuL4mCMp4nblXONxN4wPr6RJ9ecReeCG0oYpkK1CRDr/b3c9vPpEDzmX8Dt1rDRzYU1Wx4K913KzTlYuBxtuUzHKVI7d4pphh9TPx2/kck4XVxQyz+pzLQbYCxBA/A+nMnIqSGOlsZ3MDPQUer2CjFRzRbOeM= clement@mbp-de-clement.home"
}

variable "instance_image_id" {
  type    = string
  default = "cdf81c97-4873-473b-b0a3-f407ce837255"
}

variable "instance_flavor_name" {
  type    = string
  default = "a1-ram2-disk20-perf1"
}

variable "instance_security_groups" {
  type    = list(any)
  default = ["default"]
}

variable "metadatas" {
  type = map(string)
  default = {
    "environment" = "dev"
  }
}
