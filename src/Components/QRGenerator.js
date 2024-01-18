import React, { useState, useRef } from 'react';
import { Button, Form, Container, Modal } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [qrGenerated, setQRGenerated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const qrContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setText(e.target.value);
    setQRGenerated(false);
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    if (!isNaN(newSize) && newSize >= 100 && newSize <= 500) {
      setSize(newSize);
    }
  };

  const handleSizeSelection = (selectedSize) => {
    setSize(selectedSize);
    setQRGenerated(false);
  };

  const generateQRCode = () => {
    if (text.trim() !== '') {
      setQRGenerated(true);
      setShowModal(true); // Mostrar el modal cuando se genera el código QR
    }
  };

  const downloadQRCode = () => {
    if (qrContainerRef.current) {
      html2canvas(qrContainerRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'qrcode.png';
        link.click();
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-5">
      <h1>ISA Code Generator</h1>
      <h2>Simple y rápido generador de código QR.</h2>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Ingresa el texto para generar el código QR"
          value={text}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tamaño del código QR:</Form.Label>
        <Form.Control
          as="select"
          value={size}
          onChange={(e) => handleSizeSelection(parseInt(e.target.value))}
        >
          <option value={100}>Pequeño</option>
          <option value={256}>Mediano</option>
          <option value={400}>Grande</option>
          <option value={500}>Muy Grande</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" className="me-2" onClick={generateQRCode}>
        Generar QR
      </Button>
      <Button variant="secondary" onClick={downloadQRCode} disabled={!qrGenerated}>
        Descargar QR
      </Button>
      {text.trim() === '' && qrGenerated && (
        <p className="text-danger">Por favor, ingresa texto para generar el código QR.</p>
      )}

      {/* Modal para mostrar el código QR */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Código QR Generado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div ref={qrContainerRef}>
            {qrGenerated && text.trim() !== '' && <QRCode value={text} size={size} />}
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default QRGenerator;
