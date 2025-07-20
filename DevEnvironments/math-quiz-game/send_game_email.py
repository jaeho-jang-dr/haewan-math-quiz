#!/usr/bin/env python3
"""
해완이의 수학 게임을 이메일로 전송하는 스크립트
"""
import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders

def send_game_email():
    # 파일 경로
    file_path = "/home/drjang00/haewan-math-game.tar.gz"
    
    if not os.path.exists(file_path):
        print("❌ 압축파일을 찾을 수 없습니다!")
        return False
    
    # 이메일 설정
    to_email = "drjang00@gmail.com"
    subject = "📱 해완이의 수학 게임 - iPhone용 앱 파일"
    
    # 이메일 본문
    body = """
안녕하세요! 

해완이를 위한 맞춤형 수학 게임이 완성되었습니다! 🎉

📦 첨부파일: haewan-math-game.tar.gz (219KB)

📱 아이폰 설치 방법:
1. 첨부파일을 다운로드하여 압축 해제
2. index.html 파일을 Safari로 열기
3. "홈화면에 추가"를 터치해서 앱으로 설치

🎮 게임 특징:
- "안녕 해완!" 맞춤 환영 메시지
- 한국어 음성 인사 및 격려
- 아이폰에 완벽 최적화된 UI
- 게임 중 메뉴 돌아가기 기능
- 선명한 성공/실패 메시지

🌟 특별 기능:
- 자동으로 "김해완" 플레이어 추가
- 연속 정답 시 격려 음성
- 틀렸을 때 위로 음성
- PWA 지원으로 오프라인 플레이 가능

재미있게 수학 공부하세요! 📚✨

---
해완이의 수학 게임 개발팀
"""

    # 이메일 메시지 생성
    msg = MIMEMultipart()
    msg['From'] = "game-dev@local"
    msg['To'] = to_email
    msg['Subject'] = subject
    
    # 본문 추가
    msg.attach(MIMEText(body, 'plain', 'utf-8'))
    
    # 파일 첨부
    try:
        with open(file_path, "rb") as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
        
        encoders.encode_base64(part)
        part.add_header(
            'Content-Disposition',
            f'attachment; filename= haewan-math-game.tar.gz'
        )
        msg.attach(part)
        
        print(f"📧 이메일 준비 완료!")
        print(f"📮 수신자: {to_email}")
        print(f"📦 첨부파일: {os.path.basename(file_path)} ({os.path.getsize(file_path)} bytes)")
        print(f"📄 제목: {subject}")
        
        # 실제 전송을 위해서는 SMTP 서버 설정이 필요합니다
        print("\n⚠️  실제 이메일 전송을 위해서는 SMTP 서버 설정이 필요합니다.")
        print("💡 대신 다음 방법들을 사용해보세요:")
        print("   1. Gmail 웹에서 파일을 직접 첨부")
        print("   2. 파일을 클라우드(Google Drive, iCloud)에 업로드 후 링크 공유")
        print("   3. AirDrop으로 Mac → iPhone 직접 전송")
        
        return True
        
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        return False

if __name__ == "__main__":
    send_game_email()