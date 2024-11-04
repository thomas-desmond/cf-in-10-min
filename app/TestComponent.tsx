"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const NextJsAiTest = () => {
  const aiTest = async () => {
    const formData = new FormData();
    formData.append("randomData", "myRandomDataHere");

    const response = await fetch("/api/sentiment", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className="p-4 space-y-4">
      <Button
        onClick={aiTest}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Click Me
      </Button>
    </div>
  );
};

export default NextJsAiTest;
