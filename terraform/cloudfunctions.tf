resource "google_storage_bucket" "bucket" {
  name = "fc1-source-storage"
  location = "EU"
}

resource "google_storage_bucket_object" "archive" {
  name   = "index.zip"
  bucket = google_storage_bucket.bucket.name
  source = "function-source.zip"
}

resource "google_cloudfunctions_function" "function" {
  name        = "first-test-sql-insert-func"
  description = "-"
  runtime     = "python38"

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.archive.name
  trigger_http          = true
  timeout               = 60
  entry_point           = "insertanimal"
}

# IAM entry for a single user to invoke the function
resource "google_cloudfunctions_function_iam_member" "invoker" {
 cloud_function = google_cloudfunctions_function.function.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}