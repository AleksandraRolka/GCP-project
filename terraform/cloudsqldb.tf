resource "google_sql_database_instance" "postgresql" {
  name = "sql-db-tf-v3"
  project = "${var.project_id}"
  database_version = "POSTGRES_11"
  region = "${var.region}"

  settings {
    tier = "db-f1-micro"
  }
  deletion_protection = false
}

resource "google_sql_database" "postgresql_db" {
  name      = "db-tf"
  instance  = "${google_sql_database_instance.postgresql.name}"
}

resource "google_sql_user" "postgresql_user" {
  name     = "db-user"
  instance = "${google_sql_database_instance.postgresql.name}"
  password = "pass!123"
}