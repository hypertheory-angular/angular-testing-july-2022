using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CoursesApi.Adapters;

public class Course
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; set; }


    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;


    [BsonElement("description")]
    public string Description { get; set; } = string.Empty;



    [BsonElement("numberOfDays")]
    public int NumberOfDays { get; set; }
}