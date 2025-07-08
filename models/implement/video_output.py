import cv2
from base.base import VideoOutput


class FileVideoOutput(VideoOutput):
    def __init__(self, path: str, fps, size):
        self.out = cv2.VideoWriter(path, cv2.VideoWriter_fourcc(*"mp4v"), fps, size)

    def write(self, frame):
        self.out.write(frame)

    def close(self):
        self.out.release()
