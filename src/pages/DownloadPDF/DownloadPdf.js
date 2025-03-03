import React from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import { Document, Page } from 'react-pdf';

const DownloadPdf = () => {
  const samplePdfUrl = "https://file-examples.com/storage/feb114c26367c53d69358a1/2017/10/file-sample_150kB.pdf"; // Static PDF URL

  // State for the PDF rendering
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  // Handle PDF loading and page count
  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Handle PDF page navigation
  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
      <Paper sx={{ padding: 2, marginBottom: 3, textAlign: 'center' }} elevation={3}>
        <Typography variant="h4" gutterBottom>
          View and Download PDF
        </Typography>
        <Typography variant="body1" paragraph>
          Here is a sample PDF file. You can view it and also download it using the button below.
        </Typography>
      </Paper>

      {/* PDF Display Section */}
      <Box sx={{ marginBottom: 3, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Document
          file={samplePdfUrl}
          onLoadSuccess={onLoadSuccess}
          options={{ workerSrc: `https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js` }}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        {/* Page Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            sx={{ marginRight: 1 }}
          >
            Previous
          </Button>
          <Typography variant="body1">
            Page {pageNumber} of {numPages}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            sx={{ marginLeft: 1 }}
          >
            Next
          </Button>
        </Box>
      </Box>

      {/* Download Section */}
      <Button
        variant="contained"
        color="secondary"
        href={samplePdfUrl}
        download="file-sample_150kB.pdf"
        sx={{ width: '200px', textTransform: 'none' }}
      >
        Download PDF
      </Button>
    </Box>
  );
};

export default DownloadPdf;
