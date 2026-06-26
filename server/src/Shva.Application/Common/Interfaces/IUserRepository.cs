using Shva.Domain.Entities;

namespace Shva.Application.Common.Interfaces;

/// <summary>
/// Persistence boundary for <see cref="User"/> accounts.
/// </summary>
public interface IUserRepository
{
    /// <summary>Indicates whether a user already exists with the given (normalized) email.</summary>
    Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken = default);

    /// <summary>Loads a user by (normalized) email, or <c>null</c> when none exists.</summary>
    Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);

    /// <summary>Persists a newly registered user.</summary>
    Task AddAsync(User user, CancellationToken cancellationToken = default);
}
