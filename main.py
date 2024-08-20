import eel
import json
import os
import datetime
import subprocess
from PIL import ImageGrab

ct_path = r"C:\Users\Administrator\Desktop\postCCosce\test.prs"
video_path = r"C:\Users\Administrator\Desktop\postCCosce\povideo.mp4"
question_list = []
# docs/question_filesからquestion1などのフォルダ群それぞれについて、jsonファイルを読み込む
for dirpath, dirnames, filenames in os.walk("docs/question_files"):
    for filename in filenames:
        if filename.endswith(".json"):
            with open(os.path.join(dirpath, filename), "r") as f:
                print("loading json file: ",os.path.join(dirpath, filename))
                question_list.append(json.load(f))
# print(question_list)

# question_list = [
    # {
    #     "question_id": 1,
    #     "title" : "2024_Q1",
    #     "patient_header":{
    #         "category": "内科",
    #         "patient_id": 123456,
    #         "name_kana": "たなか たろう",
    #         "name_kanji": "田中 太郎",
    #         # 性別
    #         "sex": "男",
    #         "age": "48歳",
    #         # 血液型
    #         "blood_type": "O型",
    #         # 身長
    #         "height": "170cm",
    #         # 体重
    #         "weight": "70kg",
    #     },
    #     "navigation_bar":[
    #         {
    #             "nav_id": 1,
    #             "title": "カルテ",
    #             "type":"tree_parent",
    #         },
    #         {
    #             "nav_id": 2,
    #             "title": "20XX年X月X日",
    #             "type":"nurse_note",
    #             "parent_id": 1,
    #             "date_1": "20XX/X/XX 9:00",
    #             "date_2": "20XX/X/XX 10:00",
    #             "nurse": "看護師A",
    #             "nurse_category": "内科",
    #             "text": """本日、５１０号室入院。高血圧の精査目的。
    #             入院時に背部痛の訴えがあったが、我慢ができないほどと、ナースコールあり。
    #             かなり痛みが強そうであり、表情は苦悶様。
    #             担当医に診察依頼。
    #             """,
    #         },
    #         {
    #             "nav_id": 3,
    #             "title": "検体検査結果",
    #             "type":"tree_parent",
    #         },{
    #             "nav_id": 4,
    #             "title": "20XX年X月X日",
    #             "type":"blood_test",
    #             "parent_id": 3,
    #             "result": """WBC: 9,900/μl(3300~8600)
    #             RBC: 542万/μl(435~555)
    #             Hgb: 15.7/dl(13.6~16.8)
    #             Htc: 47.4%(32.1~42.7)
    #             Plt: 29.0万(15.8~34.8)
    #             CRP: 0.1mg/dl(~0.3)
    #             TP: 7.5g/dl(6.6~8.1)
    #             Alb: 4.5g/dl(4.1~5.1)
    #             AST: 36U/L(13~40)
    #             ALT: 72U/L(10~42)
    #             CPK: 109IU/L(59~248)
    #             AMY: 44IU/L(37~125)
    #             GLU: 108mg/dl(69~109)
    #             Cre:1.15mg/dL(0.65~1.07)
    #             """,
    #         },{
    #             "nav_id": 5,
    #             "title": "尿検査結果",
    #             "type":"tree_parent",
    #         },{
    #             "nav_id": 6,
    #             "title": "20XX年X月X+1日",
    #             "type":"urine_test",
    #             "parent_id": 5,
    #             "result": """尿pH : 6.0
    #             比重：1.029
    #             潜血：3+
    #             白血球：1+
    #             尿糖：-
    #             蛋白：-
    #             ケトン：-
    #             ビリルビン：-
    #             ウロビリノゲン：0.1
    #             """,
    #         }
    #     ],
    #     "right_side_bar":[
    #         {
    #             "bar_title": "診療動画",
    #             "file_source": "./question_files/question1/video/povideo.mp4",
    #             # "file_source": "./video/povideo.mp4",
    #             "type": "video",
    #         },{
    #             "bar_title": "バイタルサイン",
    #             "type": "text",
    #             "text": """体温:36.6℃
    #             心拍数:78/min.
    #             血圧:170/84mmHg
    #             呼吸数：14回/min.
    #             SpO2 100%(room air)
    #             """
    #         },{
    #             "bar_title": "身体所見",
    #             "type": "text",
    #             "text": """背部やや左側に強い自発痛と叩打痛あり。
    #                 腹部には圧痛や反跳痛は認めない。
    #                 """
    #         },{
    #             "bar_title": "CT検査",
    #             "type": "external_app",
    #             "file_source": "docs/question_files/question1/CT_DICOM_img",
    #         }
    #     ]
    # },
#     {
#         "question_id": 0,
#     },
#     {
#         "question_id": 2,
#     },
#     {
#         "question_id": 3,
#     }
# ]
start_time = datetime.datetime.now()
parent_dir = os.path.join(os.getcwd(),"docs/output/" + start_time.strftime('%Y%m%d%H%M%S'))

def main():
    # OSがWindowsである場合は、以下のコードを使う
    if os.name == 'nt':
        eel.init("C:/Users/Administrator/Desktop/clinical-record-simulator/docs")
        eel.start("index.html", size=(2000, 1500),mode='edge',suppress_error=True)
    else:
        eel.init("docs")
        eel.start("index.html", size=(2000, 1500))


""" start_timeを再取得し、main()を終わらせてから再度main()を呼び出す"""
@eel.expose
def restart_app():
    print("restarting app")
    global start_time
    global parent_dir
    start_time = datetime.datetime.now()
    parent_dir = os.path.join(os.getcwd(),"docs/output/" + start_time.strftime('%Y%m%d%H%M%S'))
    # 代わりにlocation.reload()を使う

# """アプリ起動 と同時に問題データを取得してindex.htmlに渡す"""
@eel.expose
def get_question_data():
    return question_list

"""CT画像アプリ起動ボタンが押下された際に呼び出すスクリプト"""
@eel.expose
def start_ct_app():
    print("start_ct_app_button")
    subprocess.Popen(["start",ct_path], shell=True)

"""別画面で診療動画を再生するボタンが押下された際に呼び出すスクリプト"""
@eel.expose
def start_movie_app():
    print("start_movie_app_button")
    subprocess.Popen(["start",video_path], shell=True)

"""アプリを起動させた瞬間に保存用のフォルダを作成する。 フォルダ名はアプリを起動させた時間"""

@eel.expose
def get_start_time():
    # 曜日を日本語に直す
    days = ["月","火","水","木","金","土","日"]
    if start_time.weekday() == 0:
        start_time_str = start_time.strftime('%Y/%m/%d(%a) %H:%M') + " "
    else:
        start_time_str = start_time.strftime('%Y/%m/%d('+days[start_time.weekday()]+') %H:%M') + " "
    print("start_time: ",start_time_str)
    return start_time_str


@eel.expose
def create_output_folder():
    if not os.path.exists(parent_dir):
        os.makedirs(parent_dir)
        print("Success: Output folder created")
    else:
        print("Error: Output folder already exists")



"""save text file"""
@eel.expose
def save_text_file(text):
    print("saving text file")
    today = datetime.datetime.now()
    curtime = today.strftime('%Y%m%d%H%M%S'+".txt")
    if not os.path.exists(parent_dir):
        os.makedirs(parent_dir)
    with open(os.path.join(parent_dir,curtime), mode='w') as f:
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
        if not os.path.exists(parent_dir):
            os.makedirs(parent_dir)
        image_name = os.path.join(parent_dir,curtime)
        image.save(image_name)
        print("Success: Image saved")
        return "./output/"+start_time.strftime('%Y%m%d%H%M%S')+"/"+curtime
    else:
        return False
    



if __name__ == '__main__':
     main()

