export class MigrationError extends Error {
  constructor(message: string) {
    super(`[MigrationError] ${message}`);
    this.name = "MigrationError";
  }
}

export class MigrationHealthCheckError extends Error {
  constructor(message: string) {
    super(`[MigrationHealthCheckError] ${message}`);
    this.name = "MigrationError";
  }
}
