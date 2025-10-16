namespace PetMap.Repositories;
using Amazon.S3;
using Amazon.S3.Model;
using PetMap.Config;
public class FilesRepository(IAmazonS3 _s3Client): IFilesRepository
{
    public async Task FileInsert(string bucket, string key, Stream stream)
    {
        await _s3Client.PutObjectAsync(new PutObjectRequest
        {
            BucketName = bucket,
            Key = key,
            InputStream = stream
        });
    }

    public async Task FileDelete(string bucket, string key)
    {
        await _s3Client.DeleteObjectAsync(new DeleteObjectRequest
        {
            BucketName = bucket,
            Key = key
        });
    }

    public async Task FileUpdate(string bucket, string key, Stream stream)
    {
        await _s3Client.PutObjectAsync(new PutObjectRequest
        {
            BucketName = bucket,
            Key = key,
            InputStream = stream
        });
    }

    public async Task<Stream> FileGet(string bucket, string key)
    {
        var response = await _s3Client.GetObjectAsync(new GetObjectRequest
        {
            BucketName = bucket,
            Key = key
        });
        
        return response.ResponseStream;
        
    }
}
