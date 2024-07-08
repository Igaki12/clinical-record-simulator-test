
let copyImageIndex = 0;
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
    let output_text = "保存された時刻：" + new Date().toLocaleString() + "\n";
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
    eel.save_clinical_record(output_text);


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
function startCTApp() {
    alert('CTアプリを起動します');
    const pasteCTImageBtn = document.getElementById('pasteCTImageBtn');
    pasteCTImageBtn.style.display = 'block';
    eel.start_ct_app();
    document.getElementById('startCTBtn').style.display = 'none';
}
function displayImage() {
    // Python関数を呼び出してクリップボードから画像を取得
    let result = eel.grab_clipboard_image()();
    print(result);
    
    if (result) {
        // 画像を表示
        copyImageIndex++;
        const img = document.getElementById('imagePlace');
        alert(result);
        img.src = result;
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
