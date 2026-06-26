using Shva.Application.Common.Interfaces;

namespace Shva.Infrastructure.Services;

/// <summary>Production <see cref="IClock"/> backed by the system clock.</summary>
public sealed class SystemClock : IClock
{
    /// <inheritdoc />
    public DateTimeOffset UtcNow => DateTimeOffset.UtcNow;
}
