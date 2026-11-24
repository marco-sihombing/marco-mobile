import React from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  useColorScheme,
  Linking,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Send, CheckCircle, AlertCircle } from "lucide-react-native";

import SocialCard from "./components/SocialCard";
import { socialContacts } from "./data/contact";
import { useContactForm } from "./hooks/useContactForm";

export default function ContactSection() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";
  const isMobile = width < 600;

  const { formData, status, errorMessage, loading, updateField, handleSubmit } =
    useContactForm();

  const colors = {
    background: isDark ? "#1f2937" : "#f3f4f6",
    card: isDark ? "#374151" : "#ffffff",
    input: isDark ? "#1f2937" : "#f9fafb",
    text: isDark ? "#f3f4f6" : "#111827",
    secondary: isDark ? "#9ca3af" : "#6b7280",
    border: isDark ? "#4b5563" : "#e5e7eb",
  };

  const openSocialLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Failed to open link:", error);
    }
  };

  const inputStyle = [
    styles.input,
    {
      backgroundColor: colors.input,
      borderColor: colors.border,
      color: colors.text,
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ width: "100%" }}
    >
      <View style={[styles.section, { backgroundColor: colors.background }]}>
        <View style={[styles.container, { width: "100%" }]}>
          {/* Section Heading */}
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Get In Touch</Text>
            </View>

            <Text style={[styles.heading, { color: colors.text }]}>
              Contact Me
            </Text>

            <Text style={[styles.subtitle, { color: colors.secondary }]}>
              Have a question? Let&apos;s connect!
            </Text>
          </View>

          {/* Content */}
          <View style={[styles.content, !isMobile && styles.contentDesktop]}>
            {/* Social Media */}
            <View
              style={[styles.socialSection, !isMobile && styles.socialDesktop]}
            >
              <View style={styles.socialGrid}>
                {socialContacts.map((item) => (
                  <View key={item.id} style={styles.socialItem}>
                    <SocialCard
                      item={item}
                      isDark={isDark}
                      onPress={openSocialLink}
                    />
                  </View>
                ))}
              </View>
            </View>

            {/* Contact Form */}
            <View
              style={[
                styles.formCard,
                !isMobile && styles.formDesktop,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.form}>
                {/* Name & Email */}
                <View
                  style={[styles.inputRow, isMobile && styles.inputRowMobile]}
                >
                  <View style={styles.inputWrapper}>
                    <Text style={[styles.inputLabel, { color: colors.text }]}>
                      Full Name
                    </Text>

                    <TextInput
                      value={formData.name}
                      onChangeText={(value) => updateField("name", value)}
                      placeholder="Your name"
                      placeholderTextColor={colors.secondary}
                      autoCapitalize="words"
                      autoComplete="name"
                      style={inputStyle}
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={[styles.inputLabel, { color: colors.text }]}>
                      Email Address
                    </Text>

                    <TextInput
                      value={formData.email}
                      onChangeText={(value) => updateField("email", value)}
                      placeholder="Your email"
                      placeholderTextColor={colors.secondary}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      style={inputStyle}
                    />
                  </View>
                </View>

                {/* Message */}
                <View style={styles.inputWrapper}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>
                    Message
                  </Text>

                  <TextInput
                    value={formData.message}
                    onChangeText={(value) => updateField("message", value)}
                    placeholder="Write your message..."
                    placeholderTextColor={colors.secondary}
                    multiline
                    textAlignVertical="top"
                    style={[inputStyle, styles.messageInput]}
                  />
                </View>

                {/* Submit */}
                <Pressable
                  disabled={loading}
                  onPress={handleSubmit}
                  style={({ pressed }) => [
                    styles.submitButton,
                    pressed && !loading && styles.submitPressed,
                    loading && styles.submitDisabled,
                  ]}
                >
                  <LinearGradient
                    colors={["#2563eb", "#9333ea"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.submitGradient}
                  >
                    {loading ? (
                      <Text style={styles.submitText}>Sending...</Text>
                    ) : (
                      <>
                        <Send size={17} color="#ffffff" />
                        <Text style={styles.submitText}>Send Message</Text>
                      </>
                    )}
                  </LinearGradient>
                </Pressable>

                {/* Success/Error */}
                {status && (
                  <View
                    style={[
                      styles.statusBox,
                      {
                        backgroundColor:
                          status === "success"
                            ? isDark
                              ? "#064e3b"
                              : "#dcfce7"
                            : isDark
                              ? "#7f1d1d"
                              : "#fee2e2",
                      },
                    ]}
                  >
                    {status === "success" ? (
                      <CheckCircle size={20} color="#16a34a" />
                    ) : (
                      <AlertCircle size={20} color="#dc2626" />
                    )}

                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            status === "success"
                              ? isDark
                                ? "#bbf7d0"
                                : "#166534"
                              : isDark
                                ? "#fecaca"
                                : "#991b1b",
                        },
                      ]}
                    >
                      {status === "success"
                        ? "Message sent successfully!"
                        : errorMessage || "Failed to send message."}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "100%",
    paddingVertical: 64,
    paddingHorizontal: 16,
  },

  container: {
    maxWidth: 1100,
    alignSelf: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 36,
  },

  badge: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 30,
    backgroundColor: "#dbeafe",
    marginBottom: 12,
  },

  badgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2563eb",
  },

  heading: {
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    marginTop: 8,
    textAlign: "center",
  },

  content: {
    width: "100%",
    gap: 24,
  },

  contentDesktop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  socialSection: {
    width: "100%",
  },

  socialDesktop: {
    flex: 2,
  },

  socialGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  socialItem: {
    width: "48%",
    flexGrow: 1,
  },

  formCard: {
    width: "100%",
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },

  formDesktop: {
    flex: 3,
  },

  form: {
    gap: 16,
  },

  inputRow: {
    flexDirection: "row",
    gap: 12,
  },

  inputRowMobile: {
    flexDirection: "column",
  },

  inputWrapper: {
    flex: 1,
    gap: 8,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
  },

  input: {
    width: "100%",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },

  messageInput: {
    minHeight: 120,
    maxHeight: 220,
  },

  submitButton: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },

  submitGradient: {
    minHeight: 48,
    paddingVertical: 13,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  submitText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
  },

  submitPressed: {
    opacity: 0.85,
  },

  submitDisabled: {
    opacity: 0.6,
  },

  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 12,
  },

  statusText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
  },
});
