import tkinter as tk
from tkinter import font
import subprocess
import threading
import sys
import os

class ServerManagerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Aethelgard Server Manager")
        self.root.geometry("450x350")
        self.root.configure(bg="#1a1a20")
        
        self.process = None
        self.output_thread = None

        # Custom Fonts
        self.title_font = font.Font(family="Segoe UI", size=16, weight="bold")
        self.status_font = font.Font(family="Segoe UI", size=12, weight="bold")
        self.btn_font = font.Font(family="Segoe UI", size=10, weight="bold")

        # Title
        title = tk.Label(root, text="Bifröst Engine Control", font=self.title_font, bg="#1a1a20", fg="#cfa94d")
        title.pack(pady=(15, 5))

        # Status
        self.status_var = tk.StringVar()
        self.status_var.set("Status: GESTOPPT 🔴")
        self.status_label = tk.Label(root, textvariable=self.status_var, font=self.status_font, bg="#1a1a20", fg="#ff6b6b")
        self.status_label.pack(pady=(0, 15))

        # Buttons Frame
        btn_frame = tk.Frame(root, bg="#1a1a20")
        btn_frame.pack(fill="x", padx=20)

        # Start Button
        self.start_btn = tk.Button(btn_frame, text="▶ Starten", bg="#2e7d32", fg="white", font=self.btn_font, command=self.start_server, relief="flat", cursor="hand2")
        self.start_btn.pack(side="left", padx=5, expand=True, fill="x", ipady=5)

        # Stop Button
        self.stop_btn = tk.Button(btn_frame, text="⏹ Stoppen", bg="#c62828", fg="white", font=self.btn_font, command=self.stop_server, state="disabled", relief="flat", cursor="hand2")
        self.stop_btn.pack(side="left", padx=5, expand=True, fill="x", ipady=5)

        # Restart Button
        self.restart_btn = tk.Button(btn_frame, text="🔄 Neustart", bg="#1565c0", fg="white", font=self.btn_font, command=self.restart_server, state="disabled", relief="flat", cursor="hand2")
        self.restart_btn.pack(side="left", padx=5, expand=True, fill="x", ipady=5)

        # Log Terminal
        log_frame = tk.Frame(root, bg="#1a1a20")
        log_frame.pack(fill="both", expand=True, padx=20, pady=20)
        
        log_label = tk.Label(log_frame, text="Server Logs:", bg="#1a1a20", fg="#aaa", font=("Segoe UI", 9))
        log_label.pack(anchor="w")

        self.log_text = tk.Text(log_frame, bg="#0a0a0f", fg="#f1ebd9", font=("Consolas", 9), wrap="word", state="disabled", relief="solid", bd=1)
        self.log_text.pack(fill="both", expand=True)

        self.check_status()

    def log(self, message):
        self.log_text.config(state="normal")
        self.log_text.insert(tk.END, message + "\n")
        self.log_text.see(tk.END)
        self.log_text.config(state="disabled")

    def read_output(self, pipe):
        try:
            # sys.stdout.encoding verwenden, da Windows manchmal Konsolen-Encoding-Probleme hat (cp1252)
            for line in iter(pipe.readline, ''):
                if line:
                    self.root.after(0, self.log, line.strip())
        except Exception:
            pass

    def start_server(self):
        if self.process is None or self.process.poll() is not None:
            self.log("--- Starte Bifröst Server ---")
            
            is_win = os.name == 'nt'
            node_cmd = "node.exe" if is_win else "node"
            flags = 0x08000000 if is_win else 0
            
            # WICHTIG: Setze Umgebungsvariablen so, dass Node unbuffered arbeitet
            env = os.environ.copy()
            env["FORCE_COLOR"] = "1" # Zwingt Node, Farben beizubehalten, auch wenn an PIPE weitergeleitet wird (optional, falls Log es kann)
            
            try:
                # Direkter Aufruf von node index.js anstelle von npm run start, 
                # da npm manchmal die stdout/stderr Pipes seiner Kinder (node) puffert und erst beim Beenden leert!
                self.process = subprocess.Popen(
                    [node_cmd, "index.js"], 
                    stdout=subprocess.PIPE, 
                    stderr=subprocess.PIPE, # Getrennt, damit wir beides live abgreifen können
                    text=True, 
                    bufsize=1, # 1 bedeutet Line-Buffered (wirft Output nach jedem \n aus)
                    creationflags=flags,
                    env=env,
                    encoding='utf-8' # Erzwingt UTF-8 statt Windows ANSI, um Emoji-Crashes zu vermeiden
                )
                
                # Zwei Threads: Einen für StdOut (normale console.logs), einen für StdErr (Fehler)
                self.output_thread = threading.Thread(target=self.read_output, args=(self.process.stdout,), daemon=True)
                self.error_thread = threading.Thread(target=self.read_output, args=(self.process.stderr,), daemon=True)
                
                self.output_thread.start()
                self.error_thread.start()
                
                self.update_ui_state(True)
            except FileNotFoundError:
                self.log("❌ FEHLER: Konnte Node nicht finden. Ist Node.js installiert und im PATH?")

    def stop_server(self):
        if self.process and self.process.poll() is None:
            self.log("--- Stoppe Bifröst Server ---")
            self.process.terminate()
            try:
                self.process.wait(timeout=3)
            except subprocess.TimeoutExpired:
                self.process.kill()
            self.process = None
            self.update_ui_state(False)

    def restart_server(self):
        self.stop_server()
        self.log("--- Neustart initiiert ---")
        self.root.after(1500, self.start_server) # 1.5 Sekunden warten, damit der Port freigegeben wird

    def update_ui_state(self, is_running):
        if is_running:
            self.status_var.set("Status: LÄUFT 🟢")
            self.status_label.config(fg="#4caf50")
            self.start_btn.config(state="disabled", bg="#1b5e20")
            self.stop_btn.config(state="normal", bg="#c62828")
            self.restart_btn.config(state="normal", bg="#1565c0")
        else:
            self.status_var.set("Status: GESTOPPT 🔴")
            self.status_label.config(fg="#ff6b6b")
            self.start_btn.config(state="normal", bg="#2e7d32")
            self.stop_btn.config(state="disabled", bg="#b71c1c")
            self.restart_btn.config(state="disabled", bg="#0d47a1")

    def check_status(self):
        # Polling, um zu prüfen ob der Server z.B. durch einen Fehler gecrasht ist
        if self.process:
            if self.process.poll() is not None:
                self.process = None
                self.update_ui_state(False)
                self.log("⚠️ Server wurde unerwartet beendet.")
        self.root.after(1000, self.check_status)

if __name__ == "__main__":
    root = tk.Tk()
    app = ServerManagerApp(root)
    
    # Sicherstellen, dass der Server beim Schließen des GUIs mit beendet wird
    def on_closing():
        app.stop_server()
        root.destroy()
        sys.exit(0)
        
    root.protocol("WM_DELETE_WINDOW", on_closing)
    root.mainloop()
