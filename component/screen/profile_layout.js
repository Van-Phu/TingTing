import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Keyboard,
  FlatList,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { bulkSave } from "../model/nhanvien";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

function Profile({ navigation }) {
  const [person, setPerson] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");
  const [post, setPost] = useState("");
  const [follow, setFollow] = useState("");
  const [follower, setFollower] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [cost, setCost] = useState();
  const [id, setId] = useState();

  const route = useRoute();
  const { username } = route.params;

  useEffect(() => {
    fetch(`http://192.168.25.1:5000/api/v1/users/getUserByName/` + username)
      .then((response) => response.json())
      .then((data) => {
        setFullName(data.fullName);
        setEmail(data.email);
        setAvatar(data.avatar);
        setBackground(data.background);
        setPost(data.post);
        setFollow(data.follow);
        setFollower(data.follower);
        setImage(data.image);
        setCost(data.cost);
        setId(data._id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView scrollEnabled={true} style={{ height: "100%" }}>
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#DEDEDE" }}
      >
        <View style={{ width: "100%", height: 300, overflow: "hidden" }}>
          <Image
            style={{ width: "100%", height: 300 }}
            source={{ uri: background }}
          ></Image>
        </View>
        <View
          style={{
            width: "100%",
            height: 270,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              width: 300,
              height: 300,
              borderRadius: 150,
              borderColor: "white",
              borderWidth: 7,
              overflow: "hidden",
              marginTop: -150,
            }}
          >
            <Image
              style={{ width: 300, height: 300 }}
              source={{ uri: avatar }}
            ></Image>
          </View>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                marginTop: 20,
                fontWeight: "bold",
                color: "black",
              }}
            >
              {fullName}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 20,
                marginTop: 3,
              }}
            >
              ID:{id}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "96%",
            height: 80,
            backgroundColor: "white",
            marginTop: 10,
            borderRadius: 10,
            marginLeft: "2%",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: "15%",
              height: 80,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              name="credit-card"
              size={40}
              color="black"
              style={{ position: "absolute" }}
            />
          </View>

          <View
            style={{
              width: "55%",
              height: 80,
              paddingLeft: 15,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              Số dư tài khoản
            </Text>
            <Text style={{ fontSize: 25, color: "#CA0A0A" }}>{cost}</Text>
          </View>
          <View
            style={{
              width: "30%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Pay");
              }}
              style={{
                backgroundColor: "black",
                width: 130,
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Nạp tiền
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            height: 600,
            alignItems: "center",
            backgroundColor: "#EAEAEA",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              height: 70,
              width: "92%",
              marginTop: 40,
              backgroundColor: "#EAEAEA",
            }}
          >
            <View style={{ height: 60, width: "100%" }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginLeft: 20,
                  color: "black",
                }}
              >
                Tài khoản/Thẻ
              </Text>
              <Text style={{ fontSize: 18, marginLeft: 20 }}>
                Sử dụng thanh toán chuyển tiền trực tiếp
              </Text>
            </View>
          </View>

          <View style={{ height: 150, width: "100%", alignItems: "center" }}>
            <View
              style={{
                height: 150,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity>
                <View
                  style={{
                    width: "110%",
                    height: "100%",
                    backgroundColor: "#D71028",
                    borderRadius: 30,
                    borderWidth: 15,
                    borderColor: "#EAEAEA",
                    flexDirection: "row",
                    paddingBottom: 40,
                    paddingLeft: 10,
                  }}
                >
                  <View
                    style={{
                      width: 70,
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        borderWidth: 2,
                        borderColor: "white",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={{
                          uri: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210607143251-637586731710784420.jpg",
                        }}
                      ></Image>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "75%",
                      height: "100%",
                      flexDirection: "column",
                      alignContent: "center",
                      justifyContent: "center",
                      paddingLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Ví của tôi
                    </Text>
                    <Text style={{ fontSize: 16, color: "white" }}>{cost}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 150,
              width: "100%",
              alignItems: "center",
              marginTop: -50,
            }}
          >
            <View
              style={{
                height: 150,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity>
                <View
                  style={{
                    width: "110%",
                    height: "100%",
                    backgroundColor: "#00DC3F",
                    borderRadius: 30,
                    borderWidth: 15,
                    borderColor: "#EAEAEA",
                    flexDirection: "row",
                    paddingBottom: 40,
                    paddingLeft: 10,
                  }}
                >
                  <View
                    style={{
                      width: 70,
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={{
                          uri: "https://play-lh.googleusercontent.com/KBIgU6nz3hzia77BUj4FyVdL2azYvnttVkreRmc6c-asHof7ErHsY79G_yHdFkI83w",
                        }}
                      ></Image>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "75%",
                      height: "100%",
                      flexDirection: "column",
                      alignContent: "center",
                      justifyContent: "center",
                      paddingLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Vietcombank
                    </Text>
                    <Text style={{ fontSize: 16, color: "white" }}>
                      Miễn phí thanh toán
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              height: 150,
              width: "100%",
              alignItems: "center",
              marginTop: -50,
            }}
          >
            <View
              style={{
                height: 150,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => {
                navigation.navigate("infoCartVietinBank");
              }}>
                <View
                  style={{
                    width: "110%",
                    height: "100%",
                    backgroundColor: "#026EB2",
                    borderRadius: 30,
                    borderWidth: 15,
                    borderColor: "#EAEAEA",
                    flexDirection: "row",
                    paddingBottom: 40,
                    paddingLeft: 10,
                  }}
                >
                  <View
                    style={{
                      width: 70,
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        overflow: "hidden",
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ width: 40, height: 40 }}
                        source={{ uri: "https://ipay.vietinbank.vn/logo.png" }}
                      ></Image>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "75%",
                      height: "100%",
                      flexDirection: "column",
                      alignContent: "center",
                      justifyContent: "center",
                      paddingLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      VietinBank
                    </Text>
                    <Text style={{ fontSize: 16, color: "white" }}>
                      Miễn phí thanh toán
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 140,
              width: "92%",
              alignItems: "center",
              marginTop: -50,
            }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#D1DCF2",
                  borderRadius: 30,
                  borderWidth: 15,
                  borderColor: "#EAEAEA",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: "#026EB2",
                    borderStyle: "dashed",
                    flexDirection: "column",
                    paddingBottom: 40,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: 50,
                      marginTop: 10,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity>
                      <View
                        style={{
                          height: "90%",
                          width: 200,
                          backgroundColor: "#E07A41",
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Thêm ngân hàng
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      width: "60%",
                      height: 40,
                      marginLeft: "20%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        color: "black",
                      }}
                    >
                      Liên kết với ngân hàng có sẵn hoặc tạo tài khoản mới
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            height: 300,
            backgroundColor: "white",
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: "90%", height: "90%" }}>
            <View
              style={{ width: "100%", height: "20%", justifyContent: "center" }}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "black" }}
              >
                Thông tin tài khoản
              </Text>
            </View>
            <View
              style={{ width: "100%", height: "20%", flexDirection: "row" }}
            >
              <View
                style={{
                  width: "30%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}
                >
                  Gmail
                </Text>
              </View>
              <View
                style={{
                  width: "70%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#E6E6E6",
                    borderRadius: 2,
                    paddingLeft: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 17,
                      alignItems: "center",
                    }}
                  >
                    {email}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ width: "100%", height: "20%", flexDirection: "row" }}
            >
              <View
                style={{
                  width: "30%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}
                >
                  Tên đăng nhập
                </Text>
              </View>
              <View
                style={{
                  width: "70%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#E6E6E6",
                    borderRadius: 2,
                    paddingLeft: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 17,
                      alignItems: "center",
                    }}
                  >
                    {username}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ width: "100%", height: "20%", flexDirection: "row" }}
            >
              <View
                style={{
                  width: "30%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}
                >
                  Mật khẩu
                </Text>
              </View>
              <View
                style={{
                  width: "70%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#E6E6E6",
                    borderRadius: 2,
                    paddingLeft: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 17,
                      alignItems: "center",
                    }}
                  >
                    ********
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ width: "100%", height: "20%", flexDirection: "row" }}
            >
              <View style={{ width: "30%", height: "100%" }}></View>
              <View
                style={{
                  width: "70%",
                  height: "100%",
                  paddingLeft: 20,
                  paddingTop: 10,
                }}
              >
                <TouchableOpacity>
                  <Text style={{ color: "#6274B4" }}>
                    Thay đổi mật khẩu tên đăng nhập
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Profile;
