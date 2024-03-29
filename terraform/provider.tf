terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.48.0"
    }
  }
}

provider "google" {
  credentials = "${file(var.gcp-creds)}"
  project = "${var.project_id}"
  region  = "${var.region}"
}