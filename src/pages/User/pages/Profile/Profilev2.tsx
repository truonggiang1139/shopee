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
  console.log("feat1");
  return (
    <div>
      <form>
        <TextInput placeholder="Your name" label="Full name" />
        <InputNumber {...form.getInputProps("name")} inputProps={form.getInputProps("name")} />
      </form>
    </div>
  );
}
