import base64
import os
import shutil
from datetime import datetime

import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from runwayml import RunwayML

app = Flask(__name__)
CORS(app)

# Runway AI クライアント初期化
runway_client = None
RUNWAY_API_KEY = os.getenv("RUNWAY_API_KEY")

# アップロード用ディレクトリ
UPLOAD_FOLDER = "uploads"
VIDEOS_FOLDER = "videos"
GENERATED_VIDEOS_FOLDER = "generated_videos"

# ディレクトリが存在しない場合は作成
for folder in [UPLOAD_FOLDER, VIDEOS_FOLDER, GENERATED_VIDEOS_FOLDER]:
    if not os.path.exists(folder):
        os.makedirs(folder)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["VIDEOS_FOLDER"] = VIDEOS_FOLDER
app.config["GENERATED_VIDEOS_FOLDER"] = GENERATED_VIDEOS_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024 * 1024  # 100MB


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
        # ファイル名を一意にする
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{timestamp}_{file.filename}"

        # uploadsディレクトリに一時保存
        upload_filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(upload_filepath)

        # videosディレクトリに動画を保存
        video_filepath = os.path.join(app.config["VIDEOS_FOLDER"], filename)

        # ファイルをvideosディレクトリにコピー
        shutil.copy2(upload_filepath, video_filepath)

        # uploadsディレクトリのファイルは削除（必要に応じて）
        os.remove(upload_filepath)

        return jsonify(
            {
                "success": True,
                "filename": filename,
                "video_path": video_filepath,
                "message": "Video uploaded and saved successfully",
            }
        )


@app.route("/api/analyze", methods=["POST"])
def analyze_video():
    data = request.get_json()
    filename = data.get("filename")

    if not filename:
        return jsonify({"error": "Filename is required"}), 400

    # videosディレクトリ内のファイルパスを確認
    video_path = os.path.join(app.config["VIDEOS_FOLDER"], filename)

    if not os.path.exists(video_path):
        return jsonify({"error": "Video file not found"}), 404

    # モック解析結果
    mock_result = {
        "analysis_id": f"analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
        "filename": filename,
        "video_path": video_path,
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


@app.route("/api/generate-ideal-form", methods=["POST"])
def generate_ideal_form():
    """
    アップロードされた動画から理想のフォームを生成する
    """
    try:
        data = request.get_json()
        filename = data.get("filename")

        if not filename:
            return jsonify({"error": "Filename is required"}), 400

        # 元の動画ファイルパスを確認
        original_video_path = os.path.join(app.config["VIDEOS_FOLDER"], filename)

        if not os.path.exists(original_video_path):
            return jsonify({"error": "Original video file not found"}), 404

        # Runway AIのAPIキーが設定されていない場合はモック処理
        if not RUNWAY_API_KEY:
            return _generate_mock_ideal_form(filename)

        # Runway AIクライアントの初期化
        global runway_client
        if runway_client is None:
            runway_client = RunwayML(api_key=RUNWAY_API_KEY)

        # 動画ファイルをBase64エンコード
        with open(original_video_path, "rb") as video_file:
            video_data = base64.b64encode(video_file.read()).decode()

        # 理想のフォーム生成プロンプト
        ideal_form_prompt = _generate_ideal_form_prompt(data.get("analysis_results"))

        # Runway AIで動画生成
        task = runway_client.image_to_video.create(
            model="gen4_turbo",
            prompt_image=f"data:video/mp4;base64,{video_data}",
            prompt_text=ideal_form_prompt,
            ratio="1280:720",
            duration=5,
        )

        # タスクの完了を待つ
        result = task.wait_for_task_output()

        # 生成された動画を保存
        generated_filename = (
            f"ideal_form_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{filename}"
        )
        generated_path = os.path.join(
            app.config["GENERATED_VIDEOS_FOLDER"], generated_filename
        )

        # 生成された動画のURLから動画をダウンロード
        if result and hasattr(result, "url"):
            response = requests.get(result.url)
            if response.status_code == 200:
                with open(generated_path, "wb") as f:
                    f.write(response.content)
        else:
            # 結果がない場合はエラーを返す
            return jsonify(
                {"error": "Video generation failed - no output received"}
            ), 500

        return jsonify(
            {
                "success": True,
                "generated_filename": generated_filename,
                "generated_path": generated_path,
                "original_filename": filename,
                "message": "Ideal form video generated successfully",
            }
        )

    except Exception as e:
        return jsonify({"error": f"Generation failed: {str(e)}"}), 500


def _generate_mock_ideal_form(filename):
    """
    Runway AIのAPIキーが設定されていない場合のモック処理
    """
    # 元の動画をコピーして理想フォーム動画として保存
    original_path = os.path.join(app.config["VIDEOS_FOLDER"], filename)
    generated_filename = (
        f"ideal_form_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{filename}"
    )
    generated_path = os.path.join(
        app.config["GENERATED_VIDEOS_FOLDER"], generated_filename
    )

    shutil.copy2(original_path, generated_path)

    return jsonify(
        {
            "success": True,
            "generated_filename": generated_filename,
            "generated_path": generated_path,
            "original_filename": filename,
            "message": "Mock ideal form video generated (copy of original)",
            "note": "This is a mock response. Set RUNWAY_API_KEY environment variable for actual AI generation.",
        }
    )


def _generate_ideal_form_prompt(analysis_results=None):
    """
    分析結果に基づいて理想のフォーム生成プロンプトを作成
    """
    base_prompt = "Generate a perfect tennis form video showing ideal technique: "

    if analysis_results:
        # 分析結果に基づいたカスタムプロンプト
        improvements = []
        if "serve" in analysis_results:
            improvements.extend(analysis_results["serve"].get("improvements", []))
        if "forehand" in analysis_results:
            improvements.extend(analysis_results["forehand"].get("improvements", []))
        if "backhand" in analysis_results:
            improvements.extend(analysis_results["backhand"].get("improvements", []))

        if improvements:
            base_prompt += " Focus on: " + ", ".join(improvements[:3])
    else:
        # デフォルトの理想フォームプロンプト
        base_prompt += "perfect racket swing, proper body positioning, ideal follow-through, professional tennis technique"

    return base_prompt


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
