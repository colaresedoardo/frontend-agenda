'use client'
import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
type Props = {
  dados: []
}
export default function TabelaComponent(props: Props) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 50 },
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'valor', headerName: 'Valor', width: 150 },
    { field: 'descricao', headerName: 'Descricao', width: 300 },
  ]
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        // alignItems: 'center',
      }}
    >
      <DataGrid
        rows={props.dados}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        scrollbarSize={5}
      />
    </Box>
  )
}
