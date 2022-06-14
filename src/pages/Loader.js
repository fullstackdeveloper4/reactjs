import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import CircularProgress from '@mui/material/CircularProgress';
const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />
const Loader = () => {
    return (
        <div className="loder-div">
            {/* <Spin indicator={antIcon} /> */}
            <CircularProgress />
        </div>
    )
}

export default Loader
