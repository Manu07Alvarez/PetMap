namespace PetMap.Repositories
{
    public interface IFilesRepository
    {
        Task FileInsert(string bucket, string key, Stream stream);
        Task FileDelete(string bucket, string key);
        Task<Stream> FileGet(string bucket, string key);
        Task FileUpdate(string bucket, string key, Stream stream);
    }
}