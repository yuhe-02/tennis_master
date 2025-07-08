import cv2
from base.base import PoseModel, VideoOutput, VideoSource


class VideoProcessor:
    def __init__(self, source: VideoSource, model: PoseModel, output: VideoOutput):
        self.source = source
        self.model = model
        self.output = output

    def run(self):
        path = self.source.get_path()
        cap = cv2.VideoCapture(path)
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            processed = self.model.process(frame)
            self.output.write(processed)
        cap.release()
        self.output.close()
        print("✅ 処理完了")
