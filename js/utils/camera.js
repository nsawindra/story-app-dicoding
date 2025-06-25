let stream = null;

const initCamera = async (previewEl, startBtn, captureBtn) => {
    try {
        // Hentikan stream lama jika ada, untuk mencegah error
        if (stream) {
            stopCamera();
        }

        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        previewEl.srcObject = stream;
        
        // Tampilkan video dan tombol ambil gambar, sembunyikan tombol start
        previewEl.style.display = 'block';
        startBtn.style.display = 'none';
        captureBtn.style.display = 'block';

    } catch (error) {
        console.error('Camera error:', error);
        // Beri tahu pengguna jika ada masalah izin atau tidak ada kamera
        alert('Tidak bisa mengakses kamera. Pastikan Anda memberikan izin dan perangkat kamera terpasang.');
    }
};

const takePicture = (previewEl, canvasEl, resultEl, captureBtn) => {
    canvasEl.width = previewEl.videoWidth;
    canvasEl.height = previewEl.videoHeight;
    canvasEl.getContext('2d').drawImage(previewEl, 0, 0);
    resultEl.src = canvasEl.toDataURL('image/jpeg');
    
    // Tampilkan hasil foto, sembunyikan video dan tombol
    resultEl.style.display = 'block';
    previewEl.style.display = 'none';
    captureBtn.style.display = 'none';
    
    stopCamera();
};

const stopCamera = () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
};

export { initCamera, takePicture, stopCamera };