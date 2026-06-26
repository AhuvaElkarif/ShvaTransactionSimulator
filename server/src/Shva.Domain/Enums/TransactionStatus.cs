namespace Shva.Domain.Enums;

/// <summary>
/// The outcome of a transaction simulation.
/// </summary>
public enum TransactionStatus
{
    /// <summary>The submitted instant fell outside the region's banking hours.</summary>
    Rejected = 0,

    /// <summary>The submitted instant fell within the region's banking hours.</summary>
    Approved = 1
}
