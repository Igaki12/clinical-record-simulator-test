function openAnswerModal() {
    document.getElementById('modalArea').style.display = 'block';
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
    eel.start_ct_app();
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

let copyImageIndex = 0;
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
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.onclick = function () {
        imgPasteBox.removeChild(pastedImgBox);
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
