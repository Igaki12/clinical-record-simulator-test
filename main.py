import eel


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

# def main():
#     eel.init("docs")
#     thread1 = threading.Thread(target=open_window1)
#     thread2 = threading.Thread(target=open_window2)
#     # スレッドの開始
#     thread1.start()
#     thread2.start()
#     # スレッドの終了を待つ
#     thread1.join()
#     thread2.join()



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
    # return question_list[question_index]["question"]


if __name__ == '__main__':
     main()

