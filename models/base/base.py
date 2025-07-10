from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Dict, Optional, Tuple


@dataclass
class PoseResult:
    index: Optional[int]
    angle: Optional[float]
    landmarks: Optional[
        Dict[str, Tuple[float, float]]
    ]  # 2D座標データ（例：{"RIGHT_ELBOW": (0.5, 0.6)})
    raw_landmarks: Optional[object]  # MediaPipeのLandmarkオブジェクト（描画用途）


class VideoSource(ABC):
    @abstractmethod
    def get_path(self) -> str:
        pass


class VideoOutput(ABC):
    @abstractmethod
    def write(self, pose_result):
        pass

    @abstractmethod
    def close(self):
        pass


class PoseModel(ABC):
    @abstractmethod
    def process(self, frame, index):
        pass
