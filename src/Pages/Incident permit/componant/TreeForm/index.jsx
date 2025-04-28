import '@progress/kendo-react-animation';
import { Button } from '@progress/kendo-react-buttons';
import { AutoComplete } from '@progress/kendo-react-dropdowns';
import { processTreeViewItems, TreeView } from '@progress/kendo-react-treeview';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'Components/Spinner/Spinner';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getsSerchList } from 'Services/API/masterApi';
const Treeform = ({ setIncidentpermit, incidentpermit, getAsetvalue, setAssetValue }) => {
  const [hierarchy, setHierarchy] = useState([]);
  const [hierarchyauto, setHierarchyAuto] = useState([]);
  const [assethirarchy, setAssethirarchy] = useState([]);
  const [assethirarchyauto, setAssethirarchyAuto] = useState([]);
  const [autothirarchy, setAutothirarchy] = useState([]);
  const [loader, setLoader] = useState(false);
  const [serchValue, setSerchValue] = useState('');
  const [select, setSelect] = useState(['']);
  const [dropDownvalue, setdropDownvalue] = useState();
  const [serchid, setSearchid] = useState(true);
  const [indexvalue, setIndexvalue] = useState([]);
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState(false);
  const [expand, setExpand] = useState({
    ids: [],
    idField: 'text',
  });

  const getsearchdropdownList = async (e) => {
    try {
      const res = await getsSerchList(e);

      setAutothirarchy(
        res.data.responseObject.map((val) => ({ text: val.displayName, ids: val.parentId })),
      );
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };

  const handleSearch = (e) => {
    setSerchValue(e.value);
    getsearchdropdownList(e.value);

    let newData = search(assethirarchyauto, e.value);
    setHierarchyAuto(newData);
    searchvaluelist(e.value);
  };

  const searchvaluelist = (value) => {
    let newData = search(assethirarchy, value);
    setHierarchy(newData);
  };

  const handleSearchicon = (event) => {
    getSearchHierarchy(autothirarchy[0]?.ids);
  };
  const search = (items, term) => {
    return items.reduce((acc, item) => {
      if (contains(item.text, term)) {
        acc.push(item);
      } else if (item.items && item.items.length > 0) {
        let newItems = search(item.items, term);
        if (newItems && newItems.length > 0) {
          acc.push({ text: item.text, items: newItems });
        }
      }
      return acc;
    }, []);
  };

  const contains = (text, term) => {
    return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
  };

  const BaseUrl = localStorage.getItem('BaseUrl');

  const getHierarchy = async (id) => {
    setLoader(true);
    await axios
      .get(`${BaseUrl + '/api'}/Master/assethierarchy/${id === undefined ? 'null' : id}`)
      .then((res) => {
        let newArr = res.data.responseObject.map((val) => ({
          ...val,
          ids: val.nodeId,
          text: val.displayName,
          displayNameField: val.displayNameField,
          disabled: !val.isEnabled ? true : false,
          items: [
            {
              ids: '',
              text: '',
            },
          ],
        }));

        if (!hierarchy.length) {
          setHierarchy(newArr);
          setAssethirarchy(newArr);
        } else {
          parse_constructor(newArr, assethirarchy, id);
        }
        setLoader(false);
      });
  };

  const getSearchHierarchy = async (id) => {
    setSearchid(false);
    setLoader(true);

    await axios.get(`${BaseUrl + '/api'}/Master/assethierarchy/${null}/${id}`).then((res) => {
      const selectedarray = res.data.responseObject.map((object) => {
        return {
          ...object,
          selected: object.displayName == autothirarchy[0]?.text ? true : false,
        };
      });
      let newArr1 = selectedarray?.map((val) => ({
        ...val,
        ids: val.nodeId,
        text: val.displayName,
        displayNameField: val.displayNameField,
        disabled: !val.isEnabled ? true : false,
      }));

      const treeList = searchlist(newArr1);

      if (!hierarchy.length) {
        setHierarchy(treeList);
        setAssethirarchy(treeList);
      } else {
      }
      setLoader(false);
    });
  };

  function searchlist(arr) {
    var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;

    for (var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.nodeId] = arrElem;
      mappedArr[arrElem.nodeId]['items'] = [];
    }

    for (var nodeId in mappedArr) {
      if (mappedArr.hasOwnProperty(nodeId)) {
        mappedElem = mappedArr[nodeId];

        if (mappedElem.parentId) {
          mappedArr[mappedElem['parentId']]['items'].push(mappedElem);
        } else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }

  function parse_constructor(output, hierarchy, id) {
    for (var i in hierarchy) {
      if (hierarchy[i].nodeId === id) {
        hierarchy[i].items = output;
        break;
      } else {
        if (hierarchy[i].items !== undefined) {
          parse_constructor(output, hierarchy[i].items, id);
        }
      }
    }
    setHierarchy(hierarchy);
  }

  const onItemClick = (event) => {
    setSelect([event.itemHierarchicalIndex]);
    const displayname = event.item.displayNameField;
    localStorage.setItem('displayname', displayname);
    //  setAssetValue(displayname)
    // setIncidentpermit({
    //   ...incidentpermit,
    //   assetId: displayname,
    // });
    // getAsetvalue(displayname);
  };

  const onExpandChange = (event) => {
    let ids = expand.ids.slice();

    const index = ids.indexOf(event.item.text);
    index === -1 ? ids.push(event.item.text) : ids.splice(index, 1);
    setExpand({
      ids,
      idField: 'text',
    });
    setIndexvalue(event.item.nodeId);
    if (serchid) {
      getHierarchy(event.item.nodeId);
    }
  };

  useEffect(() => {
    getHierarchy();
  }, []);
  useEffect(() => {
    if (serchValue === '') {
      setHierarchy([]);
      getHierarchy(indexvalue);
    }
  }, [serchValue]);

  return (
    <>
      <br />
      <AutoComplete
        className="searchbox"
        style={{ width: '80%' }}
        data={autothirarchy}
        textField="text"
        placeholder={t('type_minimum_3_letters_to_search')}
        onChange={(e) => handleSearch(e)}
      />
      &nbsp;&nbsp;
      <Button className="treeicon" imageUrl="../Assest/LocateOnTree.png" />
     
        <TreeView
          className="tree-view mt-3"
          data={processTreeViewItems(hierarchy, {
            select: select,
            expand: expand,
          })}
          onExpandChange={onExpandChange}
          onItemClick={onItemClick}
          expandIcons={true}
        />
      {loader && <Spinner />}
    </>
  );
};

export default Treeform;