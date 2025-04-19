import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      setError("");
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        setError("Sign in incomplete. Please try again.");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(
        err.errors?.[0]?.message || "Failed to sign in. Please try again."
      );
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900 px-4 py-8">
      <View className="max-w-sm w-full mx-auto">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            Welcome back
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Please sign in to continue
          </Text>
        </View>

        {error ? (
          <Text className="text-red-500 text-sm mb-4 text-center">{error}</Text>
        ) : null}

        <View className="space-y-4">
          <View>
            <TextInput
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email address"
              placeholderTextColor="#9CA3AF"
              onChangeText={setEmailAddress}
              keyboardType="email-address"
            />
          </View>

          <View>
            <TextInput
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={password}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            className="w-full bg-blue-600 py-3 rounded-lg"
            onPress={onSignInPress}
          >
            <Text className="text-white text-center font-semibold text-base">
              Sign In
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center items-center space-x-1 mt-4">
            <Text className="text-gray-600 dark:text-gray-400">
              Don't have an account?
            </Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text className="text-blue-600 font-semibold">Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
