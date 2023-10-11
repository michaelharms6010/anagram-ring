# Define variables
$sourceFolder = "C:\src\circle-text\build"  # Change to your source folder path
$bucketName = "anagram-ring"
$cloudfrontDistributionId = "ECPNPL1044EYB"

# Copy the folder to S3
aws s3 cp $sourceFolder s3://$bucketName/ --recursive

# Create a CloudFront invalidation
aws cloudfront create-invalidation --distribution-id $cloudfrontDistributionId --paths "/*"