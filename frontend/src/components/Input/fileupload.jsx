import React from 'react'
import FileUpload from "react-material-file-upload"

export default function FieldInput(
  {title, value, allowedExtensions, handleFilesChange, handleFileUploadError}) {
  
  return (
    <FileUpload
        accept={allowedExtensions}
        title={title}
        maxFiles={1}
        onChange={handleFilesChange}
        onDropRejected={handleFileUploadError}
        value={value}
    />
  )
}