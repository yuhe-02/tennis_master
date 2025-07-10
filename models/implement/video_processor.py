import cv2
from base.base import PoseModel, PoseResult, VideoOutput, VideoSource


class VideoProcessor:
    def __init__(
        self,
        source: VideoSource,
        model: PoseModel,
        output: VideoOutput,
        output2: VideoOutput,
    ):
        self.source = source
        self.model = model
        self.output = output
        self.output2 = output2

    def run(self):
        path = self.source.get_path()
        cap = cv2.VideoCapture(path)
        frame_no: int = 1
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            result: PoseResult = self.model.process(frame, frame_no)
            if result.raw_landmarks:
                self.model.mp_drawing.draw_landmarks(
                    frame, result.raw_landmarks, self.model.mp_pose.POSE_CONNECTIONS
                )
            if result.angle is not None:
                cv2.putText(
                    frame,
                    f"{result.angle:.1f} deg",
                    (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1,
                    (255, 255, 255),
                    2,
                )
            self.output.write(frame)
            self.output2.write(result)
            frame_no += 1
        cap.release()
        self.output.close()
        print("✅ 処理完了")
