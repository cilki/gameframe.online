# --------------------------------
# GameFrame AWS                  -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import boto3
from botocore.exceptions import ClientError

"""
The S3 interface
"""
S3 = boto3.client('s3')


def upload_image(image, target):
    """
    Upload an image to S3 if required
    """

    # Check for existence
    try:
        S3.head_object(Bucket='gameframe', Key=target)
        return
    except ClientError:  # TODO make error more specific if possible
        pass

    # Upload
    S3.upload_file(image, 'gameframe', target,
                   ExtraArgs={'ContentType': 'image/png'})
