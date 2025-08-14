using Amazon;
using Amazon.S3;

namespace PetMap.Config
{
    public static class S3Config
    {

        public static IAmazonS3 CreateS3Client()
        {
            var s3Config = new AmazonS3Config
            {
                ServiceURL = "http://localhost:3900",
                ForcePathStyle = true,
                RegionEndpoint = RegionEndpoint.SAEast1
            };
            return new AmazonS3Client(s3Config);

        }
    }
}