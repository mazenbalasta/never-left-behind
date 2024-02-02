import { useEffect } from "react";
import { useGetAllJobsQuery } from "../app/apiSlice"



const Jobslist = () => {

    const { data, isLoading } =  useGetAllJobsQuery();
    console.log({data})







    return <h1>JOBS LIST</h1>
}

export default Jobslist
