"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Form, Input } from "antd";
import { toast } from "react-toastify";

export default function RequestAdminPage() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    const email = values?.email;
    if (!email) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data?.message || "Admin request submitted");
        router.push(`/`);
      } else {
        toast.error(data?.message || "Request failed");
      }
    } catch (err) {
      toast.error((err as Error).message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card
      title="Request Admin Access"
      style={{ maxWidth: 400, margin: "40px auto" }}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={submitting}>
          {submitting ? "Requesting..." : "Request Admin"}
        </Button>
      </Form>
    </Card>
  );
}
