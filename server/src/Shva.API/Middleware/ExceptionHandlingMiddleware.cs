using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Shva.Application.Common.Exceptions;

namespace Shva.API.Middleware;

/// <summary>
/// Translates exceptions thrown by lower layers into RFC 7807 problem responses, so controllers
/// stay free of error-handling boilerplate and the API speaks one consistent error format.
/// </summary>
public sealed class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    /// <summary>Middleware entry point.</summary>
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            var errors = ex.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray());

            var problem = new ValidationProblemDetails(errors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "One or more validation errors occurred."
            };
            await WriteAsync(context, problem);
        }
        catch (NotFoundException ex)
        {
            await WriteAsync(context, Problem(StatusCodes.Status404NotFound, "Resource not found", ex.Message));
        }
        catch (ConflictException ex)
        {
            await WriteAsync(context, Problem(StatusCodes.Status409Conflict, "Conflict", ex.Message));
        }
        catch (UnauthorizedException ex)
        {
            await WriteAsync(context, Problem(StatusCodes.Status401Unauthorized, "Unauthorized", ex.Message));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception processing {Method} {Path}", context.Request.Method, context.Request.Path);
            await WriteAsync(context, Problem(StatusCodes.Status500InternalServerError, "Server error", "An unexpected error occurred."));
        }
    }

    private static ProblemDetails Problem(int status, string title, string detail) =>
        new() { Status = status, Title = title, Detail = detail };

    private static async Task WriteAsync(HttpContext context, ProblemDetails problem)
    {
        context.Response.StatusCode = problem.Status ?? StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/problem+json";
        await context.Response.WriteAsJsonAsync(problem, problem.GetType());
    }
}
