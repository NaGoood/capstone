import React, {useState} from "react";
import {Button, Col, Row} from "antd";
import axios from "axios";

const AppFooter = () => {

    function goTest1(){
        axios.get('/test1')
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
    }

  return (
    <Row justify="space-evenly">
      <Col className="footer-col" span={8}>
        <a
          href="https://forx-news.gitbook.io/forx-news-wiki"
          target="_blank"
          rel="noopener noreferrer"
        >
          About us
        </a>
      </Col>

      <Col className="footer-col" span={8}>
        <a
          // href="https://github.com/ruichen199801/cis550-fa22-project"
          href="https://github.com/ruichen199801"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </Col>

      <Col className="footer-col" span={8}>
        &#169; 2022 Forx News
      </Col>
    </Row>
  );
};

export default AppFooter;
