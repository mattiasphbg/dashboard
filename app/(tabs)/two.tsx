import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useSession } from "@clerk/clerk-expo";

export default function TabTwoScreen() {
  const { session, isLoaded } = useSession();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">
        Tab Two {session?.user.lastName}
      </Text>
      <View
        className="my-8 h-px w-4/5"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}
