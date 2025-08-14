
namespace PetMap.Repositories.Utils;
using PetMap.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using Z.EntityFramework.Plus;

public static class FiltersRepository
{
    public class GetFilters<T>(Dictionary<string,string> Options) where T: PetPost
    {       
        public Dictionary<string, Func<IQueryable<T>, IQueryable<T>>> Filters { get; set; } = new() {
            ["Direction"] = (query) => Options["Direction"] == "desc" ? 
                query.OrderByDescending(p => p.Id) : query.OrderBy(p => p.Id),
            ["Contact"] = (query) => query.Where(p => p.Contact.Contains(Options["Contact"])),
            ["Location"] = (query) => query.Where(p => p.Location != null),
            ["Name"] = (query) => query.Where(p => !string.IsNullOrEmpty(Options["Name"]) && p.Name!.Contains(Options["Name"])),
        }; 
        
    }
    public static IQueryable<PetPost> ApplyFilters(IQueryable<PetPost> query, Dictionary<string, string> options)
    {

        var filters = new GetFilters<PetPost>(options);
        foreach (var key in options.Keys)
        {
            query = filters.Filters[key].Invoke(query);
        }

        return query;
    }
}
