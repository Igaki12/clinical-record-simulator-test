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


def main():
    eel.init("docs")
    eel.start("index.html")
    # ２つ目のスクリーンを起動
    eel.start("chat_screen_generated2.html")


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

