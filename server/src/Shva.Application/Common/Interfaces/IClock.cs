namespace Shva.Application.Common.Interfaces;

/// <summary>
/// Abstraction over the system clock so time-dependent logic can be unit-tested deterministically.
/// </summary>
public interface IClock
{
    /// <summary>The current instant in UTC.</summary>
    DateTimeOffset UtcNow { get; }
}
