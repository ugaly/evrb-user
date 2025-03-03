// import React from "react";
// import { Watermark } from 'antd';

// const DigitalSeal = () => {
//     return (
//         <Watermark content={['Valuers Registration', 'Watermark']}>
//         <div style={{ height: 500 }} />
//       </Watermark>

//     );
// };

// export default DigitalSeal;



import React, { useEffect, useRef } from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

const DigitalSeal = ({ qrValue }) => {
  const canvasRef = useRef(null);

  // Function to draw circles and text on canvas
  const drawSeal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = 120;
    const innerRadius = 80;

    // Draw Outer Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#0000FF";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw Inner Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.stroke();

    // Function to draw curved text
    const drawCurvedText = (text, radius, startAngle, endAngle, isTop) => {
      ctx.font = "bold 14px Arial";
      ctx.fillStyle = "#0000FF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textArray = text.split("");
      const totalAngle = endAngle - startAngle;
      const angleStep = totalAngle / (textArray.length - 1);

      textArray.forEach((char, i) => {
        let angle = startAngle + i * angleStep;
        let x = centerX + radius * Math.cos(angle);
        let y = centerY + radius * Math.sin(angle);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(isTop ? angle + Math.PI / 2 : angle - Math.PI / 2);
        ctx.fillText(char, 0, 0);
        ctx.restore();
      });
    };

    // Draw Top and Bottom Text
    drawCurvedText("Patrick Ndibaiyukamu Pascal", outerRadius - 10, Math.PI, 2 * Math.PI, true); // Top
    drawCurvedText("       V.R.B      ", outerRadius - 10, 0, Math.PI, false); // Bottom
  };

  // Draw on canvas when component mounts
  useEffect(() => {
    drawSeal();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Digital Seal
        </Typography>
        <Box sx={{ position: "relative" }}>
          <canvas
            ref={canvasRef}
            width={250}
            height={250}
            style={{
              border: "1px solid #ccc",
              borderRadius: "50%",
            }}
          ></canvas>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <QRCodeCanvas value={qrValue} size={128} />
        </Box>
      </Paper>
    </Container>
  );
};

export default DigitalSeal;
