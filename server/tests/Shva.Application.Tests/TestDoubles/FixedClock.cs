using Shva.Application.Common.Interfaces;

namespace Shva.Application.Tests.TestDoubles;

/// <summary>An <see cref="IClock"/> that always returns a preset instant — keeps tests deterministic.</summary>
public sealed class FixedClock(DateTimeOffset now) : IClock
{
    public DateTimeOffset UtcNow { get; } = now;
}
