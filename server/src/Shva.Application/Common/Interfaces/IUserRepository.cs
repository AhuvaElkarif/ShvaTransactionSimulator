using Shva.Domain.Entities;

namespace Shva.Application.Common.Interfaces;

/// <summary>
/// Persistence boundary for <see cref="User"/> accounts.
/// </summary>
public interface IUserRepository
{
    Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken = default);

    Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);

    Task AddAsync(User user, CancellationToken cancellationToken = default);
}
