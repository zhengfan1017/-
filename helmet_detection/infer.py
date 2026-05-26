
import os
import argparse
import time
import cv2
import numpy as np
from paddle.inference import Config as PaddleConfig
from paddle.inference import create_predictor
from config import Config
from preprocess import preprocess
from postprocess import postprocess
from visualize import visualize


def load_model():
    model_file = os.path.join(Config.MODEL_DIR, "model.pdmodel")
    params_file = os.path.join(Config.MODEL_DIR, "model.pdiparams")
    if not os.path.exists(model_file) or not os.path.exists(params_file):
        raise FileNotFoundError(
            f"模型文件不存在: {model_file} 或 {params_file}\n请在 config.py 中正确配置 MODEL_DIR"
        )
    config = PaddleConfig(model_file, params_file)
    config.enable_use_gpu(100, 0)
    config.disable_glog_info()
    config.switch_ir_optim(True)
    config.enable_memory_optim()
    predictor = create_predictor(config)
    return predictor


def inference_single(predictor, image_path, output_dir=None):
    start_time = time.time()
    img, img_data, im_shape, scale_factor = preprocess(image_path)
    input_names = predictor.get_input_names()
    for i, name in enumerate(input_names):
        input_tensor = predictor.get_input_handle(name)
        if name == "im_shape":
            input_tensor.copy_from_cpu(im_shape)
        elif name == "image":
            input_tensor.copy_from_cpu(img_data)
        elif name == "scale_factor":
            input_tensor.copy_from_cpu(scale_factor)
    predictor.run()
    output_names = predictor.get_output_names()
    output_boxes = predictor.get_output_handle(output_names[0]).copy_to_cpu()
    output_num = predictor.get_output_handle(output_names[1]).copy_to_cpu()
    results = postprocess(output_boxes, output_num, img.shape[:2])
    end_time = time.time()
    infer_time = (end_time - start_time) * 1000
    print(f"推理时间: {infer_time:.2f} ms")
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, os.path.basename(image_path))
        visualize(img, results, output_path)
        print(f"结果保存至: {output_path}")
    return results


def inference_batch(predictor, image_dir, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    image_extensions = [".jpg", ".jpeg", ".png", ".bmp"]
    image_files = [
        f
        for f in os.listdir(image_dir)
        if os.path.splitext(f)[1].lower() in image_extensions
    ]
    print(f"找到 {len(image_files)} 张图片")
    total_time = 0
    for idx, image_file in enumerate(image_files):
        print(f"正在处理 [{idx+1}/{len(image_files)}]: {image_file}")
        image_path = os.path.join(image_dir, image_file)
        start = time.time()
        results = inference_single(predictor, image_path, output_dir)
        total_time += (time.time() - start) * 1000
    if len(image_files) > 0:
        print(f"平均推理时间: {total_time/len(image_files):.2f} ms/张")


def inference_camera(predictor, camera_id=0):
    cap = cv2.VideoCapture(camera_id)
    if not cap.isOpened():
        raise RuntimeError(f"无法打开摄像头 {camera_id}")
    print("按 'q' 键退出")
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        start = time.time()
        temp_path = "/tmp/temp_frame.jpg"
        cv2.imwrite(temp_path, frame)
        img, img_data, im_shape, scale_factor = preprocess(temp_path)
        input_names = predictor.get_input_names()
        for i, name in enumerate(input_names):
            input_tensor = predictor.get_input_handle(name)
            if name == "im_shape":
                input_tensor.copy_from_cpu(im_shape)
            elif name == "image":
                input_tensor.copy_from_cpu(img_data)
            elif name == "scale_factor":
                input_tensor.copy_from_cpu(scale_factor)
        predictor.run()
        output_names = predictor.get_output_names()
        output_boxes = predictor.get_output_handle(output_names[0]).copy_to_cpu()
        output_num = predictor.get_output_handle(output_names[1]).copy_to_cpu()
        results = postprocess(output_boxes, output_num, frame.shape[:2])
        frame = visualize(frame, results)
        fps = 1 / (time.time() - start)
        cv2.putText(
            frame,
            f"FPS: {fps:.1f}",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2,
        )
        cv2.imshow("Helmet Detection", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
    cap.release()
    cv2.destroyAllWindows()


def main():
    parser = argparse.ArgumentParser(description="安全帽检测模型 Paddle Inference 推理程序")
    parser.add_argument(
        "--mode",
        type=str,
        default="single",
        choices=["single", "batch", "camera"],
        help="推理模式: single(单张)/batch(批量)/camera(摄像头)",
    )
    parser.add_argument(
        "--model_dir",
        type=str,
        default=Config.MODEL_DIR,
        help="模型目录路径",
    )
    parser.add_argument(
        "--image",
        type=str,
        default="./test.jpg",
        help="单张图片路径(single模式)",
    )
    parser.add_argument(
        "--image_dir",
        type=str,
        default=None,
        help="图片目录路径(batch模式)",
    )
    parser.add_argument(
        "--output_dir",
        type=str,
        default="./output",
        help="结果保存目录",
    )
    parser.add_argument(
        "--camera_id",
        type=int,
        default=0,
        help="摄像头ID(camera模式)",
    )
    parser.add_argument(
        "--conf_threshold",
        type=float,
        default=Config.CONF_THRESHOLD,
        help="置信度阈值",
    )
    args = parser.parse_args()
    Config.MODEL_DIR = args.model_dir
    Config.CONF_THRESHOLD = args.conf_threshold
    print(f"正在加载模型...")
    try:
        predictor = load_model()
        print("模型加载成功!")
        if args.mode == "single":
            if args.image is None:
                raise ValueError("single模式需要指定 --image 参数")
            results = inference_single(predictor, args.image, args.output_dir)
            print(f"检测到 {len(results)} 个目标")
            for res in results:
                print(f"  - {res['class_name']}: {res['score']:.3f}")
        elif args.mode == "batch":
            if args.image_dir is None:
                raise ValueError("batch模式需要指定 --image_dir 参数")
            inference_batch(predictor, args.image_dir, args.output_dir)
        elif args.mode == "camera":
            inference_camera(predictor, args.camera_id)
    except Exception as e:
        print(f"错误: {e}")
        return 1
    return 0


if __name__ == "__main__":
    main()

