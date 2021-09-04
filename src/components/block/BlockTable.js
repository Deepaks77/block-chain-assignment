import React, { useState } from "react";

import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const BlockTable = ({ history, blocks }) => {
	const [gridApi, setGridApi] = useState(null);
	const [gridColumnApi, setGridColumnApi] = useState(null);

	const defaultColDef = {
		resizable: true,
		editable: true,
		flex: 1,
	};
	const onFirstDataRendered = (params) => {
		//	console.log("Params recieved on first rendered", params);
		params.api.sizeColumnsToFit();
	};
	const onGridReady = (params) => {
		console.log(gridColumnApi);
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
	};
	const onSelectionChanged = () => {
		const selectedRows = gridApi.getSelectedRows()[0];
		history.push({
			pathname: `/block/${selectedRows.hash}`,
		});
	};
	return (
		<div className="ag-theme-balham" style={{ height: 325, width: "100%" }}>
			<AgGridReact
				rowData={blocks.sort((a, b) => b.number - a.number)}
				onFirstDataRendered={onFirstDataRendered}
				rowSelection="single"
				onSelectionChanged={onSelectionChanged}
				onGridReady={onGridReady}
				defaultColDef={defaultColDef}
				suppressMenuHide={true}
			>
				<AgGridColumn
					headerName="Block Number"
					field="number"
					sortable={true}
				/>
				<AgGridColumn
					headerName="Block Hash"
					field="hash"
					sortable={true}
				/>
				<AgGridColumn
					headerName="Timestamp"
					field="timestamp"
					sortable={true}
				/>
				<AgGridColumn
					headerName="Gas Limit"
					field="_hex"
					sortable={true}
				/>
			</AgGridReact>
		</div>
	);
};

export default BlockTable;
