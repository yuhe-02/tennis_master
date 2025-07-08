import tempfile

import boto3
import requests
from base.base import VideoSource


class LocalVideoSource(VideoSource):
    def __init__(self, path: str):
        self.path = path

    def get_path(self) -> str:
        return self.path


class HTTPVideoSource(VideoSource):
    def __init__(self, url: str):
        self.url = url

    def get_path(self) -> str:
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
        r = requests.get(self.url, stream=True)
        for chunk in r.iter_content(chunk_size=8192):
            tmp.write(chunk)
        tmp.close()
        return tmp.name


class S3VideoSource(VideoSource):
    def __init__(self, s3_uri: str):
        self.s3_uri = s3_uri

    def get_path(self) -> str:
        s3 = boto3.client("s3")
        bucket, key = self.s3_uri.replace("s3://", "").split("/", 1)
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
        s3.download_file(bucket, key, tmp.name)
        return tmp.name
