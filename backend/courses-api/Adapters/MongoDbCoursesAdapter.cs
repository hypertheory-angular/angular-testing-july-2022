using MongoDB.Driver;

namespace CoursesApi.Adapters;

public class MongoDbCoursesAdapter
{
    private readonly IMongoCollection<Course> _coursesCollection;
    public MongoDbCoursesAdapter(string connectionString)
    {
        var client = new MongoClient(connectionString);
        var db = client.GetDatabase("courses_db");

        _coursesCollection = db.GetCollection<Course>("courses");

    }

    public IMongoCollection<Course> GetCoursesCollection() => _coursesCollection;
}
