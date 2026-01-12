"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, Form, Input, Button } from "antd";
import { toast } from "react-toastify";

export default function VerifyOtpPage() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams?.get("email") || "";

  const onFinish = async (values: any) => {
    const otp = values?.otp;
    const email = values?.email || emailParam;
    if (!email || !otp) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.message || "Verification failed");
        return;
      }

      toast.success(data?.message || "Logged in");
      // Successful login: redirect to admin
      router.push("/admin");
    } catch (err) {
      toast.error((err as Error).message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <Card title="Enter OTP" style={{ maxWidth: 420, margin: "40px auto" }}>
        <Form layout="vertical" onFinish={onFinish} initialValues={{ email: emailParam }}>
          <Form.Item label="Email" name="email">
            <Input defaultValue={emailParam} disabled />
          </Form.Item>

          <Form.Item
            label="OTP"
            name="otp"
            rules={[{ required: true, message: "Please enter the OTP" }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={submitting}>
            {submitting ? "Verifying..." : "Verify & Sign in"}
          </Button>
        </Form>
      </Card>
    </main>
  );
}
