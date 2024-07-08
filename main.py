import eel
import os
import datetime
import subprocess
from PIL import ImageGrab

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
def main():
    eel.init("docs")
    eel.start("index.html", size=(1200, 1000))



# """link1が押下された際に呼び出すスクリプト"""
# @eel.expose
# def link1_click():
#     print("link1_clicked")

# """link2が押下された際に呼び出すスクリプト"""
# @eel.expose
# def link2_click(args):
#     print(args)
#     return "link2_clicked"

# """次へボタンが押下された際に呼び出すスクリプト"""
# @eel.expose
# def next_question(question_index):
#     print("next_question_button")
#     if question_index < len(question_list) + 1:
#         return question_list[question_index - 1]["question"]
#     else:
#         return "全ての問題が終了しました。"

# """アプリのスタート時間を引き渡すスクリプト"""
# @eel.expose
# def get_start_time():
#     today = datetime.datetime.now()
#     return today.strftime('%Y/%m/%d %H:%M:%S')


"""CT画像アプリ起動ボタンが押下された際に呼び出すスクリプト"""
@eel.expose
def start_ct_app():
    print("start_ct_app_button")
    subprocess.Popen(["start",ct_pass], shell=True)

"""save text file"""
@eel.expose
def save_text_file(text):
    print("saving text file")
    today = datetime.datetime.now()
    curtime = today.strftime('%Y%m%d%H%M%S'+".txt")
    initdir= os.path.join(os.getcwd(),"output")
    if not os.path.exists(initdir):
        os.makedirs(initdir)
        # ファイルパスの設定が違う気がする
    with open(os.path.join(initdir,curtime), mode='w') as f:
        f.write(text)
    print("Success: Text file saved")
    
@eel.expose
def grab_clipboard_image():
    # クリップボードから画像を取得
    image = ImageGrab.grabclipboard()
    
    if image is not None:
        # 画像をリサイズ
        image = image.resize((400, 400))
        # 画像をファイルに保存
        today = datetime.datetime.now()
        curtime = today.strftime('%Y%m%d%H%M%S'+".png")
        initdir= os.path.join(os.getcwd(),"output")
        if not os.path.exists(initdir):
            os.makedirs(initdir)
        image_name = os.path.join(initdir,curtime)
        image.save(image_name)
        return image_name
    else:
        return False



if __name__ == '__main__':
     main()

