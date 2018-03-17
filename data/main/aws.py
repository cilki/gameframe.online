# --------------------------------
# GameFrame AWS                  -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from functools import lru_cache

import boto3
from botocore.exceptions import ClientError


@lru_cache(maxsize=1)
def S3():
    """
    Create the AWS S3 client once
    """
    return boto3.client('s3')


def upload_image(image, target):
    """
    Upload an image to S3 if required
    """

    # Check for existence
    try:
        S3().head_object(Bucket='gameframe', Key=target)
        return
    except ClientError:  # TODO make error more specific if possible
        pass

    # Upload
    S3().upload_file(image, 'gameframe', target)
