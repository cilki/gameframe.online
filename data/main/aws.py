# --------------------------------
# GameFrame AWS                  -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import boto3


S3 = boto3.client('s3')


def upload_image(image, target):
    """
    Upload an image to S3 if required
    """

    # TODO check for existence

    # Upload
    S3.upload_file(image, 'gameframe', 'image/cover/' + target)
