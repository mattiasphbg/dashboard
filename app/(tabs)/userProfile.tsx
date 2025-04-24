import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useUser, useAuth, useOrganization } from "@clerk/clerk-expo";

const UserProfileScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  if (!user)
    return <Text className="text-center text-gray-500">Loading...</Text>;

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-6 text-gray-800">
        User Profile
      </Text>

      <View className="bg-gray-50 rounded-xl p-4 shadow-sm mb-6">
        {user.imageUrl && (
          <View className="items-center mb-4">
            <Image
              source={{ uri: user.imageUrl }}
              className="w-24 h-24 rounded-full"
            />
          </View>
        )}

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-500">Name</Text>
          <Text className="text-base text-gray-800">{user.fullName}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-500">Email</Text>
          <Text className="text-base text-gray-800">
            {user.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-500">User ID</Text>
          <Text className="text-base text-gray-800">{user.id}</Text>
        </View>
      </View>

      <TouchableOpacity
        className="bg-red-500 py-3 px-4 rounded-lg items-center"
        onPress={() => signOut()}
      >
        <Text className="text-white font-medium">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileScreen;
