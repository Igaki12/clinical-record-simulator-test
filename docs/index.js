
// 読み込みが終わったタイミングでmain.py からデータを取得して表示する
document.addEventListener('DOMContentLoaded', function () {
    // まず読み込み用の フォルダを作成する
    eel.create_output_folder()();

    // 今日の日付、時刻を反映する
    const start_time_str = eel.get_start_time()(
        async function (start_time_str) {
            document.getElementById('start_time_str_short').textContent = start_time_str.split(' ')[0];
            document.getElementById('start_time_str1').textContent = start_time_str;
            document.getElementById('SOAP-table_Th2').textContent = start_time_str + '医師)Post_CC_OSCE';
        });


    eel.get_question_data()(
        async function (question_data) {
            // データを取得したら、HTMLに反映する
            document.getElementById('category').textContent = question_data[0]["patient_header"]["category"];
            document.getElementById('patient_id').textContent = "患者ID: " + question_data[0]["patient_header"]["patient_id"];
            document.getElementById('name_kana').textContent = question_data[0]["patient_header"]["name_kana"];
            document.getElementById('name_kanji').textContent = question_data[0]["patient_header"]["name_kanji"];
            document.getElementById('patient_name(id)').textContent = question_data[0]["patient_header"]["name_kanji"] + " (" + question_data[0]["patient_header"]["patient_id"] + ")";
            document.getElementById('sex').textContent = "性別:" + question_data[0]["patient_header"]["sex"];
            document.getElementById('age').textContent = question_data[0]["patient_header"]["age"];
            document.getElementById('weight').textContent = question_data[0]["patient_header"]["weight"];

            // "right_side_bar":[
            //     {
            //         "bar_title": "診療動画",
            //         "file_source": "docs/question_files/question1/video/povideo.mp4",
            //         "type": "video",
            //     },{
            //         "bar_title": "バイタルサイン",
            //         "type": "text",
            //         "text": """体温:36.6℃
            //         心拍数:78/min.
            //         血圧:170/84mmHg
            //         呼吸数：14回/min.
            //         SpO2 100%(room air)
            //         """
            //     },{
            //         "bar_title": "身体所見",
            //         "type": "text",
            //         "text": """背部やや左側に強い自発痛と叩打痛あり。
            //             腹部には圧痛や反跳痛は認めない。
            //             """
            //     },{
            //         "bar_title": "CT検査",
            //         "type": "external_app",
            //         "file_source": "docs/question_files/question1/CT_DICOM_img",
            //     }
            // ]
            for (let i = 0; i < question_data[0]["right_side_bar"].length; i++) {
                // もしbar_titleと同じtextのボタンがあれば、そのボタンのonclickを変更する
                // なければ、新しいボタンを作成する
                if (document.getElementById(question_data[0]["right_side_bar"][i]["bar_title"])) {
                    const this_button = document.getElementById(question_data[0]["right_side_bar"][i]["bar_title"]);
                    // ボタンのstyle="color: black; background-color: white;" 
                    this_button.style.color = 'black';
                    this_button.style.backgroundColor = 'white';
                    // type=textの場合
                    if (question_data[0]["right_side_bar"][i]["type"] == "text") {
                        // このようなモーダルウィンドウを作成
                        //     <section id="vitalSignArea" class="imageArea" style="display: none;">
                        //     <div id="modalBg" class="modalBg" onclick="closeVitalSignModal()"></div>
                        //     <div class="imageWrapper">
                        //         <div class="imageContents">
                        //             <div class="image-window-bar">
                        //                 <h1>バイタルサイン</h1>
                        //                 <button onclick="closeVitalSignModal()" style="background-color: white; color: black;">
                        //                     閉じる</button>
                        //             </div>
                        //             <div>
                        //                 体温:36.6℃<br>心拍数:78/min.<br>血圧:170/84mmHg<br>呼吸数：14回/min.<br>SpO2 100%(room air)
                        //             </div>
                        //             <div class="blood-culture-window-footer">
                        //             </div>
                        //         </div>
                        //     </div>
                        // </section>
                        const newModalArea = document.createElement('section');
                        newModalArea.classList.add('imageArea');
                        newModalArea.style.display = 'none';
                        newModalArea.id = question_data[0]["right_side_bar"][i]["bar_title"] + 'Area' + i;
                        const newModalBg = document.createElement('div');
                        newModalBg.classList.add('modalBg');
                        newModalBg.onclick = function () {
                            newModalArea.style.display = 'none';
                        }
                        const newImageWrapper = document.createElement('div');
                        newImageWrapper.classList.add('imageWrapper');
                        const newImageContents = document.createElement('div');
                        newImageContents.classList.add('imageContents');
                        const newImageWindowBar = document.createElement('div');
                        newImageWindowBar.classList.add('image-window-bar');
                        const newTitle = document.createElement('h1');
                        newTitle.textContent = question_data[0]["right_side_bar"][i]["bar_title"];
                        const newButton = document.createElement('button');
                        newButton.textContent = '閉じる';
                        newButton.style.color = 'black';
                        newButton.style.backgroundColor = 'white';
                        newButton.onclick = function () {
                            newModalArea.style.display = 'none';
                        }
                        const newContent = document.createElement('div');
                        newContent.innerHTML = question_data[0]["right_side_bar"][i]["text"].replace(/\n/g, '<br>') + '<br>';
                        const newFooter = document.createElement('div');
                        newFooter.classList.add('blood-culture-window-footer');
                        newImageWindowBar.appendChild(newTitle);
                        newImageWindowBar.appendChild(newButton);
                        newImageContents.appendChild(newImageWindowBar);
                        newImageContents.appendChild(newContent);
                        newImageContents.appendChild(newFooter);
                        newImageWrapper.appendChild(newImageContents);
                        newModalArea.appendChild(newModalBg);
                        newModalArea.appendChild(newImageWrapper);
                        document.body.appendChild(newModalArea);
                        this_button.onclick = function () {
                            newModalArea.style.display = '';
                        }
                    } else if (question_data[0]["right_side_bar"][i]["type"] == "video") {
                        // type=videoの場合
                        // このようなモーダルウィンドウを作成
                        // <section id="videoArea" class="modalArea" style="display: none;">
                        //     <div id="videoBg" class="modalBg" onclick="closeVideoModal()"></div>
                        //     <div class="videoWrapper">
                        //         <div class="modalContents">
                        //             <div class="image-window-bar">
                        //                 <h1>診療動画</h1>
                        //                 <button onclick="closeVideoModal()" style="background-color: white; color: black;">
                        //                     閉じる</button>
                        //             </div>
                        //             <video id="videoPlace" src="./video/povideo.mp4" controls
                        //                 width="1200px">お使いのブラウザはvideoタグをサポートしていません。</video>
                        //         </div>
                        //     </div>
                        // </section>
                        const newModalArea = document.createElement('section');
                        newModalArea.classList.add('modalArea');
                        // newModalArea.classList.add('videoArea');
                        newModalArea.style.display = 'none';
                        newModalArea.id = question_data[0]["right_side_bar"][i]["bar_title"] + 'Area' + i;
                        const newVideo = document.createElement('video');
                        newVideo.src = question_data[0]["right_side_bar"][i]["file_source"];
                        newVideo.controls = true;
                        newVideo.width = 1200;
                        newVideo.textContent = 'お使いのブラウザはvideoタグをサポートしていません。';
                        const newModalBg = document.createElement('div');
                        newModalBg.classList.add('modalBg');
                        newModalBg.onclick = function () {
                            newModalArea.style.display = 'none';
                            newVideo.pause();
                        }
                        const newImageWrapper = document.createElement('div');
                        newImageWrapper.classList.add('videoWrapper');
                        const newImageContents = document.createElement('div');
                        newImageContents.classList.add('modalContents');
                        const newImageWindowBar = document.createElement('div');
                        newImageWindowBar.classList.add('image-window-bar');
                        const newTitle = document.createElement('h1');
                        newTitle.textContent = question_data[0]["right_side_bar"][i]["bar_title"];
                        const newButton = document.createElement('button');
                        newButton.textContent = '閉じる';
                        newButton.style.color = 'black';
                        newButton.style.backgroundColor = 'white';
                        newButton.onclick = function () {
                            newModalArea.style.display = 'none';
                            newVideo.pause();
                        }

                        newImageWindowBar.appendChild(newTitle);
                        newImageWindowBar.appendChild(newButton);
                        newImageContents.appendChild(newImageWindowBar);
                        newImageContents.appendChild(newVideo);
                        newImageWrapper.appendChild(newImageContents);
                        newModalArea.appendChild(newModalBg);
                        newModalArea.appendChild(newImageWrapper);
                        document.body.appendChild(newModalArea);
                        this_button.onclick = function () {
                            newModalArea.style.display = '';
                        }
                    } else if (question_data[0]["right_side_bar"][i]["type"] == "external_app") {


// 作成途中
                    }
                    }
                }

                for (let i = 0; i < question_data[0]["navigation_bar"].length; i++) {
                    // 看護カルテの場合
                    if (question_data[0]["navigation_bar"][i]["type"] == "nurse_note") {
                        // 下のようなオブジェクトを作成
                        //  <div class="main-left-progressnote-record">
                        //      <div class="main-left-progressnote-record-header">
                        //         <div style="display: flex;">
                        //             <button>開</button>
                        //             <button>閉</button>
                        //             <p>【看護カルテ】</p>
                        //         </div>
                        //         <p><span style="color: purple;">内科</span> <span>外来</span></p>
                        //     </div>
                        //     <div class="main-left-progressnote-record-header-row2">
                        //         <p>2024/05/13(月) 09:00</p>
                        //     </div>
                        //     <table class="progress-table">
                        //         <tr>
                        //             <th>依頼</th>
                        //             <th>2024/05/13(月) 10:00 看護師</th>
                        //             <th>総合　本</th>
                        //         </tr>
                        //         <tr>
                        //             <td colspan="3">本日、５１０号室入院。高血圧の精査目的。 <br> 入院時に背部痛の訴えがあったが、我慢ができないほどと、ナースコールあり。 <br> かなり痛みが強そうであり、表情は苦悶様。 <br> 担当医に診察依頼。 </td> <!-- colspan="3"で3列結合 -->  </td> <!-- colspan="3"で3列結合 -->
                        //         </tr>
                        //     </table>
                        // </div>
                        const nurseNoteRecord = document.createElement('div');
                        nurseNoteRecord.classList.add('main-left-progressnote-record');
                        nurseNoteRecord.id = 'nurse_note_record' + question_data[0]["navigation_bar"][i]["nav_id"];
                        nurseNoteRecord.style.display = 'none';
                        const nurseNoteRecordHeader = document.createElement('div');
                        nurseNoteRecordHeader.classList.add('main-left-progressnote-record-header');
                        const nurseNoteRecordHeaderRow1 = document.createElement('div');
                        nurseNoteRecordHeaderRow1.style.display = 'flex';
                        const nurseNoteTitle = document.createElement('p');
                        nurseNoteTitle.textContent = '【看護カルテ】';
                        const nurseNoteCategory = document.createElement('p');
                        nurseNoteCategory.innerHTML = '<span style="color: purple;">' + question_data[0]["navigation_bar"][i]["nurse_category"] + '</span> <span>外来</span>';
                        const nurseNoteRecordHeaderRow2 = document.createElement('div');
                        nurseNoteRecordHeaderRow2.classList.add('main-left-progressnote-record-header-row2');
                        const nurseNoteDate = document.createElement('p');
                        nurseNoteDate.textContent = question_data[0]["navigation_bar"][i]["date_1"];
                        const nurseTable = document.createElement('table');
                        nurseTable.classList.add('nurse-table');
                        const nurseTableTr1 = document.createElement('tr');
                        const nurseTableTh1 = document.createElement('th');
                        nurseTableTh1.textContent = '依頼';
                        const nurseTableTh2 = document.createElement('th');
                        nurseTableTh2.textContent = question_data[0]["navigation_bar"][i]["date_2"] + ' 看護師)' + question_data[0]["navigation_bar"][i]["nurse"];
                        const nurseTableTh3 = document.createElement('th');
                        nurseTableTh3.textContent = question_data[0]["navigation_bar"][i]["nurse_category"];
                        const openBtn = document.createElement('button');
                        openBtn.textContent = '開';
                        openBtn.style.display = 'none';
                        openBtn.style.color = 'black';
                        openBtn.style.backgroundColor = 'white';
                        const closeBtn = document.createElement('button');
                        closeBtn.textContent = '閉';
                        closeBtn.style.display = 'block';
                        closeBtn.style.color = 'black';
                        closeBtn.style.backgroundColor = 'white';
                        openBtn.onclick = function () {
                            nurseTable.style.display = '';
                            openBtn.style.display = 'none';
                            closeBtn.style.display = 'block';
                        }
                        closeBtn.onclick = function () {
                            nurseTable.style.display = 'none';
                            openBtn.style.display = 'block';
                            closeBtn.style.display = 'none';
                        }
                        nurseTableTr1.appendChild(nurseTableTh1);
                        nurseTableTr1.appendChild(nurseTableTh2);
                        nurseTableTr1.appendChild(nurseTableTh3);
                        nurseTable.appendChild(nurseTableTr1);
                        const nurseTableTr2 = document.createElement('tr');
                        const nurseTableTd1 = document.createElement('td');
                        nurseTableTd1.colSpan = 3;
                        // 改行状態 を保持しながら表示する
                        nurseTableTd1.innerHTML = question_data[0]["navigation_bar"][i]["text"].replace(/\n/g, '<br>');
                        nurseTableTr2.appendChild(nurseTableTd1);
                        nurseTable.appendChild(nurseTableTr2);
                        nurseNoteRecordHeaderRow1.appendChild(openBtn);
                        nurseNoteRecordHeaderRow1.appendChild(closeBtn);
                        nurseNoteRecordHeaderRow1.appendChild(nurseNoteTitle);
                        nurseNoteRecordHeader.appendChild(nurseNoteRecordHeaderRow1);
                        nurseNoteRecordHeader.appendChild(nurseNoteCategory);
                        nurseNoteRecordHeaderRow2.appendChild(nurseNoteDate);
                        nurseNoteRecord.appendChild(nurseNoteRecordHeader);
                        nurseNoteRecord.appendChild(nurseNoteRecordHeaderRow2);
                        nurseNoteRecord.appendChild(nurseTable);
                        const mainLeft = document.getElementById('main-left');
                        mainLeft.appendChild(nurseNoteRecord);
                        const navigation_row1 = document.createElement('a');
                        navigation_row1.textContent = question_data[0]["navigation_bar"][i]["title"];
                        const navigation_row1_close_a = document.createElement('a');
                        navigation_row1_close_a.textContent = question_data[0]["navigation_bar"][i]["title"];
                        navigation_row1_close_a.style.display = 'none';
                        navigation_row1_close_a.style.backgroundColor = 'navajowhite';
                        navigation_row1.onclick = function () {
                            document.getElementById('nurse_note_record' + question_data[0]["navigation_bar"][i]["nav_id"]).style.display = 'block';
                            navigation_row1.style.display = 'none';
                            navigation_row1_close_a.style.display = 'block';
                        }
                        navigation_row1_close_a.onclick = function () {
                            document.getElementById('nurse_note_record' + question_data[0]["navigation_bar"][i]["nav_id"]).style.display = 'none';
                            navigation_row1.style.display = 'block';
                            navigation_row1_close_a.style.display = 'none';
                        }
                        const navigation_bar = document.getElementById('navigation_bar');
                        if ("parent_id" in question_data[0]["navigation_bar"][i]) {
                            document.getElementById('tree_parent' + i).appendChild(navigation_row1);
                            document.getElementById('tree_parent' + i).appendChild(navigation_row1_close_a);
                        }
                        else {
                            navigation_bar.appendChild(navigation_row1);
                            navigation_bar.appendChild(navigation_row1_close_a);
                        }
                    } else if (question_data[0]["navigation_bar"][i]["type"] == "progress_note") {
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
                        // style="color: black; background-color: #fff;"
                        const openBtn = document.createElement('button');
                        openBtn.textContent = '開';
                        openBtn.style.display = 'none';
                        openBtn.style.color = 'black';
                        openBtn.style.backgroundColor = 'white';
                        const closeBtn = document.createElement('button');
                        closeBtn.textContent = '閉';
                        closeBtn.style.display = 'block';
                        closeBtn.style.color = 'black';
                        closeBtn.style.backgroundColor = 'white';
                        openBtn.onclick = function () {
                            progressTable.style.display = '';
                            openBtn.style.display = 'none';
                            closeBtn.style.display = 'block';
                        }
                        closeBtn.onclick = function () {
                            progressTable.style.display = 'none';
                            openBtn.style.display = 'block';
                            closeBtn.style.display = 'none';
                        }
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
                        navigation_row1_close_a.style.backgroundColor = 'navajowhite';
                        navigation_row1.onclick = function () {
                            document.getElementById('progress_note_record' + question_data[0]["navigation_bar"][i]["nav_id"]).style.display = 'block';
                            navigation_row1.style.display = 'none';
                            navigation_row1_close_a.style.display = 'block';
                        }
                        navigation_row1_close_a.onclick = function () {
                            document.getElementById('progress_note_record' + question_data[0]["navigation_bar"][i]["nav_id"]).style.display = 'none';
                            navigation_row1.style.display = 'block';
                            navigation_row1_close_a.style.display = 'none';
                        }
                        const navigation_bar = document.getElementById('navigation_bar');
                        // もしquestion_data[0]["navigation_bar"][i]に"parent_id" と言う キーがあれば
                        if ("parent_id" in question_data[0]["navigation_bar"][i]) {
                            document.getElementById('tree_parent' + i).appendChild(navigation_row1);
                            document.getElementById('tree_parent' + i).appendChild(navigation_row1_close_a);
                        } else {
                            navigation_bar.appendChild(navigation_row1);
                            navigation_bar.appendChild(navigation_row1_close_a);
                        }
                    } else if (question_data[0]["navigation_bar"][i]["type"] == "tree_parent") {
                        // 下のようなオブジェクトを 持つ親オブジェクトを作成
                        // <div id="tree_parent">
                        // <a>カルテ1</a>
                        // </div>
                        const tree_parent = document.createElement('div');
                        tree_parent.id = 'tree_parent' + question_data[0]["navigation_bar"][i]["nav_id"];
                        tree_parent.style.display = 'none';
                        tree_parent.style.paddingLeft = '15px';
                        const navigation_row2 = document.createElement('a');
                        navigation_row2.textContent = question_data[0]["navigation_bar"][i]["title"] + " ▽"
                        const navigation_row2_close_a = document.createElement('a');
                        navigation_row2_close_a.textContent = question_data[0]["navigation_bar"][i]["title"] + " △"
                        navigation_row2_close_a.style.display = 'none';
                        navigation_row2_close_a.style.backgroundColor = 'navajowhite';
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

                    } else if (question_data[0]["navigation_bar"][i]["type"] == "blood_test") {
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
                            bloodCultureArea.style.display = 'none';
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
                        bloodCultureTableTh1.textContent = question_data[0]["navigation_bar"][i]["title"];
                        bloodCultureTableTr1.appendChild(bloodCultureTableTh1);
                        bloodCultureTable.appendChild(bloodCultureTableTr1);
                        const bloodCultureTableTr2 = document.createElement('tr');
                        const bloodCultureTableTd1 = document.createElement('td');
                        bloodCultureTableTd1.innerHTML = question_data[0]["navigation_bar"][i]["result"].replace(/\n/g, '<br>');
                        bloodCultureTableTr2.appendChild(bloodCultureTableTd1);
                        bloodCultureTable.appendChild(bloodCultureTableTr2);

                        const closeBloodCultureBtn = document.createElement('button');
                        closeBloodCultureBtn.textContent = '閉じる';
                        closeBloodCultureBtn.style.color = 'black';
                        closeBloodCultureBtn.style.backgroundColor = 'white';
                        closeBloodCultureBtn.onclick = function () {
                            bloodCultureArea.style.display = 'none';
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
                        document.body.appendChild(bloodCultureArea);
                        // 下のような構造のオブジェクトを作成
                        // <div class="record_links" id="navigation_bar">
                        //     <!-- <a>血液検査結果</a> -->
                        //     <a onclick="openBloodCultureModal()">血液培養結果</a>
                        //     <div id="tree_parent">
                        //         <a>カルテ1</a>
                        //     </div>
                        // </div>
                        const bloodTestLink = document.createElement('a');
                        bloodTestLink.textContent = question_data[0]["navigation_bar"][i]["title"];
                        bloodTestLink.onclick = function () {
                            bloodCultureArea.style.display = '';
                        }
                        if ("parent_id" in question_data[0]["navigation_bar"][i]) {
                            document.getElementById('tree_parent' + question_data[0]["navigation_bar"][i]["parent_id"]).appendChild(bloodTestLink);
                        } else {
                            document.getElementById('navigation_bar').appendChild(bloodTestLink);
                        }
                    } else if (question_data[0]["navigation_bar"][i]["type"] == "urine_test") {
                        // 下のようなオブジェクトを作成
                        // <section id="urinalysisArea0" class="imageArea" style="display: none;">
                        // <div id="modalBg" class="modalBg" onclick="closeUrinalysisModal()"></div>
                        // <div class="imageWrapper">
                        //     <div class="imageContents">
                        //         <div class="image-window-bar">
                        //             <h1>尿検査結果</h1>

                        //             <button onclick="closeUrinalysisModal()">閉じる</button>
                        //         </div>
                        // <table class="urinalysis-table">
                        //                 <tr>
                        //                     <th>20XX年X月X+1日</th>
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
                        //         <div class="urinalysis-window-footer">
                        //         </div>
                        //     </div>
                        // </div>
                        // </section>
                        const urinalysisArea = document.createElement('section');
                        urinalysisArea.classList.add('imageArea');
                        urinalysisArea.style.zIndex = '11';
                        urinalysisArea.style.display = 'none';
                        urinalysisArea.id = 'urinalysisArea' + question_data[0]["navigation_bar"][i]["nav_id"];
                        const modalBg = document.createElement('div');
                        modalBg.classList.add('modalBg');
                        modalBg.onclick = function () {
                            urinalysisArea.style.display = 'none';
                        }
                        const imageWrapper = document.createElement('div');
                        imageWrapper.classList.add('imageWrapper');
                        const imageContents = document.createElement('div');
                        imageContents.classList.add('imageContents');
                        const imageWindowBar = document.createElement('div');
                        imageWindowBar.classList.add('image-window-bar');
                        const urinalysisTitle = document.createElement('h1');
                        urinalysisTitle.textContent = '尿検査結果';
                        const urinalysisTable = document.createElement('table');
                        urinalysisTable.classList.add('urinalysis-table');
                        const urinalysisTableTr1 = document.createElement('tr');
                        const urinalysisTableTh1 = document.createElement('th');
                        urinalysisTableTh1.textContent = question_data[0]["navigation_bar"][i]["title"];
                        urinalysisTableTr1.appendChild(urinalysisTableTh1);
                        urinalysisTable.appendChild(urinalysisTableTr1);
                        const urinalysisTableTr2 = document.createElement('tr');
                        const urinalysisTableTd1 = document.createElement('td');
                        urinalysisTableTd1.innerHTML = question_data[0]["navigation_bar"][i]["result"].replace(/\n/g, '<br>');
                        urinalysisTableTr2.appendChild(urinalysisTableTd1);
                        urinalysisTable.appendChild(urinalysisTableTr2);
                        const closeUrinalysisBtn = document.createElement('button');
                        closeUrinalysisBtn.textContent = '閉じる';
                        closeUrinalysisBtn.style.color = 'black';
                        closeUrinalysisBtn.style.backgroundColor = 'white';
                        closeUrinalysisBtn.onclick = function () {
                            urinalysisArea.style.display = 'none';
                        }
                        const urinalysisWindowFooter = document.createElement('div');
                        urinalysisWindowFooter.classList.add('urinalysis-window-footer');
                        urinalysisWindowFooter.innerHTML = '';
                        imageWindowBar.appendChild(urinalysisTitle);
                        imageWindowBar.appendChild(closeUrinalysisBtn);
                        imageContents.appendChild(imageWindowBar);
                        imageContents.appendChild(urinalysisWindowFooter);
                        imageContents.appendChild(urinalysisTable);
                        imageWrapper.appendChild(imageContents);
                        urinalysisArea.appendChild(modalBg);
                        urinalysisArea.appendChild(imageWrapper);
                        document.body.appendChild(urinalysisArea);


                        // 下のような構造のオブジェクトを作成
                        // <div class="record_links" id="navigation_bar">
                        //     <!-- <a>血液検査結果</a> -->
                        //     <a onclick="openBloodCultureModal()">血液培養結果</a>
                        //     <div id="tree_parent">
                        //         <a>カルテ1</a>
                        //     </div>
                        // </div>
                        const urineTestLink = document.createElement('a');
                        urineTestLink.textContent = question_data[0]["navigation_bar"][i]["title"];
                        urineTestLink.onclick = function () {
                            urinalysisArea.style.display = '';
                        }
                        if ("parent_id" in question_data[0]["navigation_bar"][i]) {
                            document.getElementById('tree_parent' + question_data[0]["navigation_bar"][i]["parent_id"]).appendChild(urineTestLink);
                        } else {
                            document.getElementById('navigation_bar').appendChild(urineTestLink);
                        }
                    }


                }

            })
});

let copyImageIndex = 0;
// アプリのスタート時間を記録する
let start_time = new Date().toLocaleString();

// カルテを閉じるボタンで起動する
async function openAnswerModal() {
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
        // document.getElementById('pasted-img' + i)　の親要素が display:none だったら
        if (i == 0 || document.getElementById('pasted-img' + i).parentElement.style.display == 'none') {
        } else {
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
        // document.getElementById('pasted-img' + i)　の親要素が display:none だったら
        if (i == 0 || document.getElementById('pasted-img' + i).parentElement.style.display == 'none') {
        } else {
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
    eel.save_text_file(output_text)();
    eel.restart_app()();
    // HTMLをリロードする
    location.reload();
}
function closeAnswerModal() {
    document.getElementById('modalArea').style.display = 'none';
}

function openVitalSignModal() {
    document.getElementById('vitalSignArea').style.display = 'block';
}
function closeVitalSignModal() {
    document.getElementById('vitalSignArea').style.display = 'none';
}
function openPhysicalExamModal() {
    document.getElementById('physicalExamArea').style.display = 'block';
}
function closePhysicalExamModal() {
    document.getElementById('physicalExamArea').style.display = 'none';
}
function openVideoModal() {
    document.getElementById('videoArea').style.display = 'block';
}
function closeVideoModal() {
    document.getElementById('videoArea').style.display = 'none';
    // videoタグで再生している動画を停止する
    document.getElementById('videoPlace').pause();
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
    // alert("印刷ポップアップが表示されますが、「キャンセル」を押してください。");
    let result_png_path = await eel.grab_clipboard_image()();
    // print(result_png_path);

    if (result_png_path) {
        // 画像を表示
        copyImageIndex++;
        const img = document.getElementById('imagePlace');
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
        textarea.addEventListener('input', function () {
            adjustTextareaHeight(textarea);
        });
        pastedImgBox.appendChild(imgTag);
        pastedImgBox.appendChild(deleteBtn);
        imgPasteBox.appendChild(pastedImgBox);
        imgPasteBox.appendChild(textarea);
        adjustTextareaHeight(textarea);
        adjustTextareaHeight(document.getElementById('progress_object0'));
    } else {
        alert('貼り付ける画像がコピーされていませんでした。Ctrl + C で画像をコピーしてから、もう一度「CT画像を貼付」ボタンを押してください。');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    let textareas = document.getElementsByClassName('dynamic-textarea');

    function adjustTextareaHeight(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }

    Array.prototype.forEach.call(textareas, function (textarea) {
        textarea.addEventListener('input', function () {
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

function copyImage() {
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
    textarea.addEventListener('input', function () {
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
