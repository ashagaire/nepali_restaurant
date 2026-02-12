"use client";

import { useState } from "react";
import { Button, Form, Input, Select, DatePicker, message } from "antd";

const { Option } = Select;

const timeSlots = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

export default function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: {
    date: string;
    time: string;
    guests: number;
    name: string;
    phone: string;
    email: string;
    notes?: string;
  }) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to create reservation");

      message.success("Reservation created successfully!");
    } catch (error) {
      console.error("Reservation error:", error);
      message.error("Failed to create reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Date is required" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Time"
        name="time"
        rules={[{ required: true, message: "Time is required" }]}
      >
        <Select placeholder="Select a time">
          {timeSlots.map((time) => (
            <Option key={time} value={time}>
              {time}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Number of Guests"
        name="guests"
        rules={[{ required: true, message: "Number of guests is required" }]}
      >
        <Select placeholder="Select number of guests">
          {[...Array(20).keys()].map((num) => (
            <Option key={num + 1} value={num + 1}>
              {num + 1}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input placeholder="John Doe" />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Phone number is required" }]}
      >
        <Input placeholder="+358 40 123 4567" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Invalid email address" },
        ]}
      >
        <Input placeholder="email@example.com" />
      </Form.Item>

      <Form.Item label="Special Requests (reservation.optional)" name="notes">
        <Input.TextArea placeholder="Special Requests" rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting} block>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
}
