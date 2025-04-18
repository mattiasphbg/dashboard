import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SignOutButton } from "@/app/(auth)/SignOutButton";

export default function Page() {
  const { user } = useUser();

  return (
    <View className="flex-1 items-center justify-center p-6 bg-white">
      <SignedIn>
        <View className="items-center space-y-4">
          <Text className="text-xl font-semibold text-gray-800">Hello {}</Text>
          <SignOutButton />
        </View>
      </SignedIn>
      <SignedOut>
        <View className="items-center space-y-4">
          <Link href="/(auth)/sign-in">
            <Text className="text-lg font-medium text-blue-600">Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text className="text-lg font-medium text-blue-600">Sign up</Text>
          </Link>
        </View>
      </SignedOut>
    </View>
  );
}
