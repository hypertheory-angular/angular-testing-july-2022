

using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using OfferingsApi.Adapters;

namespace OfferingsApi.Controllers;

[ApiController]
[Route("")]
public class OfferingsController : ControllerBase
{

    private readonly MongoDbOfferingsAdapter _adapter;

    public OfferingsController(MongoDbOfferingsAdapter adapter)
    {
        _adapter = adapter;
    }

    [HttpGet]
    public async Task<ActionResult> GetAllOfferings()
    {
        var projection = Builders<Offering>.Projection.Expression(c => new OfferingListItem
        {
            Id = c.Id.ToString(),
            Course = c.Course.ToString(),
            StartDate = c.StartDate,
            StartTime = c.StartTime,
            EndTime = c.EndTime,
            Location = c.Location,
            Price = c.Price,
            DeliveryMethod = c.DeliveryMethod,
            HasSeatsAvailable = c.HasSeatsAvailable

        });

        var data = await _adapter.GetOfferingsCollection().Find(_ => true).Project(projection).ToListAsync();

        return Ok(new { data = data });
    }
}

public record OfferingListItem
{
    public string Id { get; init; } = string.Empty;
    public string Course { get; init; } = string.Empty;

    public DateTime StartDate { get; init; }

    public string StartTime { get; init; } = string.Empty;
    public string EndTime { get; init; } = string.Empty;
    public string Location { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public string DeliveryMethod { get; init; } = string.Empty;

    public bool HasSeatsAvailable { get; init; }
}