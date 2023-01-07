import * as React from 'react';
import { DataGrid , GridToolbar } from '@mui/x-data-grid';

export default function DataTable({row, columns, handleClickSelect, isID}) {

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        autoHeight
        rows={row}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        checkboxSelection
        pagination
        onCellClick={handleClickSelect}
        experimentalFeatures={{aggregation: true}}
        getRowId={isID ? (row) => row._id : undefined}
        components={{
          Toolbar:GridToolbar
        }}
      />
    </div>
  );
}