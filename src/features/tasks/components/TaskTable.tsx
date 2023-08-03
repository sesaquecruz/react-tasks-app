import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel, GridRenderCellParams, GridRowsProp, GridSortModel, GridToolbar } from "@mui/x-data-grid";
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { dateFormat } from '../../../config/timezone';
import { Page } from "../../../types/Task";

type Props = {
	data: Page;
	isFetching: boolean;
  pageSizes: number[];
  pageSize: number;
	handlePaginationChange: (pagination: GridPaginationModel) => void;
	handleFilterChange: (filter: GridFilterModel) => void;
  handleSortChange: (sort: GridSortModel) => void;
	handleDelete: (id: string) => void;
}

export function TaskTable(props: Props) {
	const rows: GridRowsProp = props.data.items;

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 175, },
    { field: "description", headerName: "Description", minWidth: 200, flex: 1, hideable: true, sortable: false },
    { field: "priority", headerName: "Priority", width: 110, sortable: false, renderCell: capitalizeFirstLetter },
    { field: "status", headerName: "Status", width: 110, sortable: false, renderCell: capitalizeFirstLetter },
    { field: "due_date", headerName: "Due Date", width: 150, renderCell: renderDatetCell },
    { field: "id", headerName: "Actions", width: 110, sortable: false, renderCell: renderActionsCell },
  ];

  function capitalizeFirstLetter(params: GridRenderCellParams) {
    return params.value[0].toUpperCase() + params.value.slice(1).toLowerCase();
  }

  function renderDatetCell(params: GridRenderCellParams) {
    return dayjs(params.value).format(dateFormat)
  }

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <Box>
        <Link style={{ textDecoration: "none" }} to={`/tasks/edit/${params.value}`} >
          <IconButton color="primary" aria-label="edit">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton color="warning" aria-label="delete" onClick={() => props.handleDelete(params.value)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    );
	}

  const rowCount = props.data.total;

  return (
    <DataGrid
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableRowSelectionOnClick
        filterMode='server'
        loading={props.isFetching}
        onFilterModelChange={props.handleFilterChange}
        onPaginationModelChange={props.handlePaginationChange}
        onSortModelChange={props.handleSortChange}
        pageSizeOptions={props.pageSizes}
        paginationMode='server'
        paginationModel={{page: props.data.page, pageSize: props.pageSize}}
        rowCount={rowCount}
        rows={rows}
        slotProps={{ toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 }}}}
        slots={{ toolbar: GridToolbar, noRowsOverlay: () => <></> }}
    />
  )
}
