from abc import ABC, abstractmethod


class VideoSource(ABC):
    @abstractmethod
    def get_path(self) -> str:
        pass


class VideoOutput(ABC):
    @abstractmethod
    def write(self, frame):
        pass

    @abstractmethod
    def close(self):
        pass


class PoseModel(ABC):
    @abstractmethod
    def process(self, frame):
        pass
