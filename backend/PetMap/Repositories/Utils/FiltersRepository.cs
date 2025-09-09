
namespace PetMap.Repositories.Utils;
using PetMap.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Linq.Dynamic.Core;
using Z.EntityFramework.Plus;
using PetMap.Dtos;

public static class FiltersRepository
{
    public static IQueryable<PetPost> ApplyFilters(IQueryable<PetPost> query, GetFilters options)
    {

        if (!string.IsNullOrEmpty(options.Contact))
        {
            query = query.Where(p => p.Contact.Contains(options.Contact));
        }

        if (!string.IsNullOrEmpty(options.Name))
        {
            query = query.Where(p => p.Name != null && p.Name.Contains(options.Name));
        }

        if (options.Location != null) // puedes agregar un flag en tu DTO
        {
            query = query.Where(p => p.Location != null);
        }


        return query;
    }

    public static IQueryable<PetPost> Ordering(
        IQueryable<PetPost> query,
        bool? direction,   // true = ASC, false = DESC, null = no ordenar
        string fill       // campo a ordenar ("Name", "UpdatedAt", etc.)
        )
    {
        if (direction == null || string.IsNullOrEmpty(fill))
            return query;

        var dir = direction.Value ? "asc" : "desc";

        if (query is IOrderedQueryable<PetPost> queryable)
        {
            query = queryable
                .ThenBy($"{fill} {dir}");
        }
        else
        {
            query = query.OrderBy($"{fill} {dir}");
        }

        return query;
    }
        

    public static IQueryable<PetPost> ApplyOrdering(IQueryable<PetPost> query, GetOrder order)
    {
        if (order.Date != null)
        {
            query = (bool)order.Date ?
            query.OrderBy(p => p.UpdatedAt) : query.OrderByDescending(p => p.UpdatedAt);
        }

        query = Ordering(query, order.Name, "Name");


        query = Ordering(query, order.Contact, "Contact");

        return query;
    }
}
        