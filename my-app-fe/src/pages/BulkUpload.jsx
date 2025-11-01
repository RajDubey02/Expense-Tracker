import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { uploadBulkTransactions } from '../services/transactions';
import { FileUp, Download, AlertTriangle, X, Check } from 'lucide-react';

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile) => {
    // Check file type
    if (!selectedFile.name.match(/\.(xlsx|xls|csv)$/)) {
      toast.error('Please upload a valid Excel or CSV file');
      return;
    }

    // Check file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setFile(selectedFile);
    readFile(selectedFile);
  };

  const readFile = (selectedFile) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        
        // Get headers and first 5 rows for preview
        const headers = jsonData[0] || [];
        const previewRows = jsonData.slice(1, 6).filter(row => row.length > 0);
        
        setPreviewData({
          headers,
          rows: previewRows,
          totalRows: jsonData.length - 1
        });
        
      } catch (error) {
        console.error('Error reading file:', error);
        toast.error('Error reading file. Please check the format.');
      }
    };
    
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setErrors([]);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await uploadBulkTransactions(formData);
      
      if (response.success) {
        toast.success(`Successfully uploaded ${response.insertedCount} transactions`);
        setFile(null);
        setPreviewData([]);
        fileInputRef.current.value = '';
      } else {
        if (response.errors) {
          setErrors(response.errors);
        }
        toast.error(response.message || 'Error uploading file');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An error occurred while uploading the file');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadTemplate = () => {
    // Create sample data for template
    const data = [
      ['type', 'amount', 'description', 'category', 'date'],
      ['income', '5000', 'Salary', 'Salary', '2023-11-01'],
      ['expense', '200', 'Grocery', 'Food', '2023-11-02'],
      ['expense', '1000', 'Rent', 'Housing', '2023-11-01'],
      ['income', '2000', 'Freelance', 'Work', '2023-11-03']
    ];

    // Create workbook and worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    
    // Generate and download the file
    XLSX.writeFile(wb, 'transaction_template.xlsx');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Bulk Upload Transactions</h1>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">How to prepare your file</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="text-yellow-700">
                <strong>Important:</strong> Please make sure your file follows the required format.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-medium mb-2">Required Columns:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><code>type</code> (income/expense)</li>
                <li><code>amount</code> (positive number)</li>
                <li><code>description</code> (text)</li>
                <li><code>category</code> (text, optional)</li>
                <li><code>date</code> (YYYY-MM-DD)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">File Requirements:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Excel (.xlsx, .xls) or CSV format</li>
                <li>Maximum file size: 5MB</li>
                <li>First row should contain headers</li>
                <li>Date format: YYYY-MM-DD</li>
              </ul>
            </div>
          </div>
          
          <button
            onClick={downloadTemplate}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Download className="h-4 w-4 mr-1" />
            Download Excel Template
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="space-y-2">
              <FileUp className="mx-auto h-10 w-10 text-gray-400" />
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">Excel or CSV (max 5MB)</p>
              {file && (
                <p className="text-sm text-green-600 mt-2">
                  <Check className="inline h-4 w-4 mr-1" />
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileChange}
            />
          </div>
          
          {previewData.rows && previewData.rows.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Preview (First 5 Rows)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border">
                  <thead className="bg-gray-50">
                    <tr>
                      {previewData.headers.map((header, index) => (
                        <th 
                          key={index}
                          className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewData.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {previewData.totalRows > 5 && (
                  <p className="text-sm text-gray-500 mt-2">
                    ... and {previewData.totalRows - 5} more rows
                  </p>
                )}
              </div>
            </div>
          )}
          
          {errors.length > 0 && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400">
              <h4 className="font-medium text-red-800">Found {errors.length} error(s):</h4>
              <ul className="mt-2 text-sm text-red-700 list-disc pl-5 space-y-1">
                {errors.slice(0, 5).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
                {errors.length > 5 && (
                  <li>... and {errors.length - 5} more errors</li>
                )}
              </ul>
            </div>
          )}
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setPreviewData([]);
                setErrors([]);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                !file || isLoading
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={!file || isLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload Transactions'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkUpload;