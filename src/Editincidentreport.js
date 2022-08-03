import * as React from "react";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
// import { ResumeData } from "./resumedata";
import { useNavigate, useParams } from "react-router-dom";
//import { axios, Post } from "react-axios";
import axios from "axios";
import { Card } from "react-bootstrap";
import ResumeData from "./resumedata";
import { CenturyViewService } from "@progress/kendo-react-dateinputs/dist/npm/calendar/services";
// const stepPages = [ResumeData];
const App = () => {
  const [WorkPermitconfig, setresult] = React.useState(["id:0", "text:null"]);
  const param = useParams();
  const navigate = useNavigate();
  const handleSubmit = (dataItem) => {
    //alert(JSON.stringify(dataItem, null, 2));
    const workpermitconfiguration = {
      id: "0",
      formtext: JSON.stringify(dataItem),
    };
    axios
      .post("https://localhost:5001/api/WorkPermit/wpcsave", workpermitconfiguration)

      .then((response) => {
        console.log("responce", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const handalGotoPage = () => {
    navigate("/NewPermit");
  };
  //axios.post("http://localhost:3000",result)
  //   function Save_Json(values) {
  //     var WorkPermitconfig = { id: 0, text: values };
  //     $.ajax({
  //       url: "/Home/PostOrder_Main",
  //       type: "POST",
  //       data: JSON.stringify({ WorkPermitconfig: WorkPermitconfig }),
  //       dataType: "json",
  //       traditional: true,
  //       contentType: "application/json; charset=utf-8",
  //       success: function (data) {
  //         alert(data.msg);
  //       },
  //       error: function () {},
  //     });
  //   }
  // };
  //console.log("data is", result);
  const [users, setUsers] = React.useState([]);
  const f = async (id) => {
    console.log(id);
    const res = await axios.get(
      `https://localhost:5001/api/WorkPermit/workpermitget/${id}`
    );
    console.log("res :>> ", res);
    setUsers(res.data.responseObject);
  };
  React.useEffect(() => {
    if (param?.id) {
      f(param?.id);
    }
  }, []);
  console.log("users", users);
  return (
    <Form
      onSubmit={handleSubmit}
      render={(formRenderProps) => (
        <FormElement
          style={{
            width: 800,
          }}
          className="container"
        >
          <ResumeData users={users} formRenderProps={formRenderProps} />
          {/* <div className="App">
         <h1>Hello ReqRes users!</h1>
         <div className="flex">
          {users.length &&
            users.map((user) => {
              return (
                <div key={user.id}>
                  <p>
                    <strong>{user.first_name}</strong>
                  </p>
                  <p>{user.email}</p>
                  <img key={user.avatar} src={user.avatar} />
                </div>
              );
            })}
        </div>
      </div> */}
          <Button
            type={"submit"}
            className="submitbtn"
            onClick={handleSubmit}
          >
            update
          </Button>
          <Button type={"Cancal"} onClick={formRenderProps.onFormReset}>
            Cancel
          </Button>
        </FormElement>
      )}
    />
  );
};
export default App;
