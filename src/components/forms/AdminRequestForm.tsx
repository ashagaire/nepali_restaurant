import { useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
}

export default function AdminRequestForm({ open, onClose, onSubmit }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await onSubmit(email);
      onClose();
    } catch {
      toast.error("Request Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded p-4 w-96 space-y-3">
        <Card
          title="Request Admin Access"
          style={{ maxWidth: 400, margin: "20px auto" }}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
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
      </div>
    </div>
  );
}
