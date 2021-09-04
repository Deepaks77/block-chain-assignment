import React, { useState } from "react";

import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const TransactionTable = ({ history, transactions }) => {
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
	const sideBarDef = {
		toolPanels: [
			{
				id: "columns",
				labelDefault: "Columns",
				labelKey: "columns",
				iconKey: "columns",
				toolPanel: "agColumnsToolPanel",
			},
			{
				id: "filters",
				labelDefault: "Filters",
				labelKey: "filters",
				iconKey: "filter",
				toolPanel: "agFiltersToolPanel",
			},
		],
		position: "right",
	};
	const onGridReady = (params) => {
		console.log(gridColumnApi, gridApi);
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
	};

	return (
		<div className="ag-theme-balham" style={{ height: 550, width: "100%" }}>
			<AgGridReact
				rowData={transactions}
				onFirstDataRendered={onFirstDataRendered}
				onGridReady={onGridReady}
				defaultColDef={defaultColDef}
				suppressMenuHide={true}
				pagination={true}
				sideBar={sideBarDef}
			>
				<AgGridColumn
					headerName="Transaction Hash"
					field="hash"
					sortable={true}
					filter={true}
				/>
				<AgGridColumn
					headerName="From"
					field="from"
					sortable={true}
					filter={true}
				/>
				<AgGridColumn
					headerName="To"
					field="to"
					sortable={true}
					filter={true}
				/>
				<AgGridColumn
					headerName="Value"
					field="_hex"
					sortable={true}
					filter={true}
				/>
			</AgGridReact>
		</div>
	);
};

export default TransactionTable;
