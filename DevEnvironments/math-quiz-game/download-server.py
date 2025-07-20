#!/usr/bin/env python3
import http.server
import socketserver
import os

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

PORT = 8080
os.chdir('/home/drjang00/DevEnvironments/math-quiz-game')

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"📁 파일 다운로드 서버 시작!")
    print(f"🌐 브라우저에서 접속: http://localhost:{PORT}")
    print(f"📦 압축파일 다운로드: http://localhost:{PORT}/haewan-math-game.tar.gz")
    print(f"📖 설명서: http://localhost:{PORT}/INSTALL_GUIDE.md")
    print("⏹️  서버 종료: Ctrl+C")
    httpd.serve_forever()