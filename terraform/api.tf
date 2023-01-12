resource "google_project_service" "iam-googleapis-com-api" {
  project = "gcp-university-project"
  service = "iam.googleapis.com"
}