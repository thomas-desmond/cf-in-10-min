"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const NextJsAiTest = () => {
  const [compliment, setCompliment] = useState<string>("");

  const aiTest = async (event: React.FormEvent<HTMLFormElement>) => {
    setCompliment("");
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/sentiment", {
      method: "POST",
      body: formData,
    });
    
    const compliment = await response.json() as string;
    setCompliment(compliment);
  };

  return (
    <div className="p-4 space-y-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold">Compliment Generator</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          aiTest(e);
        }}
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2 rounded-md w-full"
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </Button>
      </form>
      <p>{compliment}</p>
    </div>
  );
};

export default NextJsAiTest;
