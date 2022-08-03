import React from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { MyCommandCell } from "./myCommandCell";

import { DropDownList, ComboBox } from "@progress/kendo-react-dropdowns";
import { insertItem, getItems, updateItem, deleteItem } from "./services";
import { filterBy, orderBy } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";



import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
  IntlService,
} from "@progress/kendo-react-intl";
import { sampleProducts } from "./sample-products";
import { useTranslation } from "react-i18next";
import { useNavigate, useRoutes } from "react-router-dom";
import axios from "axios";
import ResumeData1 from "./ResumeData1";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
const PDFExport = React.lazy(() => import('./PDFExport'));

const initialSort = [
  {
    field: "incDate",
    field: "reportBy",
    field: "reportBy",
    field: "reportBy",
    dir: "asc",
  },
];
const editField = "inEdit";
const intialstate = {
  logic: "and",
  filters: [],
};
const initialDataState = {
  skip: 0,
  take: 5
};
const Incident_report = () => {
  const [exportPDF, setSetExportPDF] = React.useState(false);

  const exportCallback = () => {
    setSetExportPDF(false);
  };

  const [sort, setSort] = React.useState(initialSort);
  const sports = [
    "Baseball",
    "Basketball",
    "Cricket",
    "Field Hockey",
    "Football",
    "Table Tennis",
    "Tennis",
    "Volleyball",
  ];
  const [page, setPage] = React.useState(initialDataState);
  let gridPDFExport;

  // const locales = [
  //   {
  //     language: "en-US",
  //     locale: "en",
  //   },
  //   {
  //     language: "es-ES",
  //     locale: "es",
  //   },
  // ];
  const { t, i18n } = useTranslation();
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState(intialstate);
  //const [currentLocale, setCurrentLocale] = React.useState(locales[0]);
  const [users, setUsers] = React.useState([]);

  const getData = async () => {
    const res = await axios.get(
      "https://localhost:5001/api/IncidentMgmt/incidentList"
    );

    setUsers(res.data.responseObject);
  };

  React.useEffect(() => {
    let newItems = getItems();

    getData();
    //setData(json.responseObject);
    setData(newItems);
  }, []);
  console.log("dta is", users);
  // modify the data in the store, db etc

  const remove = (users) => {
    //console.log("dataItem", dataItem);
    const newData = users.filter((item) => item.id != users.id);
    setUsers(newData);
  };

  const add = (dataItem) => {
    console.log("dataItem", dataItem);
    dataItem.inEdit = true;
    const newData = insertItem(dataItem);
    setUsers(newData);
  };

  const update = (dataItem) => {
    // console.log("dataItem", dataItem);
    dataItem.inEdit = false;
    const newData = updateItem(dataItem);
    setUsers(newData);
  }; // Local state operations

  const discard = () => {
    // const newData = [...data];
    // newData.splice(0, 1);
    // setUsers(newData);
  };

  
  const cancel = (dataItem) => {
    // const originalItem = getItems().find(
    //   (p) => p.ProductID === dataItem.ProductID
    // );
    // const newData = data.map((item) =>
    //   item.ProductID === originalItem.ProductID ? originalItem : item
    // );
    // setData(newData);
  };
  const pageChange = event => {
    setPage(event.page);
  };

  const enterEdit = (dataItem) => {
    console.log("dataItem :>> ", dataItem);
    navigate(`/Editworkpermit/${dataItem.code}`);
    // setUsers(
    //   users.map(
    //     (item) => (item.id === dataItem.id ? { ...item, inEdit: true } : item)
    //     // console.log("item", item)
    //   )
    // );
    // getEditData();
  };

  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.ProductID === event.dataItem.ProductID
        ? { ...item, [event.field || ""]: event.value }
        : item
    );
    setData(newData);
  };

  const addNew = () => {
    const newDataItem = {
      inEdit: true,
      Discontinued: false,
    };
    setData([newDataItem, ...data]);
  };
  
  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value.locale);
  };

  const CommandCell = (props) => (
    <MyCommandCell
      {...props}
      edit={enterEdit}
      remove={remove}
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  );
 
  const DateCell = ({ dataItem }) => {
    return <td>{moment(dataItem.incDate).format("DD/MM/YYYY")}</td>;
  };
  const grid = (
    <Grid style={{
      height:"450px",
    }}
    className=".k-grid-header"
      onItemChange={itemChange}
      editField={editField}
      filterable={true}
      sortable={true}
      data={filterBy(orderBy(users.slice(page.skip, page.take + page.skip), sort), filter )}
      filter={filter}
      onFilterChange={(e) => setFilter(e.filter)}
      onPageChange={pageChange}
      pageable={true}
      skip={page.skip}
      take={page.take}
      total={users.length}
      sort={sort}
      onSortChange={(e) => {
        setSort(e.sort);
      }}
      >
    
      <GridToolbar>
        {/* Locale:&nbsp;&nbsp;&nbsp;
        <DropDownList
          value={currentLocale}
          textField="language"
          onChange={(e) => {
            handleChange(e);
            // setCurrentLocale(e.target.value);
          }}
          data={locales}
        />*/}
        <Row className="w-100">
        
          
            <lable
              title="Add new"
              className="firstlable"
              
            >
              + Report an Incident
            </lable>
            <ResumeData1
              users={users}
              setUsers={setUsers}
              handleChange={handleChange}
            />
          
        </Row>

        
      </GridToolbar>
      

      <Column field="title" title={t("incident_title")} width="200px" />

      <Column
        field="incDate"
        title={t("incident_date")}
        editor="incDate"
        format="{0:g}"
        cell={DateCell}
        filter="date"
        sortable={true}
        filterable={true}
        width="200px"
      />
      <Column
        field="reportBy"
        title={t("incident_type")}
        width="200px"
        editor="boolean"
      />
      <Column
        field="reportBy"
        title={t("incident_severity")}
        width="200px"
        editor="boolean"
      />
      <Column field="status" title={t("work_flow_status")} width="200px" />
      <Column
        field="reportBy"
        title={t("incident_report_by")}
        width="200px"
        editor="boolean"
      />
      <Column
      field="Action"
      title="Action"
        cell={CommandCell}
        filterable={false}
        sortable={false}
        maxWidth="100px"
      />
    </Grid>
  );
  return <div>
  {grid}
  {exportPDF && <React.Suspense fallback={<span className="k-icon k-i-loading" />}>
    <PDFExport grid={grid} data={sampleProducts} exportPDF={exportPDF} exportCallback={exportCallback} />
  </React.Suspense>}
</div>;
};

export default Incident_report;
