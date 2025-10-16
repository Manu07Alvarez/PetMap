using System.Diagnostics;
using Amazon;
using Amazon.Runtime;
using Amazon.S3;

namespace PetMap.Config
{
    
    public static class S3Config
    {
        public static IAmazonS3 CreateS3Client(IConfiguration configuration)
        {
            var s3Credentials = new BasicAWSCredentials(configuration["aws:s3:accessKeyId"], configuration["aws:s3:secretAccessKey"]);
            var s3Config = new AmazonS3Config
            {
                RegionEndpoint = RegionEndpoint.SAEast1,

            };
            return new AmazonS3Client(s3Credentials,s3Config);

        }
    }
}