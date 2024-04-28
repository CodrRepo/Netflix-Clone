import axios from "../../utils/axios";
import { getSearchData } from "../reducers/SearchReducer";

const asyncGetSearch =  (query)=> async(dispatch) => {
  await axios
    .get(`/search/multi?query=${query}&language=en-US&page=1`, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlmY2JiMzAxN2NjMTc1ZDdmMDQ4M2UzMGE4MDFiMSIsInN1YiI6IjY2MThkM2RmOTBjZjUxMDE3Y2EyMDRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i6veHynDrHke_iJAsrZUyx4ADyDpF-1YoZJTeL9UQ9c",
      },
    })
    .then((res) => dispatch(getSearchData(res.data.results)))
    .catch((err) => dispatch(getSearchData('nahi chala')));
};

export default asyncGetSearch;
