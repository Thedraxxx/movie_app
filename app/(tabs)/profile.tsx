import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (isLogin) {
      console.log("Logging in with", form.email, form.password);
    } else {
      console.log("Registering with", form.name, form.email, form.password);
    }
  };

  return (
    <View className="justify-center flex-1 px-6 bg-primary">
      <Text className="mb-6 text-3xl font-bold text-center text-white">
        {isLogin ? "Login" : "Register"}
      </Text>

      {!isLogin && (
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#9CA4AB"
          value={form.name}
          onChangeText={(text) => handleInputChange("name", text)}
          className="px-4 py-3 mb-4 text-white rounded-lg bg-dark-100"
        />
      )}

      <TextInput
        placeholder="Email"
        placeholderTextColor="#9CA4AB"
        value={form.email}
        onChangeText={(text) => handleInputChange("email", text)}
        className="px-4 py-3 mb-4 text-white rounded-lg bg-dark-100"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#9CA4AB"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleInputChange("password", text)}
        className="px-4 py-3 mb-6 text-white rounded-lg bg-dark-100"
      />

      <TouchableOpacity
        className="py-3 mb-4 rounded-lg bg-accent"
        onPress={handleSubmit}
      >
        <Text className="text-base font-semibold text-center text-white">
          {isLogin ? "Login" : "Register"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text className="text-center text-light-200">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Text className="font-semibold text-accent">
            {isLogin ? "Register" : "Login"}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
