resource "google_service_account" "proxy_account" {
  account_id = "cloud-sql-proxy"
}
resource "google_project_iam_member" "role" {
  project = "gcp-university-project"
  role   = "roles/cloudsql.admin"
  member = "serviceAccount:${google_service_account.proxy_account.email}"
}