
// 読み込みが終わったタイミングでmain.py からデータを取得して表示する
document.addEventListener('DOMContentLoaded', function() {
    // まず読み込み用の フォルダを作成する
    eel.create_output_folder()();

    eel.get_question_data()(
        function(question_data) {
            // データを取得したら、HTMLに反映する
            document.getElementById('category').textContent = question_data[0]["patient_header"]["category"];
            document.getElementById('patient_id').textContent = "患者ID: "+ question_data[0]["patient_header"]["patient_id"];
            document.getElementById('name_kana').textContent = question_data[0]["patient_header"]["name_kana"];
            document.getElementById('name_kanji').textContent = question_data[0]["patient_header"]["name_kanji"];
            document.getElementById('patient_name(id)').textContent = question_data[0]["patient_header"]["name_kanji"] + " (" + question_data[0]["patient_header"]["patient_id"] + ")";
            document.getElementById('sex').textContent = "性別:" + question_data[0]["patient_header"]["sex"];
            document.getElementById('age').textContent = question_data[0]["patient_header"]["age"];
            document.getElementById('weight').textContent = question_data[0]["patient_header"]["weight"];

            for (let i = 0; i < question_data[0]["navigation_bar"].length; i++) {
                if (question_data[0]["navigation_bar"][i]["type"] == "progress_note") {

            // navigation_barに対応する。HTMLオブジェクトを 取得して作成。
    //  <div class="main-left-progressnote-record">
    //      <div class="main-left-progressnote-record-header">
    //         <div style="display: flex;">
    //             <button>開</button>
    //             <button>閉</button>
    //             <p>【プログレスノート】</p>
    //         </div>
    //         <p><span style="color: purple;">内科</span> <span>外来</span></p>
    //     </div>
    //     <div class="main-left-progressnote-record-header-row2">
    //         <p>2024/05/13(月) 09:00</p>
    //     </div>
    //     <table class="progress-table">
    //         <tr>
    //             <th>依頼</th>
    //             <th>2024/05/13(月) 10:00 医師)富士通 清美</th>
    //             <th>総合　本</th>
    //         </tr>
    //         <tr>
    //             <td>(S)</td>
    //             <td colspan="2">著変なし</td> <!-- colspan="2"で2列結合 -->
    //         </tr>
    //         <tr>
    //             <td>(O)</td>
    //             <td colspan="2">BS 112<br>血圧 142/82<br>HbA1c 6.1%</td>
    //         </tr>
    //     </table>
    // </div>
    const progressNoteRecord = document.createElement('div');
    progressNoteRecord.classList.add('main-left-progressnote-record');
    progressNoteRecord.id = 'progress_note_record' + question_data[0]["navigation_bar"][i]["nav_id"];
    progressNoteRecord.style.display = 'none';
    const progressNoteRecordHeader = document.createElement('div');
    progressNoteRecordHeader.classList.add('main-left-progressnote-record-header');
    const progressNoteRecordHeaderRow1 = document.createElement('div');
    progressNoteRecordHeaderRow1.style.display = 'flex';
    const openBtn = document.createElement('button');
    openBtn.textContent = '開';
    openBtn.style.display = 'none';
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '閉';
    closeBtn.style.display = 'block';
    openBtn.onclick = function () {
        document.getElementById('progress_table' + i).style.display = "";
        openBtn.style.display = 'none';
        closeBtn.style.display = 'block';
    }
    closeBtn.onclick = function () {
        document.getElementById('progress_table' + i).style.display = 'none';
        openBtn.style.display = 'block';
        closeBtn.style.display = 'none';
    }
    const progressNoteTitle = document.createElement('p');
    progressNoteTitle.textContent = '【プログレスノート】';
    const progressNoteCategory = document.createElement('p');
    progressNoteCategory.innerHTML = '<span style="color: purple;">' + question_data[0]["navigation_bar"][i]["doctor_category"] + '</span> <span>' + "外来" + '</span>';
    const progressNoteRecordHeaderRow2 = document.createElement('div');
    progressNoteRecordHeaderRow2.classList.add('main-left-progressnote-record-header-row2');
    const progressNoteDate = document.createElement('p');
    progressNoteDate.textContent = question_data[0]["navigation_bar"][i]["date_1"];
    const progressTable = document.createElement('table');
    progressTable.classList.add('progress-table');
    progressTable.id = 'progress_table' + question_data[0]["navigation_bar"][i]["nav_id"];
    const progressTableTr1 = document.createElement('tr');
    const progressTableTh1 = document.createElement('th');
    progressTableTh1.textContent = '依頼';
    const progressTableTh2 = document.createElement('th');
    progressTableTh2.textContent = question_data[0]["navigation_bar"][i]["date_2"] + ' 医師)' + question_data[0]["navigation_bar"][i]["doctor"];
    const progressTableTh3 = document.createElement('th');
    progressTableTh3.textContent = question_data[0]["navigation_bar"][i]["doctor_category"];
    progressTableTr1.appendChild(progressTableTh1);
    progressTableTr1.appendChild(progressTableTh2);
    progressTableTr1.appendChild(progressTableTh3);
    progressTable.appendChild(progressTableTr1);
    if (question_data[0]["navigation_bar"][i]["#"] != "") {
        const progressTableTr2Sharp = document.createElement('tr');
        const progressTableTdSharp1 = document.createElement('td');
        progressTableTdSharp1.textContent = '(#)';
        const progressTableTdSharp2 = document.createElement('td');
        progressTableTdSharp2.colSpan = 2;
        progressTableTdSharp2.textContent = question_data[0]["navigation_bar"][i]["#"];
        progressTableTr2Sharp.appendChild(progressTableTdSharp1);
        progressTableTr2Sharp.appendChild(progressTableTdSharp2);
        progressTable.appendChild(progressTableTr2Sharp);
    }
    if (question_data[0]["navigation_bar"][i]["S"] != "") {
        const progressTableTr2S = document.createElement('tr');
        const progressTableTdS1 = document.createElement('td');
        progressTableTdS1.textContent = '(S)';
        const progressTableTdS2 = document.createElement('td');
        progressTableTdS2.colSpan = 2;
        progressTableTdS2.textContent = question_data[0]["navigation_bar"][i]["S"];
        progressTableTr2S.appendChild(progressTableTdS1);
        progressTableTr2S.appendChild(progressTableTdS2);
        progressTable.appendChild(progressTableTr2S);
    }
    if (question_data[0]["navigation_bar"][i]["O"] != "") {
        const progressTableTr2O = document.createElement('tr');
        const progressTableTdO1 = document.createElement('td');
        progressTableTdO1.textContent = '(O)';
        const progressTableTdO2 = document.createElement('td');
        progressTableTdO2.colSpan = 2;
        // 改行状態 を保持しながら表示する
        progressTableTdO2.innerHTML = question_data[0]["navigation_bar"][i]["O"].replace(/\n/g, '<br>');
        // progressTableTdO2.textContent = question_data[0]["navigation_bar"][i]["O"];
        progressTableTr2O.appendChild(progressTableTdO1);
        progressTableTr2O.appendChild(progressTableTdO2);
        progressTable.appendChild(progressTableTr2O);
    }
    if (question_data[0]["navigation_bar"][i]["A"] != "") {
        const progressTableTr2A = document.createElement('tr');
        const progressTableTdA1 = document.createElement('td');
        progressTableTdA1.textContent = '(A)';
        const progressTableTdA2 = document.createElement('td');
        progressTableTdA2.colSpan = 2;
        progressTableTdA2.textContent = question_data[0]["navigation_bar"][i]["A"];
        progressTableTr2A.appendChild(progressTableTdA1);
        progressTableTr2A.appendChild(progressTableTdA2);
        progressTable.appendChild(progressTableTr2A);
    }
    if (question_data[0]["navigation_bar"][i]["P"] != "") {
        const progressTableTr2P = document.createElement('tr');
        const progressTableTdP1 = document.createElement('td');
        progressTableTdP1.textContent = '(P)';
        const progressTableTdP2 = document.createElement('td');
        progressTableTdP2.colSpan = 2;
        progressTableTdP2.textContent = question_data[0]["navigation_bar"][i]["P"];
        progressTableTr2P.appendChild(progressTableTdP1);
        progressTableTr2P.appendChild(progressTableTdP2);
        progressTable.appendChild(progressTableTr2P);
    }
    progressNoteRecordHeaderRow1.appendChild(openBtn);
    progressNoteRecordHeaderRow1.appendChild(closeBtn);
    progressNoteRecordHeaderRow1.appendChild(progressNoteTitle);
    progressNoteRecordHeader.appendChild(progressNoteRecordHeaderRow1);
    progressNoteRecordHeader.appendChild(progressNoteCategory);
    progressNoteRecordHeaderRow2.appendChild(progressNoteDate);
    progressNoteRecord.appendChild(progressNoteRecordHeader);
    progressNoteRecord.appendChild(progressNoteRecordHeaderRow2);
    progressNoteRecord.appendChild(progressTable);
    // <div class="main-column" id="main-left">の末尾に追加する
    const mainLeft = document.getElementById('main-left');
    mainLeft.appendChild(progressNoteRecord);

       // 上のオブジェクトを呼び出すようなアンカーをid:navigation_barに追加
                    // <a>カルテ1</a>
    const navigation_row1 = document.createElement('a');
    navigation_row1.textContent = question_data[0]["navigation_bar"][i]["title"];
    const navigation_row1_close_a = document.createElement('a');
    navigation_row1_close_a.textContent = question_data[0]["navigation_bar"][i]["title"];
    navigation_row1_close_a.style.display = 'none';
    navigation_row1_close_a.style.backgroundColor = 'orange';
    navigation_row1.onclick = function () {
        document.getElementById('progress_note_record' + i).style.display = '';
        navigation_row1.style.display = 'none';
        navigation_row1_close_a.style.display = 'block';
    }
    navigation_row1_close_a.onclick = function () {
        document.getElementById('progress_note_record' + i).style.display = 'none';
        navigation_row1.style.display = 'block';
        navigation_row1_close_a.style.display = 'none';
    }
    const navigation_bar = document.getElementById('navigation_bar');
    if (question_data[0]["navigation_bar"][i]["parent_id"]) {
        document.getElementById('tree_parent'+i).appendChild(navigation_row1);
        document.getElementById('tree_parent'+i).appendChild(navigation_row1_close_a);
    }else {
    navigation_bar.appendChild(navigation_row1);
    navigation_bar.appendChild(navigation_row1_close_a);
    }
}else if (question_data[0]["navigation_bar"][i]["type"] == "tree_parent") {
    // 下のようなオブジェクトを 持つ親オブジェクトを作成
    // <div id="tree_parent">
    // <a>カルテ1</a>
    // </div>
    const tree_parent = document.createElement('div');
    tree_parent.id = 'tree_parent' + question_data[0]["navigation_bar"][i]["nav_id"];
    tree_parent.style.display = 'none';
    tree_parent.style.paddingLeft = '20px';
    const navigation_row2 = document.createElement('a');
    navigation_row2.textContent = question_data[0]["navigation_bar"][i]["title"] + " ▽"
    const navigation_row2_close_a = document.createElement('a');
    navigation_row2_close_a.textContent = question_data[0]["navigation_bar"][i]["title"] + " △"
    navigation_row2_close_a.style.display = 'none';
    navigation_row2_close_a.style.backgroundColor = 'orange';
    navigation_row2.onclick = function () {
        tree_parent.style.display = 'block';
        navigation_row2.style.display = 'none';
        navigation_row2_close_a.style.display = 'block';
    }
    navigation_row2_close_a.onclick = function () {
        tree_parent.style.display = 'none';
        navigation_row2.style.display = 'block';
        navigation_row2_close_a.style.display = 'none';
    }
    document.getElementById('navigation_bar').appendChild(navigation_row2);
    document.getElementById('navigation_bar').appendChild(navigation_row2_close_a);
    document.getElementById('navigation_bar').appendChild(tree_parent);


}else if (question_data[0]["navigation_bar"][i]["type"] == "blood_test") {
    // 下のようなオブジェクトを作成
    // <section id="bloodCultureArea" class="imageArea" style="display: none;">
    // <div id="modalBg" class="modalBg" onclick="closeBloodCultureModal()"></div>
    // <div class="imageWrapper">
    //     <div class="imageContents">
    //         <div class="image-window-bar">
    //             <h1>血液培養結果</h1>
    // <table class="blood-culture-table">
    //                 <tr>
    //                     <th>検体結果</th>
    //                 </tr>
    //                 <tr>
    //                     <td>WBC: 9,900/μl(3300~8600)
    //                         RBC: 542万/μl(435~555)
    //                         Hgb: 15.7/dl(13.6~16.8)
    //                         Htc: 47.4%(32.1~42.7)
    //                         Plt: 29.0万(15.8~34.8)
    //                         CRP: 0.1mg/dl(~0.3)
    //                         TP: 7.5g/dl(6.6~8.1)
    //                         Alb: 4.5g/dl(4.1~5.1)
    //                         AST: 36U/L(13~40)
    //                         ALT: 72U/L(10~42)
    //                         CPK: 109IU/L(59~248)
    //                         AMY: 44IU/L(37~125)
    //                         GLU: 108mg/dl(69~109)
    //                         Cre:1.15mg/dL(0.65~1.07)</td>
    //                 </tr>
    //             </table>
    //             <button onclick="closeBloodCultureModal()">閉じる</button>
    //         </div>
    //         <div class="blood-culture-window-footer">
    //         </div>
    //     </div>
    // </div>
    // </section>
    const bloodCultureArea = document.createElement('section');
    bloodCultureArea.classList.add('imageArea');
    bloodCultureArea.style.display = 'none';
    bloodCultureArea.id = 'bloodCultureArea' + question_data[0]["navigation_bar"][i]["nav_id"];
    const modalBg = document.createElement('div');
    modalBg.classList.add('modalBg');
    modalBg.onclick = function () {
        closeBloodCultureModal();
    }
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('imageWrapper');
    const imageContents = document.createElement('div');
    imageContents.classList.add('imageContents');
    const imageWindowBar = document.createElement('div');
    imageWindowBar.classList.add('image-window-bar');
    const bloodCultureTitle = document.createElement('h1');
    bloodCultureTitle.textContent = '血液培養結果';
    const bloodCultureTable = document.createElement('table');
    bloodCultureTable.classList.add('blood-culture-table');
    const bloodCultureTableTr1 = document.createElement('tr');
    const bloodCultureTableTh1 = document.createElement('th');
    bloodCultureTableTh1.textContent = '検体結果';
    bloodCultureTableTr1.appendChild(bloodCultureTableTh1);
    bloodCultureTable.appendChild(bloodCultureTableTr1);
    const bloodCultureTableTr2 = document.createElement('tr');
    const bloodCultureTableTd1 = document.createElement('td');
    bloodCultureTableTd1.innerHTML = question_data[0]["navigation_bar"][i]["result"].replace(/\n/g, '<br>');
    bloodCultureTableTr2.appendChild(bloodCultureTableTd1);
    bloodCultureTable.appendChild(bloodCultureTableTr2);
    const closeBloodCultureBtn = document.createElement('button');
    closeBloodCultureBtn.textContent = '閉じる';
    closeBloodCultureBtn.onclick = function () {
        closeBloodCultureModal();
    }
    const bloodCultureWindowFooter = document.createElement('div');
    bloodCultureWindowFooter.classList.add('blood-culture-window-footer');
    bloodCultureWindowFooter.innerHTML = '';
    imageWindowBar.appendChild(bloodCultureTitle);
    imageWindowBar.appendChild(closeBloodCultureBtn);
    imageContents.appendChild(imageWindowBar);
    imageContents.appendChild(bloodCultureWindowFooter);
    imageContents.appendChild(bloodCultureTable);
    imageWrapper.appendChild(imageContents);
    bloodCultureArea.appendChild(modalBg);
    bloodCultureArea.appendChild(imageWrapper);
    // 下のような構造のオブジェクトを作成
    // <div class="record_links" id="navigation_bar">
//     <!-- <a>血液検査結果</a> -->
//     <a onclick="openBloodCultureModal()">血液培養結果</a>
//     <div id="tree_parent">
//         <a>カルテ1</a>
//     </div>
// </div>
    const bloodTestLink = document.createElement('a');
    bloodTestLink.textContent = "-" + question_data[0]["navigation_bar"][i]["title"];
    bloodTestLink.onclick = function () {
        openBloodCultureModal();
        bloodCultureArea.style.display = '';
    }
    if (question_data[0]["navigation_bar"][i]["parent_id"]) {
        document.getElementById('tree_parent'+ question_data[0]["navigation_bar"][i]["parent_id"]).appendChild(bloodTestLink);
    }else {
        document.getElementById('navigation_bar').appendChild(bloodTestLink);
    }
}

            }

        })});

let copyImageIndex = 0;
// アプリのスタート時間を記録する
let start_time = new Date().toLocaleString();

function openAnswerModal() {
    document.getElementById('modalArea').style.display = 'block';
    let progress_sharp = document.getElementById('progress_sharp').value + "\n";
    // コードを書かれないようにチェックした後、改行を<br>に変換する
    progress_sharp = progress_sharp.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    progress_sharp = progress_sharp.replace(/\n/g, '<br>');
    document.getElementById('check_sharp').innerHTML = progress_sharp;

    let progress_subject = document.getElementById('progress_subject').value + "\n";
    progress_subject = progress_subject.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    progress_subject = progress_subject.replace(/\n/g, '<br>');
    document.getElementById('check_subject').innerHTML = progress_subject;

    document.getElementById('check_object').innerHTML = '';
    for (let i = 0; i < copyImageIndex + 1; i++) {
        if (i == 0 || document.getElementById('pasted-img' + i).style.display == 'none') {
        }else {
            document.getElementById('check_object').innerHTML += '<h3>[ 画像 : src=' + document.getElementById('pasted-img' + i).src.split('/').pop() + ' ] </h3>';
        }
        let progress_object = document.getElementById('progress_object' + i).value + "\n";
        progress_object = progress_object.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
        progress_object = progress_object.replace(/\n/g, '<br>');
        document.getElementById('check_object').innerHTML += progress_object;
    }
    let progress_assessment = document.getElementById('progress_assessment').value + "\n";
    progress_assessment = progress_assessment.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    progress_assessment = progress_assessment.replace(/\n/g, '<br>');
    document.getElementById('check_assessment').innerHTML = progress_assessment;
    let progress_plan = document.getElementById('progress_plan').value + "\n";
    progress_plan = progress_plan.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    progress_plan = progress_plan.replace(/\n/g, '<br>');
    document.getElementById('check_plan').innerHTML = progress_plan;
    //                     <tr>
//     <td>(S)</td>
//     <td id="check_subject"></td>
// </tr>
// <tr>
//     <td>(O)</td>
//     <td id="check_object"></td>
// </tr>
// <tr>
//     <td>(A)</td>
//     <td id="check_assessment"></td>
// </tr>
// <tr>
//     <td>(P)</td>
//     <td id="check_plan"></td>
// </tr>
}
function saveClinicalRecord() {
    // let output_text = "保存された時刻：" + new Date().toLocaleString() + "\n";
    let output_text = "解答開始時刻：" + start_time + "\n" + "保存された時刻：" + new Date().toLocaleString() + "\n";
    output_text += " --[ (#) ]------------------ \n";
    let progress_sharp = document.getElementById('progress_sharp').value + "\n";
    progress_sharp = progress_sharp.replace(/'/g, '’').replace(/"/g, '’').replace(/`/g, '’');
    output_text += progress_sharp + "\n\n" + "--[ (S) ]------------------ \n";
    let progress_subject = document.getElementById('progress_subject').value + "\n";
    progress_subject = progress_subject.replace(/'/g, '’').replace(/"/g, '’').replace(/`/g, '’');
    output_text += progress_subject + "\n\n" + "--[ (O) ]------------------ \n";
    let progress_object = '';
    for (let i = 0; i < copyImageIndex + 1; i++) {
        if (i == 0 || document.getElementById('pasted-img' + i).style.display == 'none') {
        }else {
            progress_object += '\n　\n [ 画像 : src=' + document.getElementById('pasted-img' + i).src.split('/').pop() + ' ]\n　\n';
        }
        let progress_object_text = document.getElementById('progress_object' + i).value + "\n";
        progress_object_text = progress_object_text.replace(/'/g, '’').replace(/"/g, '’').replace(/`/g, '’');
        progress_object += progress_object_text;
    }
    output_text += progress_object + "\n\n" + "--[ (A) ]------------------ \n";
    let progress_assessment = document.getElementById('progress_assessment').value + "\n";
    progress_assessment = progress_assessment.replace(/'/g, '’').replace(/"/g, '’').replace(/`/g, '’');
    output_text += progress_assessment + "\n\n" + "--[ (P) ]------------------ \n";
    let progress_plan = document.getElementById('progress_plan').value + "\n";
    progress_plan = progress_plan.replace(/'/g, '’').replace(/"/g, '’').replace(/`/g, '’');
    output_text += progress_plan;
    alert(output_text);
    eel.save_text_file(output_text)();


}
function closeAnswerModal() {
    document.getElementById('modalArea').style.display = 'none';
}
function openImageModal() {
    document.getElementById('imageArea').style.display = 'block';
}
function closeImageModal() {
    document.getElementById('imageArea').style.display = 'none';
}
function closeBloodCultureModal() {
    document.getElementById('bloodCultureArea').style.display = 'none';
}
function openBloodCultureModal() {
    document.getElementById('bloodCultureArea').style.display = 'block';
}
function statrVideoApp() {
    eel.start_video_app()();
    print('動画アプリを起動しました');
}
function startCTApp() {
    // alert('CTアプリを起動します');
    const pasteCTImageBtn = document.getElementById('pasteCTImageBtn');
    pasteCTImageBtn.style.display = 'block';
    eel.start_ct_app()();
    alert('CTアプリを起動しました。Ctrl + C で画像をコピーして、「CT画像を貼付」ボタンを押すことで、CT画像を貼り付けることができます。');
    document.getElementById('startCTBtn').style.display = 'none';
}
async function displayImage() {
    // Python関数を呼び出してクリップボードから画像を取得
    let result_png_path = await eel.grab_clipboard_image()();
    print(result_png_path);
    
    if (result_png_path) {
        // 画像を表示
        copyImageIndex++;
        const img = document.getElementById('imagePlace');
        // alert(result_png_path);
        const imgPasteBox = document.getElementById('img-pastable');
        const pastedImgBox = document.createElement('div');
        pastedImgBox.classList.add('pasted-img-box');
        const imgTag = document.createElement('img');
        imgTag.src = result_png_path;
        imgTag.alt = '画像:' + result_png_path;
        imgTag.id = 'pasted-img' + copyImageIndex;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.onclick = function () {
            pastedImgBox.style.display = 'none';
        }
        for (let i = 0; i < copyImageIndex; i++) {
            document.getElementById('progress_object' + i).placeholder = '';
        }
        const textarea = document.createElement('textarea');
        textarea.classList.add('dynamic-textarea');
        textarea.name = 'progress_object' + copyImageIndex;
        textarea.id = 'progress_object' + copyImageIndex;
        textarea.placeholder = 'ここに入力';
        function adjustTextareaHeight(textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = (textarea.scrollHeight) + 'px';
        }
        textarea.addEventListener('input', function() {
            adjustTextareaHeight(textarea);
        });
        pastedImgBox.appendChild(imgTag);
        pastedImgBox.appendChild(deleteBtn);
        imgPasteBox.appendChild(pastedImgBox);
        imgPasteBox.appendChild(textarea);
        adjustTextareaHeight(textarea);
        adjustTextareaHeight(document.getElementById('progress_object0'));
    


        // let img = document.getElementById('image');
        // img.src = 'clipboard_image.png';
        // img.style.display = 'block';
    } else {
        alert('No image found in clipboard.');
    }
}

    
document.addEventListener('DOMContentLoaded', function() {
    let textareas = document.getElementsByClassName('dynamic-textarea');
    
    function adjustTextareaHeight(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }
    
    Array.prototype.forEach.call(textareas, function(textarea) {
        textarea.addEventListener('input', function() {
            adjustTextareaHeight(textarea);
        });
        // 初期化時に高さを調整
        adjustTextareaHeight(textarea);
    });
});


let imgIndex = 1;
function backImage() {
    const img = document.getElementById('imagePlace');
    imgIndex--;
    if (imgIndex < 1) {
        imgIndex = 8;
    }
    img.src = './img/' + imgIndex + '.png';
    const imgNum = document.getElementById('imgNum');
    imgNum.textContent = imgIndex + '/8';
}
function nextImage() {
    const img = document.getElementById('imagePlace');
    imgIndex++;
    if (imgIndex > 8) {
        imgIndex = 1;
    }
    img.src = './img/' + imgIndex + '.png';
    const imgNum = document.getElementById('imgNum');
    imgNum.textContent = imgIndex + '/8';
}

// let copyImageIndex = 0;
function copyImage()  {
    copyImageIndex++;
    //<div class="pasted-img-box">
    // <img src="./img/1.png" alt="画像1">
    // <button onclick="deleteImage()">削除</button>
    //</div>
    // <textarea class="dynamic-textarea"></textarea>
    // を<div id="img-pastable"> の末尾に追加する
    const img = document.getElementById('imagePlace');
    const imgSrc = img.src;
    const imgPasteBox = document.getElementById('img-pastable');
    const pastedImgBox = document.createElement('div');
    pastedImgBox.classList.add('pasted-img-box');
    const imgTag = document.createElement('img');
    imgTag.src = imgSrc;
    imgTag.alt = '画像' + imgIndex;
    imgTag.id = 'pasted-img' + copyImageIndex;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.onclick = function () {
        pastedImgBox.style.display = 'none';
        imgTag.style.display = 'none';
    }
    // 以前の他のplaceholderを消す
    for (let i = 0; i < copyImageIndex; i++) {
        document.getElementById('progress_object' + i).placeholder = '';
    }
    const textarea = document.createElement('textarea');
    textarea.classList.add('dynamic-textarea');
    textarea.name = 'progress_object' + copyImageIndex;
    textarea.id = 'progress_object' + copyImageIndex;
    textarea.placeholder = 'ここに入力';
    function adjustTextareaHeight(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }
    textarea.addEventListener('input', function() {
        adjustTextareaHeight(textarea);
    });
    pastedImgBox.appendChild(imgTag);
    pastedImgBox.appendChild(deleteBtn);
    imgPasteBox.appendChild(pastedImgBox);
    imgPasteBox.appendChild(textarea);
    adjustTextareaHeight(textarea);
    adjustTextareaHeight(document.getElementById('progress_object0'));
}

// キーボードで左矢印キーを押した時にも同様に前の画像を表示する
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        const imgModal = document.getElementById('imageArea');
        if (imgModal.style.display === 'block') {
            backImage();
        }
    }
    if (event.key === 'ArrowRight') {
        const imgModal = document.getElementById('imageArea');
        if (imgModal.style.display === 'block') {
            nextImage();
        }
    }
});
