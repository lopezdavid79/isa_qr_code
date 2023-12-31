import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256); // Tamaño predeterminado del código QR
  const qrRef = useRef(null);
  const [qrGenerated, setQRGenerated] = useState(false);

  const handleInputChange = (e) => {
    setText(e.target.value);
    setQRGenerated(false); // Reiniciar la bandera cuando se cambia el texto
  };

  const handleSizeChange = (e) => {
    setSize(parseInt(e.target.value));
  };

  const generateQRCode = () => {
    if (text.trim() !== '') {
      setQRGenerated(true); // Establecer la bandera como verdadera al generar el QR
    }
  };

  const downloadQRCode = () => {
    if (qrGenerated) {
      const canvas = qrRef.current?.qrCodeCanvas;
      if (canvas) {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = 'codigo_qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <div>
      <h1>Generador de códigos QR</h1>
      <input
        type="text"
        placeholder="Ingresa el texto para generar el código QR"
        value={text}
        onChange={handleInputChange}
      />
      <label>
        Tamaño del código QR:
        <input
          type="number"
          value={size}
          onChange={handleSizeChange}
          min="100"
          max="500"
        />
      </label>
      <button onClick={generateQRCode}>Generar QR</button>
      <button onClick={downloadQRCode} disabled={!qrGenerated}>
        Descargar QR
      </button>
      {text.trim() === '' && qrGenerated && (
        <p>Por favor, ingresa texto para generar el código QR.</p>
      )}
      <div>
        {qrGenerated && text.trim() !== '' && (
          <QRCode value={text} size={size} ref={qrRef} />
        )}
      </div>
    </div>
  );
};

export default QRGenerator;
