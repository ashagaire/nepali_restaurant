"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, Card } from "antd";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    const email = values?.email;
    if (!email) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errMsg = data?.message || data?.error || "Login failed";
        toast.error(errMsg);
        return;
      }

      toast.success(data?.message || "OTP sent to email");
      router.push(`/login/verify?email=${encodeURIComponent(email)}`);
    } catch (err) {
      toast.error((err as Error).message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "40px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={submitting}>
          {submitting ? "Sending..." : "Login"}
        </Button>
      </Form>
    </Card>
  );
}
