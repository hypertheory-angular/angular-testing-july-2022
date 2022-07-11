using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OfferingsApi.Adapters;

public class Offering
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("course")]
    public ObjectId Course { get; set; }

    [BsonElement("startDate")]
    public DateTime StartDate { get; set; }


    [BsonElement("startTime")]
    public string StartTime { get; set; } = string.Empty;

    [BsonElement("endTime")]
    public string EndTime { get; set; } = string.Empty;

    [BsonElement("location")]
    public string Location { get; set; } = string.Empty;
    [BsonElement("price")]
    public decimal Price { get; set; }

    [BsonElement("deliveryMethod")]
    public string DeliveryMethod { get; set; } = string.Empty;

    [BsonElement("hasSeatsAvailable")]
    public bool HasSeatsAvailable { get; set; }
}