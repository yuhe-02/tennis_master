import csv
from dataclasses import asdict, is_dataclass

import cv2
from base.base import PoseResult, VideoOutput


class FileVideoOutput(VideoOutput):
    def __init__(self, path: str, fps, size):
        self.out = cv2.VideoWriter(path, cv2.VideoWriter_fourcc(*"mp4v"), fps, size)

    def write(self, pose_result):
        self.out.write(pose_result)

    def close(self):
        self.out.release()


class CsvVideoOutput(VideoOutput):
    def __init__(self, path: str):
        self.file = open(path, "w", newline="", encoding="utf-8")
        self.writer = csv.writer(self.file)
        self.header_written = False

    def write(self, pose_result: PoseResult):
        if not is_dataclass(pose_result):
            raise TypeError("write() に渡す値は dataclass である必要があります")
        row_dict = asdict(pose_result)
        flat_row = {}
        for key, value in row_dict.items():
            if key == "landmarks" and value is not None:
                for name, (x, y) in value.items():
                    flat_row[f"{name}_x"] = x
                    flat_row[f"{name}_y"] = y
            elif key not in ["frame", "raw_landmarks"]:
                flat_row[key] = value

        # ヘッダー自動書き込み
        if not self.header_written:
            self.writer.writerow(flat_row.keys())
            self.header_written = True

        self.writer.writerow(flat_row.values())

    def close(self):
        self.file.close()
