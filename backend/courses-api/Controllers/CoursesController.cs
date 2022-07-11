using CoursesApi.Adapters;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
namespace CoursesApi.Controllers;

[ApiController]
[Route("")]
public class CoursesController : ControllerBase
{

    private readonly MongoDbCoursesAdapter _adapter;

    public CoursesController(MongoDbCoursesAdapter adapter)
    {
        this._adapter = adapter;
    }

    [HttpGet]
    public async Task<ActionResult> GetAllCourses()
    {

        var projection = Builders<Course>.Projection.Expression(c => new CourseListItem
        {
            Id = c.Id.ToString(),
            Title = c.Title,
            Description = c.Description,
            NumberOfDays = c.NumberOfDays
        });
        var data = await _adapter.GetCoursesCollection().Find(_ => true).Project(projection).ToListAsync();
        return Ok(new { data = data });
    }
}

public record CourseListItem
{
    public string Id { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public int NumberOfDays { get; init; }
}