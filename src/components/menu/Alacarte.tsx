import React from "react";
import { Card, Typography, Row, Col } from "antd";
import { menuData } from "@/data/alacarte";

export default function AlacartePage() {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        A La Carte Menu
      </h2>
      {menuData.map((category) => (
        <div key={category.category} style={{ marginBottom: "30px" }}>
          <h2>{category.category}</h2>
          <Row gutter={[16, 16]}>
            {category.items.map((item) => (
              <Col xs={24} sm={12} md={8} key={item.name}>
                <Card bordered>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <div style={{ marginTop: "10px", fontWeight: "bold" }}>
                    {item.price}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}
