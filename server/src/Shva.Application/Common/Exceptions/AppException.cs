namespace Shva.Application.Common.Exceptions;

/// <summary>
/// Base type for expected, business-level errors. The API layer maps these to HTTP status codes
/// via a single exception-handling middleware, keeping controllers free of try/catch noise.
/// </summary>
public abstract class AppException(string message) : Exception(message);

/// <summary>Requested resource does not exist (maps to HTTP 404).</summary>
public sealed class NotFoundException(string message) : AppException(message);

/// <summary>Request conflicts with current state, e.g. a duplicate email (maps to HTTP 409).</summary>
public sealed class ConflictException(string message) : AppException(message);

/// <summary>Authentication failed, e.g. invalid credentials (maps to HTTP 401).</summary>
public sealed class UnauthorizedException(string message) : AppException(message);
