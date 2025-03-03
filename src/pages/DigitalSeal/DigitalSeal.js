import React from "react";
import { Watermark } from 'antd';

const DigitalSeal = () => {
    return (
        <Watermark content={['Valuers Registration', 'Watermark']}>
        <div style={{ height: 500 }} />
      </Watermark>

    );
};

export default DigitalSeal;