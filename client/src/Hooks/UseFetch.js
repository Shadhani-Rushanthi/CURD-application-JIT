import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const UseFetch = (url) => {

    const [data, setData] = useState([])
    const [loading, setLoading ] = useState(false)
    const [error, setError] = useState(false)

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true)
            try {
                const res = await axios.get(url)
                setData(res.data)
            } catch (err) {
                setError(err)
            }
            setLoading(false)
        }
        fetchData()
    }, [url]);

    return {data, loading, error}
}
export default UseFetch;