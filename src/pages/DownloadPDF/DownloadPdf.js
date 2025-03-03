import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth/auth_service";
import { Box, Button, CircularProgress, Typography, Paper } from "@mui/material";

const DownloadPdf = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPdf(); // Fetch PDF when the component mounts
  }, []);

  const fetchPdf = async () => {
    try {
      const response = await AuthService.getPdf();
      if (!response || !response.data) {
        console.error("Invalid response from server");
        return;
      }

      // Convert base64 PDF to a Blob URL
      const byteCharacters = atob(response.data);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteNumbers], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setPdfUrl(url);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        // minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: 3,
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 4, 
          borderRadius: 3, 
        //   maxWidth: "900px", 
          width: "100%", 
          textAlign: "center" 
        }}
      >
        {/* <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
          PDF Viewer
        </Typography> */}

        {loading ? (
          <CircularProgress sx={{ marginTop: 2 }} />
        ) : pdfUrl ? (
          <>
            <Box 
              sx={{
                width: "100%",
                height: "600px",
                borderRadius: 2,
                border: "1px solid #ddd",
                overflow: "hidden",
                marginTop: 2,
              }}
            >
              {/* Display PDF */}
              <iframe src={pdfUrl} width="100%" height="100%" title="PDF Preview"></iframe>
            </Box>

            {/* Download Button */}
            <Button 
              variant="contained" 
              sx={{ marginTop: 3, backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
              href={pdfUrl} 
              download="document.pdf"
            >
              Download PDF
            </Button>
          </>
        ) : (
          <Typography color="error">Error loading PDF</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default DownloadPdf;
