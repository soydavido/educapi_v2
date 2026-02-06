export class PostgresDbErrors {
  static readonly UNIQUE_VIOLATION = '23505';
  static readonly FOREIGN_KEY_VIOLATION = '23503';
  static readonly NOT_NULL_VIOLATION = '23502';
  static readonly CHECK_VIOLATION = '23514';
  static readonly EXCLUSION_VIOLATION = '23P01';

  static readonly CONNECTION_FAILURE = '08006';
  static readonly CONNECTION_DOES_NOT_EXIST = '08003';

  static readonly SYNTAX_ERROR = '42601';
  static readonly INVALID_TEXT_REPRESENTATION = '22P02';

  static getErrorCode(e: any): string | undefined {
    return e?.code ?? e?.driverError?.code;
  }

  static isUniqueViolation(e: any): boolean {
    return this.getErrorCode(e) === this.UNIQUE_VIOLATION;
  }

  static isForeignKeyViolation(e: any): boolean {
    return this.getErrorCode(e) === this.FOREIGN_KEY_VIOLATION;
  }

  static isNotNullViolation(e: any): boolean {
    return this.getErrorCode(e) === this.NOT_NULL_VIOLATION;
  }

  static isCheckViolation(e: any): boolean {
    return this.getErrorCode(e) === this.CHECK_VIOLATION;
  }

  static isExclusionViolation(e: any): boolean {
    return this.getErrorCode(e) === this.EXCLUSION_VIOLATION;
  }

  static isConnectionFailure(e: any): boolean {
    return this.getErrorCode(e) === this.CONNECTION_FAILURE;
  }

  static isConnectionDoesNotExist(e: any): boolean {
    return this.getErrorCode(e) === this.CONNECTION_DOES_NOT_EXIST;
  }

  static isSyntaxError(e: any): boolean {
    return this.getErrorCode(e) === this.SYNTAX_ERROR;
  }

  static isInvalidTextRepresentation(e: any): boolean {
    return this.getErrorCode(e) === this.INVALID_TEXT_REPRESENTATION;
  }
}
