import { useEffect, useState } from "react";
import { CONTACT_ENDPOINT } from "@/constants/config";

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactStatus = "success" | "error" | null;

const initialForm: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialForm);
  const [status, setStatus] = useState<ContactStatus>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
  };

  const handleSubmit = async () => {
    if (loading) return;

    setStatus(null);
    setErrorMessage(null);

    // Validasi sederhana sebelum request API
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setStatus("error");
      setErrorMessage("Please complete all fields.");
      return;
    }

    setLoading(true);

    try {
      if (!CONTACT_ENDPOINT || CONTACT_ENDPOINT.includes("undefined")) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        const responseText = await response.text();

        throw new Error(`Request failed (${response.status}): ${responseText}`);
      }

      setStatus("success");
      resetForm();
    } catch (error: unknown) {
      setStatus("error");

      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.error("Contact form error:", error);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!status) return;

    const timer = setTimeout(() => {
      setStatus(null);
      setErrorMessage(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [status]);

  return {
    formData,
    status,
    errorMessage,
    loading,
    updateField,
    handleSubmit,
    resetForm,
  };
}
