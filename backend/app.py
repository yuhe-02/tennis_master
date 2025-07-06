import os
from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# アップロード用ディレクトリ
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024  # 100MB


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})


@app.route("/api/upload", methods=["POST"])
def upload_video():
    if "video" not in request.files:
        return jsonify({"error": "No video file provided"}), 400

    file = request.files["video"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if file:
        filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}"
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        return jsonify(
            {
                "success": True,
                "filename": filename,
                "message": "Video uploaded successfully",
            }
        )


@app.route("/api/analyze", methods=["POST"])
def analyze_video():
    data = request.get_json()
    filename = data.get("filename")

    if not filename:
        return jsonify({"error": "Filename is required"}), 400

    # モック解析結果
    mock_result = {
        "analysis_id": f"analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
        "filename": filename,
        "timestamp": datetime.now().isoformat(),
        "results": {
            "overall_score": 85,
            "form_analysis": {
                "serve": {
                    "score": 88,
                    "feedback": "サーブフォームは良好です。トスの位置がやや前気味です。",
                    "improvements": ["トスの位置を少し後ろに", "肘の角度を意識"],
                },
                "forehand": {
                    "score": 82,
                    "feedback": "フォアハンドは安定しています。フォロースルーを改善できます。",
                    "improvements": ["フォロースルーを長く", "体重移動を意識"],
                },
                "backhand": {
                    "score": 78,
                    "feedback": "バックハンドは練習が必要です。",
                    "improvements": ["グリップを確認", "体の回転を意識"],
                },
            },
        },
    }

    return jsonify(mock_result)


@app.route("/api/history", methods=["GET"])
def get_analysis_history():
    # モック履歴データ
    mock_history = [
        {
            "id": 1,
            "date": "2024-01-15",
            "filename": "tennis_practice_001.mp4",
            "score": 85,
            "status": "completed",
        },
        {
            "id": 2,
            "date": "2024-01-10",
            "filename": "serve_practice.mp4",
            "score": 78,
            "status": "completed",
        },
    ]

    return jsonify(mock_history)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
