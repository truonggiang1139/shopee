import { TextInput } from "@mantine/core";
import React from "react";
import { useForm } from "@mantine/form";
import InputNumber from "./InputNumber";
export default function Profilev2() {
  const form = useForm({
    initialValues: {
      email: "",
      name: ""
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email")
    }
  });
  console.log("feature1");
  console.log("feature2");
  console.log("first");
  console.log("f1");
  console.log("f2");

  return (
    <div>
      <form>
        <TextInput placeholder="Your name" label="Full name" />
        <InputNumber {...form.getInputProps("name")} inputProps={form.getInputProps("name")} />
      </form>
    </div>
  );
}
