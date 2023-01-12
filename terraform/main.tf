resource "google_sql_database_instance" "sql-db-tf" {
  name             = "sql-db-tf"
  region           = "us-central1"
  database_version = "POSTGRES_12"
  settings {
    tier = "db-f1-micro"
  }

  deletion_protection  = "false"
}

resource "google_sql_database" "db-tf" {
  name     = "db-tf"
  instance = google_sql_database_instance.sql-db-tf.name
}

resource "google_sql_user" "db-user" {
  name     = "db-admin-user"
  instance = google_sql_database_instance.sql-db-tf.name
  password = "pass!123"
}