import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setError("");

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.message || "An error occurred during sign up");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setError("");

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        setError("Verification incomplete. Please try again.");
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during verification");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center px-6 py-12 bg-white">
        <View className="space-y-6">
          <View className="space-y-2">
            <Text className="text-2xl font-bold text-center text-gray-900">
              Verify your email
            </Text>
            <Text className="text-sm text-center text-gray-500">
              We've sent a verification code to your email
            </Text>
          </View>

          <View className="space-y-4">
            <TextInput
              value={code}
              placeholder="Enter verification code"
              onChangeText={setCode}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-blue-500"
              keyboardType="number-pad"
              autoComplete="off"
              autoCapitalize="none"
            />

            {error ? (
              <Text className="text-sm text-red-500 text-center">{error}</Text>
            ) : null}

            <TouchableOpacity
              onPress={onVerifyPress}
              disabled={isLoading || !code}
              className={`w-full h-12 flex items-center justify-center rounded-lg bg-blue-600 ${
                isLoading || !code ? "opacity-50" : ""
              }`}
            >
              <Text className="text-white font-semibold">
                {isLoading ? "Verifying..." : "Verify Email"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center px-6 py-12 bg-white">
      <View className="space-y-6">
        <View className="space-y-2">
          <Text className="text-2xl font-bold text-center text-gray-900">
            Create your account
          </Text>
          <Text className="text-sm text-center text-gray-500">
            Sign up to get started
          </Text>
        </View>

        <View className="space-y-4">
          <TextInput
            value={emailAddress}
            placeholder="Email address"
            onChangeText={setEmailAddress}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-blue-500"
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize="none"
          />

          <TextInput
            value={password}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-blue-500"
            autoComplete="password"
          />

          {error ? (
            <Text className="text-sm text-red-500 text-center">{error}</Text>
          ) : null}

          <TouchableOpacity
            onPress={onSignUpPress}
            disabled={isLoading || !emailAddress || !password}
            className={`w-full h-12 flex items-center justify-center rounded-lg bg-blue-600 ${
              isLoading || !emailAddress || !password ? "opacity-50" : ""
            }`}
          >
            <Text className="text-white font-semibold">
              {isLoading ? "Creating account..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center items-center space-x-1">
            <Text className="text-gray-500">Already have an account?</Text>
            <Link href="/sign-in" className="text-blue-600 font-semibold">
              Sign in
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
