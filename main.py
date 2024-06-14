import eel
import subprocess

ct_pass = r"C:\Users\Administrator\Desktop\postCCosce\test.prs"
question_list = [
    {
        "question": "Q1. 症例１",
    },
    {
        "question": "Q2. 症例２",
    },
    {
        "question": "Q3. 症例３",
    }
]
# import threading
#１つ目のウィンドウを起動
# def open_window1():
#     eel.start("index.html" , block=False , size=(800, 600))
#     eel.sleep(1)

# #2つ目のウィンドウを起動
# def open_window2():
#     eel.start("chat_screen_generated2.html" , block=False , size=(300, 600))
#     eel.sleep(1)

def main():
    eel.init("docs")
    eel.start("index.html", size=(800, 600))



"""link1が押下された際に呼び出すスクリプト"""
@eel.expose
def link1_click():
    print("link1_clicked")

"""link2が押下された際に呼び出すスクリプト"""
@eel.expose
def link2_click(args):
    print(args)
    return "link2_clicked"

"""次へボタンが押下された際に呼び出すスクリプト"""
@eel.expose
def next_question(question_index):
    print("next_question_button")
    if question_index < len(question_list) + 1:
        return question_list[question_index - 1]["question"]
    else:
        return "全ての問題が終了しました。"

"""CT画像アプリ起動ボタンが押下された際に呼び出すスクリプト"""
@eel.expose
def start_ct_app():
    print("start_ct_app_button")
    subprocess.Popen(["start",ct_pass], shell=True)


if __name__ == '__main__':
     main()

