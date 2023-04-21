import { useState, useEffect } from "react";

const useTableSearch = ({ searchVal, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    setDataLoading(true);
    const crawl = (user, allValues) => {
      // eslint-disable-next-line no-param-reassign
      if (!allValues) allValues = [];
      for (var key in user) {
        if (typeof user[key] === "object") crawl(user[key], allValues);
        else allValues.push(user[key] + " ");
      }
      return allValues;
    };
    const fetchData = async () => {
      setOrigData(data);
      setFilteredData(data);
      const searchInd = data.map((user) => {
        const allValues = crawl(user);
        return { allValues: allValues.toString() };
      });
      setSearchIndex(searchInd);
      if (data) setDataLoading(false);
    };
    fetchData();
  }, [data]);

  useEffect(() => {
    if (searchVal) {
      const reqData = searchIndex.map((user, index) => {
        if (
          user.allValues
            .toLowerCase()
            .indexOf(searchVal.trim().toLowerCase()) >= 0
        )
          return origData[index];
        return null;
      });
      setFilteredData(
        reqData.filter((user) => {
          if (user) return true;
          return false;
        })
      );
    } else setFilteredData(origData);
  }, [searchVal, origData, searchIndex]);

  return { filteredData, dataLoading };
};

export default useTableSearch;
