namespace Shva.Application.Common.Exceptions;

/// <summary>
/// Base type for expected, business-level errors. The API layer maps these to HTTP status codes
/// via a single exception-handling middleware, keeping controllers free of try/catch noise.
/// </summary>
public abstract class AppException(string message) : Exception(message);

public sealed class NotFoundException(string message) : AppException(message);

public sealed class ConflictException(string message) : AppException(message);

public sealed class UnauthorizedException(string message) : AppException(message);
