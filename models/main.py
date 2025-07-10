import cv2
from implement.model import PoseAngleExtractor
from implement.video_output import CsvVideoOutput, FileVideoOutput
from implement.video_processor import VideoProcessor
from implement.video_source import LocalVideoSource

if __name__ == "__main__":
    source = LocalVideoSource("practice_tennis.mp4")
    cap_test = cv2.VideoCapture(source.get_path())
    fps = cap_test.get(cv2.CAP_PROP_FPS)
    size = (
        int(cap_test.get(cv2.CAP_PROP_FRAME_WIDTH)),
        int(cap_test.get(cv2.CAP_PROP_FRAME_HEIGHT)),
    )
    cap_test.release()

    output = FileVideoOutput("output_poseangle.mp4", fps, size)
    csv_output = CsvVideoOutput("output_poseangle.csv")
    # model = BlazePoseModel()
    model = PoseAngleExtractor()

    processor = VideoProcessor(source, model, output, csv_output)
    processor.run()
