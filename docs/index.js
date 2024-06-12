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
    //<div class="pasted-img-box">
    // <img src="./img/1.png" alt="画像1">
    // <button onclick="deleteImage()">削除</button>
    //</div>
    const img = document.getElementById('imagePlace');
    const imgSrc = img.src;
    const imgPasteBox = document.getElementById('img-paste-box');
    const pastedImgBox = document.createElement('div');
    pastedImgBox.classList.add('pasted-img-box');
    const imgTag = document.createElement('img');
    imgTag.src = imgSrc;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.onclick = function () {
        imgPasteBox.removeChild(pastedImgBox);
    }
    pastedImgBox.appendChild(imgTag);
    pastedImgBox.appendChild(deleteBtn);
    imgPasteBox.appendChild(pastedImgBox);
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
