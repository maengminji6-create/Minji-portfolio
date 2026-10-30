"""원본 이미지를 복사해서 가로 1600px 이하 WebP로 줄여 images/ 아래에 저장한다.
원본 파일은 건드리지 않는다. (docs/CONTENT.md 파일명 규칙)

사용법:
    .venv\\Scripts\\python tools/prepare-images.py 원본경로 images/폴더/새이름.webp
    .venv\\Scripts\\python tools/prepare-images.py --defaults      # 기존 프로젝트 자료 일괄 변환
"""
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
GITHUB = ROOT.parent
MAX_W = 1600

# (원본, 저장 위치) — 원본은 각 프로젝트 저장소
DEFAULTS = [
    ("COSTD/src/common/img/costd_logo.png", "images/cosmoa/cover/logo.png"),
    ("COSTD/src/common/img/login_bg.webp", "images/cosmoa/gallery/login-bg.webp"),
    ("Hanjeongseon/platform_core/static/images/hanjungsun_logo_stack.png", "images/hanjeongseon/cover/logo.png"),
    ("Hanjeongseon/content_studio/static/images/sns/product_giftset_wrapped.jpg", "images/hanjeongseon/cover/cover.webp"),
    ("Hanjeongseon/content_studio/static/images/sns/product_whole.jpg", "images/hanjeongseon/gallery/product-whole.webp"),
    ("Hanjeongseon/content_studio/static/images/sns/product_giftset_open.jpg", "images/hanjeongseon/gallery/product-giftset.webp"),
    ("Hanjeongseon/content_studio/static/images/sns/product_mango_yogurt_cut.jpg", "images/hanjeongseon/gallery/product-mango.webp"),
    ("Hanjeongseon/content_studio/static/images/sns/product_honey_dragonfruit_cut.jpg", "images/hanjeongseon/gallery/product-dragonfruit.webp"),
]


def convert(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as im:
        if im.width > MAX_W:
            im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
        if dst.suffix.lower() == ".png":
            im.save(dst, optimize=True)
        else:
            if im.mode not in ("RGB", "RGBA"):
                im = im.convert("RGB")
            im.save(dst, "WEBP", quality=82, method=6)
    print(f"{dst.relative_to(ROOT)}  ({dst.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    if sys.argv[1:] == ["--defaults"]:
        for src, dst in DEFAULTS:
            s = GITHUB / src
            if s.exists():
                convert(s, ROOT / dst)
            else:
                print(f"없음, 건너뜀: {src}")
    elif len(sys.argv) == 3:
        convert(Path(sys.argv[1]), ROOT / sys.argv[2])
    else:
        sys.exit(__doc__)
