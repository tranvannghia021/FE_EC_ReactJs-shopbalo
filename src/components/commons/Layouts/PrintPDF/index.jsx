import React from 'react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
const PrintPDF = (props) => {
  const components = useRef();
  const handlePrint = useReactToPrint({
    content: () => components.current,
    documentTitle: 'emp-data',
    onAfterPrint: () => alert(components.current),
  });
  return (
    <div ref={components} style={{ width: '100%', height: window.innerHeight }}>
      <main>{props.data}</main>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default PrintPDF;
