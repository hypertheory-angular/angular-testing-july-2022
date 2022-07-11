using MongoDB.Driver;

namespace OfferingsApi.Adapters;

public class MongoDbOfferingsAdapter
{
    private readonly IMongoCollection<Offering> _OfferingsCollection;
    public MongoDbOfferingsAdapter(string connectionString)
    {
        var client = new MongoClient(connectionString);
        var db = client.GetDatabase("offerings_db");

        _OfferingsCollection = db.GetCollection<Offering>("offerings");

    }

    public IMongoCollection<Offering> GetOfferingsCollection() => _OfferingsCollection;
}
