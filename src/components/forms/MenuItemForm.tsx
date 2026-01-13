"use client";

import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Card,
  Divider,
  Upload,
  Image,
  message,
} from "antd";
import { SpiceLevel, Visibility } from "@prisma/client";
import type { MenuItemFormValues } from "@/types/menu";
import type { UploadFile } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Props {
  initialValues?: Partial<MenuItemFormValues>;
  onSubmit: (values: MenuItemFormValues) => void;
  loading?: boolean;
  title?: string;

  // dropdown data (fetched outside)
  categories: { id: string; nameEn: string }[];
  tags: { id: string; nameEn: string }[];
  ingredients: { id: string; nameEn: string }[];
}

export default function MenuItemForm({
  initialValues,
  onSubmit,
  loading = false,
  title = "Menu Item",
  categories,
  tags,
  ingredients,
}: Props) {
  const [form] = Form.useForm<MenuItemFormValues>();
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    initialValues?.imageUrl ?? undefined
  );
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      const { imageUrl, imagePublicId } = await res.json();

      form.setFieldsValue({
        imageUrl,
        imagePublicId,
      });

      setImageUrl(imageUrl);
      message.success("Image uploaded successfully");
    } catch (e: any) {
      message.error(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      handleImageUpload(file);
      return false; // prevent AntD auto upload
    },
    showUploadList: false,
  };
  return (
    <Card title={title} style={{ maxWidth: 800, margin: "40px auto" }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          visibility: Visibility.PUBLIC,
          discount: 0,
          ...initialValues,
        }}
        onFinish={onSubmit}
      >
        {/* ---------- Image ---------- */}
        <Divider>Image</Divider>

        {imageUrl && (
          <div style={{ marginBottom: 16 }}>
            <Image
              src={imageUrl}
              alt="Menu item image"
              width={200}
              style={{ borderRadius: 8 }}
            />
          </div>
        )}

        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} loading={uploading}>
            {imageUrl ? "Replace Image" : "Upload Image"}
          </Button>
        </Upload>

        {/* Hidden fields */}
        <Form.Item name="imageUrl" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="imagePublicId" hidden>
          <Input />
        </Form.Item>

        {/* ---------- Names ---------- */}
        <Divider>Names</Divider>

        <Form.Item name="nameEn" label="Name (EN)" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="nameFi" label="Name (FI)" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {/* ---------- Descriptions ---------- */}
        <Divider>Descriptions</Divider>

        <Form.Item
          name="descriptionEn"
          label="Description (EN)"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="descriptionFi"
          label="Description (FI)"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* ---------- Pricing ---------- */}
        <Divider>Pricing</Divider>

        <Form.Item name="price" label="Price (€)" rules={[{ required: true }]}>
          <InputNumber min={0} step={0.1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="discount" label="Discount (%)">
          <InputNumber min={0} max={100} style={{ width: "100%" }} />
        </Form.Item>

        {/* ---------- Details ---------- */}
        <Divider>Details</Divider>

        <Form.Item
          name="servings"
          label="Servings"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="spicey"
          label="Spice Level"
          rules={[{ required: true }]}
        >
          <Select
            options={Object.values(SpiceLevel).map((v) => ({
              value: v,
              label: v,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="visibility"
          label="Visibility"
          rules={[{ required: true }]}
        >
          <Select
            options={Object.values(Visibility).map((v) => ({
              value: v,
              label: v,
            }))}
          />
        </Form.Item>

        {/* ---------- Relations ---------- */}
        <Divider>Relations</Divider>

        <Form.Item
          name="categoryId"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select
            options={categories.map((c) => ({
              value: c.id,
              label: c.nameEn,
            }))}
          />
        </Form.Item>

        <Form.Item name="tagIds" label="Tags">
          <Select
            mode="multiple"
            options={tags.map((t) => ({
              value: t.id,
              label: t.nameEn,
            }))}
          />
        </Form.Item>

        <Form.Item name="ingredientIds" label="Ingredients">
          <Select
            mode="multiple"
            options={ingredients.map((i) => ({
              value: i.id,
              label: i.nameEn,
            }))}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Save Menu Item
        </Button>
      </Form>
    </Card>
  );
}
