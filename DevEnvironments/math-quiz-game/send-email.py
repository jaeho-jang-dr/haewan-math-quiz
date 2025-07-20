#!/usr/bin/env python3
"""
이메일로 압축파일 전송하는 스크립트
사용법: python3 send-email.py your-email@gmail.com
"""
import smtplib
import sys
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import os

def send_file_by_email(to_email):
    file_path = "/home/drjang00/DevEnvironments/math-quiz-game/haewan-math-game.tar.gz"
    
    if not os.path.exists(file_path):
        print("❌ 압축파일을 찾을 수 없습니다!")
        return
    
    print(f"📧 {to_email}로 파일을 전송하려면 이메일 설정이 필요합니다.")
    print("📝 Gmail, Outlook 등의 SMTP 설정을 추가해야 합니다.")
    print(f"📁 파일 경로: {file_path}")
    print(f"📦 파일 크기: {os.path.getsize(file_path)} bytes")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("사용법: python3 send-email.py your-email@example.com")
    else:
        send_file_by_email(sys.argv[1])