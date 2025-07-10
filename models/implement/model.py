import cv2
import mediapipe as mp
import numpy as np
from base.base import PoseModel, PoseResult


class BlazePoseModel(PoseModel):
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.mp_drawing = mp.solutions.drawing_utils
        self.pose = self.mp_pose.Pose(
            static_image_mode=False,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5,
        )

    def process(self, frame, index) -> PoseResult:
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.pose.process(rgb)

        raw_landmarks = results.pose_landmarks if results.pose_landmarks else None
        landmarks = None

        if raw_landmarks:
            # 2D座標（必要なら）
            lm = raw_landmarks.landmark
            landmarks = {
                name.name: (lm[name.value].x, lm[name.value].y)
                for name in self.mp_pose.PoseLandmark
            }

            # 描画
            self.mp_drawing.draw_landmarks(
                frame,
                raw_landmarks,
                self.mp_pose.POSE_CONNECTIONS,
                self.mp_drawing.DrawingSpec(
                    color=(0, 255, 0), thickness=2, circle_radius=2
                ),
                self.mp_drawing.DrawingSpec(color=(0, 0, 255), thickness=2),
            )

        return PoseResult(
            index=index,
            angle=None,  # BlazePoseModelは角度を計算しない
            landmarks=landmarks,
            raw_landmarks=raw_landmarks,
            frame=frame,
        )

    # def ref_frame(self, frome, pose_result: PoseResult):


class PoseAngleExtractor(PoseModel):
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.mp_drawing = mp.solutions.drawing_utils
        self.pose = self.mp_pose.Pose(
            static_image_mode=False,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5,
        )

    def process(self, frame, index) -> PoseResult:
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.pose.process(rgb)

        if not results.pose_landmarks:
            return PoseResult(angle=None, landmarks=None, raw_landmarks=None)

        lm = results.pose_landmarks.landmark

        def get_xy(p):
            return (lm[p].x, lm[p].y)

        # 関節の2D座標取得
        coords = {
            "RIGHT_SHOULDER": get_xy(self.mp_pose.PoseLandmark.RIGHT_SHOULDER),
            "RIGHT_ELBOW": get_xy(self.mp_pose.PoseLandmark.RIGHT_ELBOW),
            "RIGHT_WRIST": get_xy(self.mp_pose.PoseLandmark.RIGHT_WRIST),
        }

        # 角度計算
        shoulder = np.array(coords["RIGHT_SHOULDER"])
        elbow = np.array(coords["RIGHT_ELBOW"])
        wrist = np.array(coords["RIGHT_WRIST"])
        vec1 = shoulder - elbow
        vec2 = wrist - elbow
        cosine = np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))
        angle = np.degrees(np.arccos(np.clip(cosine, -1.0, 1.0)))

        return PoseResult(
            index=index,
            angle=angle,
            landmarks=coords,
            raw_landmarks=results.pose_landmarks,
        )
