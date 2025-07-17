
using PetMap.Models;
namespace PetMap.Repositories
{
    public interface ITagsRepository : IDisposable
    {
        IEnumerable<Tags> GetAllTags();
        Task<Tags> GetTagsByID(int tagID);
        void CreateTags(Tags post);
        void DeleteTags(int tagsID);
        void UpdateTags(Tags post);

        void Save();

    }
}