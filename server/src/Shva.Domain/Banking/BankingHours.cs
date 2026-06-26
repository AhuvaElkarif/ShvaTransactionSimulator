namespace Shva.Domain.Banking;

/// <summary>
/// Represents a daily banking-hours window and the rule that decides whether a given
/// local wall-clock time falls inside it.
/// </summary>
/// <param name="Open">Inclusive opening time.</param>
/// <param name="Close">Exclusive closing time.</param>
public readonly record struct BankingHours(TimeOnly Open, TimeOnly Close)
{
    /// <summary>
    /// Standard banking hours used by the simulator: 08:00–18:00.
    /// The window is treated as <c>[08:00, 18:00)</c> — 08:00 is approved, exactly 18:00 is rejected.
    /// </summary>
    public static readonly BankingHours Standard = new(new TimeOnly(8, 0), new TimeOnly(18, 0));

    /// <summary>
    /// Returns <c>true</c> when <paramref name="localTime"/> is within the window
    /// (<see cref="Open"/> inclusive, <see cref="Close"/> exclusive).
    /// </summary>
    public bool Contains(TimeOnly localTime) => localTime >= Open && localTime < Close;
}
