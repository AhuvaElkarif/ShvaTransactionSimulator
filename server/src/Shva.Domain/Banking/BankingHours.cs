namespace Shva.Domain.Banking;

/// <summary>
/// Represents a daily banking-hours window and the rule that decides whether a given
/// local wall-clock time falls inside it.
/// </summary>
/// <param name="Open">Inclusive opening time.</param>
/// <param name="Close">Exclusive closing time.</param>
public readonly record struct BankingHours(TimeOnly Open, TimeOnly Close)
{
    public static readonly BankingHours Standard = new(new TimeOnly(8, 0), new TimeOnly(18, 0));
    
    public bool Contains(TimeOnly localTime) => localTime >= Open && localTime < Close;
}
