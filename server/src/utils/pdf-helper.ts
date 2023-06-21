import PDFDocument from 'pdfkit-table';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';

export function generatePDF(ticket: Ticket): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      bufferPages: true,
    });

    // Create a buffer to store the PDF document
    const buffers: Buffer[] = [];

    // Register the 'data' event to capture the chunks of PDF data
    doc.on('data', (chunk) => buffers.push(chunk));

    // Register the 'end' event when the PDF generation is complete
    doc.on('end', () => {
      const buffer = Buffer.concat(buffers);
      resolve(buffer);
    });

    // Register the 'error' event if any error occurs during PDF generation
    doc.on('error', (error) => {
      reject(error);
    });

    // Generate the content for the PDF
    doc.font('Helvetica');
    doc.fontSize(20).text('Ticket Details', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Ticket ID: ${ticket.id}`);
    doc.fontSize(14).text(`Ticket Date: ${ticket.date}`);
    doc.fontSize(14).text(`Ticket Owner: ${ticket.owner}`);

    // End the PDF generation
    doc.end();
  });
}
