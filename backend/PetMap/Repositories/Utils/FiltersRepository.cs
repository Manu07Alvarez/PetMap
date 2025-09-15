
namespace PetMap.Repositories.Utils;
using PetMap.Models;
using LinqToDB;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Linq.Dynamic.Core;
using Z.EntityFramework.Plus;
using PetMap.Dtos;

public static class FiltersRepository
{
    public static IQueryable<FilterResponse> ApplyFilters(IQueryable<PetPost> query, FilterRequest options)
    {
        var sQuery  = query.Select(p => new
        {
            Post = p,
            Score = 0.0
        });

        if (!string.IsNullOrEmpty(options.Contact))
        {
            sQuery = sQuery
            .Where(p => EF.Functions.TrigramsStrictWordSimilarity(p.Post.Contact, options.Contact) > 0)
            .Select(
                p => new
                {
                    p.Post,
                    Score =  p.Score + EF.Functions.TrigramsStrictWordSimilarity(p.Post.Contact, options.Contact)
                }
            ) ;
        }

        if (!string.IsNullOrEmpty(options.Name))
        {

            sQuery = sQuery
            .Where(p => !string.IsNullOrEmpty(p.Post.Name) && EF.Functions.TrigramsStrictWordSimilarity(p.Post.Name, options.Name) > 0)
            .Select(
                p => new
                {
                    p.Post,
                    Score = p.Score + EF.Functions.TrigramsStrictWordSimilarity(p.Post.Name!, options.Name)
                }
            ) ;
        }

        var rnQuery =
            from p in sQuery
            select new FilterResponse( 
                p.Post,
                Sql.Ext.RowNumber()
                    .Over()
                    .OrderByDesc(p.Score)
                    .ToValue()
            );

  
        return rnQuery;
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
        