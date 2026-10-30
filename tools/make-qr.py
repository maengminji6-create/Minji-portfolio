"""배포 주소로 QR 코드 PNG를 만든다.
사용법:  pip install qrcode[pil]
        python tools/make-qr.py https://내주소.vercel.app
"""
import sys
import qrcode

if len(sys.argv) < 2:
    sys.exit("주소를 같이 적어주세요. 예: python tools/make-qr.py https://minji-portfolio.vercel.app")

qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=20, border=4)
qr.add_data(sys.argv[1])
qr.make(fit=True)
qr.make_image(fill_color="#222222", back_color="white").save("portfolio-qr.png")
print("portfolio-qr.png 저장 완료")
