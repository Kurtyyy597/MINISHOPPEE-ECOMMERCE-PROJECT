import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Pressable, ScrollView, StyleSheet, KeyboardAvoidingView, Image, Animated, Alert, Switch, ActivityIndicator, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const lightTheme = {
  background: "#F8F9FB",        // Softer & cleaner than F5F5F5
  surface: "#FFFFFF",           
  textPrimary: "#1A1D1F",       // Deeper, modern black
  textSecondary: "#6B7280",     // Soft gray
  border: "#E5E7EB",            // Modern border gray
  accent: "#3B82F6",            // Modern blue (Material 3 / iOS style)
  accentText: "#FFFFFF",
  ripple: "#E0E7FF",
  success: "#22C55E",
  warning: "#FACC15",
  error: "#EF4444",
  inputBackground: "#F3F4F6",   // Softest light gray
  divider: "#E5E7EB",
  cardShadow: "#00000025",      // Softer natural shadow
};
const darkTheme = {
  background: "#0D0E11",       // Deeper, more modern dark
  surface: "#1A1C1E",
  textPrimary: "#F3F4F6",      // Slightly softer white
  textSecondary: "#9CA3AF",
  border: "#2D2F33",           // Clean, subtle border
  accent: "#60A5FA",           // Softer blue; beautiful in dark mode
  accentText: "#0D0E11",       
  ripple: "#1E2530",
  success: "#4ADE80",
  warning: "#FACC15",
  error: "#F87171",
  inputBackground: "#24262A",  // Matches modern dark surfaces
  divider: "#2F3135",
  cardShadow: "#00000060",
};

type Shoppee = {
  id: number;
  name: string;
  description: string;
  price: string; 
  place: string;
  shipping: string;
  sold: string;
  bestSelling: boolean,
  image?: any;
};

export default function MapQuiz13() {

  const scrollViewRef = useRef<ScrollView>(null);
  const popAnim = useRef(new Animated.Value(0)).current;
  
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const slideUp = useRef(new Animated.Value(300)).current;

useEffect(() => {
  if (modalVisible) {
    Animated.timing(slideUp, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  } else {
    slideUp.setValue(300);
  }
}, [modalVisible]);
  
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const [selectedId, setSelectedId] = useState<number | null>(null);

  
  


  const [items, setItems] = useState<Shoppee[]>([
     {
    id: 1,
    name: "Wireless Earbuds",
    description: "Bluetooth 5.3 earbuds with noise cancellation",
    price: "₱799",
    place: "Cebu City",
    shipping: "2-3 days",
    sold: "10k+ sold",
    bestSelling: true,
    image: require('../../../Images/wireless.jpg')
  },
  {
    id: 2,
    name: "Gaming Mouse",
    description: "RGB ergonomic mouse with 6 programmable buttons",
    price: "₱549",
    place: "Quezon City",
    shipping: "2-3 days",
     sold: "10k+ sold",
     bestSelling: false,
    image: require('../../../Images/gaming mouse.jpg')
  },
  {
    id: 3,
    name: "Stainless Water Bottle",
    description: "Insulated double-wall bottle keeps drinks cold for 12 hours",
    price: "₱299",
    place: "Davao City",
    shipping: "2-3 days",
     sold: "10k+ sold",
     bestSelling: true,
    image: require('../../../Images/stainless.jpg')
  },
  {
    id: 4,
    name: "Phone Tripod",
    description: "Portable adjustable tripod with Bluetooth remote",
    price: "₱159",
    place: "Manila",
    shipping: "2-3 days",
     sold: "10k+ sold",
     bestSelling: true,
    image: require('../../../Images/tripod.jpg')
  },
  {
    id: 5,
    name: "LED Desk Lamp",
    description: "Touch-control lamp with 3 brightness levels",
    price: "₱349",
    place: "Taguig",
    shipping: "2-3 days",
     sold: "10k+ sold",
     bestSelling: false,
    image: require('../../../Images/lamp.jpg')
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    description: "Hot-swappable keys with vibrant RGB lighting",
    price: "₱1,299",
    place: "Laguna",
    shipping: "2-3 days",
     sold: "10k+ sold",
     bestSelling: true,
    image: require('../../../Images/mechanical.jpg')
  },
  {
    id: 7,
    name: "Mini Fan",
    description: "Rechargeable handheld fan with 3-speed modes",
    price: "₱129",
    place: "Makati",
    shipping: "2-3 days",
     sold: "10k+ sold",
     bestSelling: false,
    image: require('../../../Images/minifan.jpg')
  },
  {
    id: 8,
    name: "USB-C Charger",
    description: "Fast-charging 25W USB-C wall adapter",
    price: "₱249",
    place: "Pasay",
    shipping: "2-3 days",
     sold: "10k+ sold",
     bestSelling: true,
    image: require('../../../Images/usb.jpg')
  },
  {
    id: 9,
    name: "Notebook Set",
    description: "3-pack premium notebooks with dotted pages",
    price: "₱199",
    place: "Baguio",
    shipping: "2-3 days",
     sold: "10k+ sold",
     bestSelling: true,
    image: require('../../../Images/notebook.jpg')
  },
  {
    id: 10,
    name: "Portable Speaker",
    description: "Water-resistant Bluetooth speaker with deep bass",
    price: "₱899",
    place: "Iloilo City",
    shipping: "2-3 days",
     sold: "10k+ sold",
     bestSelling: false,
    image: require('../../../Images/speaker.jpg')
  },
  {
    id: 11,
    name: "Smartwatch",
    description: "Fitness tracker with heart rate and sleep monitoring",
    price: "₱999",
    shipping: "2-3 days",
    sold: "10k+ sold",
    bestSelling: true,
    place: "Cavite",
    
    image: require('../../../Images/smartwatch.jpg')
  },
  {
    id: 12,
    name: "Laptop Sleeve",
    description: "Shockproof sleeve for 13–15 inch laptops",
    price: "₱459",
    place: "Batangas",
    shipping: "2-3 days",
    sold: "10k+ sold",
    bestSelling: true,
    image: require('../../../Images/laptop sleeve.jpg')
  },

  {
    id: 13,
    name: "Bluetooth Soundbar",
    description: "High-quality soundbar for PC and TV",
    price: "₱599",
    place: "Valenzuela",
    shipping: "2-3 days",
    sold: "14k+ sold",
    bestSelling: true,
    image: require('../../../Images/soundbar.jpg')
  },
  {
    id: 14,
    name: "Ring Light 12 Inch",
    description: "Perfect for streaming and TikTok videos",
    price: "₱329",
    place: "Caloocan",
    shipping: "1-2 days",
    sold: "20k+ sold",
    bestSelling: true,
    image: require('../../../Images/ringlight.jpg')
  },
  {
    id: 15,
    name: "Wireless Keyboard + Mouse Set",
    description: "Silent wireless combo ideal for office use",
    price: "₱499",
    place: "Mandaluyong",
    shipping: "2-3 days",
    sold: "9k+ sold",
    bestSelling: false,
    image: require('../../../Images/wirelesscombo.jpg')
  },
  {
    id: 16,
    name: "Powerbank 20,000mAh",
    description: "Fast-charging powerbank with LED indicator",
    price: "₱699",
    place: "Antipolo",
    shipping: "2-3 days",
    sold: "18k+ sold",
    bestSelling: true,
    image: require('../../../Images/powerbank.jpg')
  },
  {
    id: 17,
    name: "Desk Organizer",
    description: "Multi-layer organizer perfect for workspace",
    price: "₱159",
    place: "Cavite",
    shipping: "2-3 days",
    sold: "6k+ sold",
    bestSelling: false,
    image: require('../../../Images/deskorganizer.jpg')
  },
  {
    id: 18,
    name: "USB LED Strip Lights",
    description: "RGB LED strip for room decoration",
    price: "₱129",
    place: "Cebu City",
    shipping: "2-3 days",
    sold: "13k+ sold",
    bestSelling: true,
    image: require('../../../Images/ledstrip.jpg')
  },
  {
    id: 19,
    name: "Electric Kettle",
    description: "1.8L stainless steel automatic kettle",
    price: "₱349",
    place: "Laguna",
    shipping: "1-2 days",
    sold: "9k+ sold",
    bestSelling: true,
    image: require('../../../Images/kettle.jpg')
  },
  {
    id: 20,
    name: "Foldable Storage Box",
    description: "Durable and collapsible storage solution",
    price: "₱99",
    place: "Quezon City",
    shipping: "2-3 days",
    sold: "15k+ sold",
    bestSelling: false,
    image: require('../../../Images/storagebox.jpg')
  },
  {
    id: 21,
    name: "USB Desk Humidifier",
    description: "Mini humidifier with LED night light",
    price: "₱199",
    place: "Manila",
    shipping: "1-2 days",
    sold: "10k+ sold",
    bestSelling: true,
    image: require('../../../Images/humidifier.jpg')
  },
  {
    id: 22,
    name: "Rechargeable Hair Trimmer",
    description: "Professional grooming kit with blades",
    price: "₱369",
    place: "Bulacan",
    shipping: "2-3 days",
    sold: "7k+ sold",
    bestSelling: false,
    image: require('../../../Images/trimmer.jpg')
  },
  {
    id: 23,
    name: "Laptop Stand",
    description: "Adjustable and portable aluminum stand",
    price: "₱299",
    place: "Pasig",
    shipping: "2-3 days",
    sold: "8k+ sold",
    bestSelling: true,
    image: require('../../../Images/laptopstand.jpg')
  },
  {
    id: 24,
    name: "Portable Blender",
    description: "USB rechargeable personal blender",
    price: "₱399",
    place: "Davao City",
    shipping: "2-3 days",
    sold: "11k+ sold",
    bestSelling: true,
    image: require('../../../Images/blender.jpg')
  },
  {
    id: 25,
    name: "Smart LED Bulb",
    description: "WiFi bulb with Google Alexa support",
    price: "₱159",
    place: "Taguig",
    shipping: "2-3 days",
    sold: "12k+ sold",
    bestSelling: false,
    image: require('../../../Images/smartbulb.jpg')
  },
  {
    id: 26,
    name: "Sports Water Jug",
    description: "1L gym-ready water jug with strap",
    price: "₱199",
    place: "Makati",
    shipping: "1-2 days",
    sold: "9k+ sold",
    bestSelling: false,
    image: require('../../../Images/waterjug.jpg')
  },
  {
    id: 27,
    name: "Phone Holder for Desk",
    description: "Adjustable stand for smartphone/tablet",
    price: "₱129",
    place: "QC",
    shipping: "2-3 days",
    sold: "10k+ sold",
    bestSelling: true,
    image: require('../../../Images/phoneholder.jpg')
  },
  {
    id: 28,
    name: "Mousepad XL",
    description: "Large smooth-surface gaming mousepad",
    price: "₱199",
    place: "Pasay",
    shipping: "1-2 days",
    sold: "14k+ sold",
    bestSelling: true,
    image: require('../../../Images/mousepad.jpg')
  },
  {
    id: 29,
    name: "Cable Organizer",
    description: "Magnetic cable clips for desk management",
    price: "₱89",
    place: "Caloocan",
    shipping: "2-3 days",
    sold: "5k+ sold",
    bestSelling: false,
    image: require('../../../Images/cableorganizer.jpg')
  },
  {
    id: 30,
    name: "Smart Plug",
    description: "WiFi-enabled smart plug with timer",
    price: "₱299",
    place: "QC",
    shipping: "2-3 days",
    sold: "8k+ sold",
    bestSelling: true,
    image: require('../../../Images/smartplug.jpg')
  },

  ]);


  const [loadingDots, setLoadingDots] = useState<string>(".");
  const [seconds, setSeconds] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<boolean>(false);
  useEffect(() => {
  if (receipt) {
    popAnim.setValue(0); // reset before playing

    Animated.spring(popAnim, {
      toValue: 1,
      friction: 5,  // softer bounce
      tension: 100, // speed + bounce amount
      useNativeDriver: true,
    }).start();
  }
}, [receipt]);

  const [itemName, setItemName] = useState<string>("");
  const [saveItemName, setSavedItemName] = useState<string>("");

  const [itemPrice, setItemPrice] = useState<string>("");
  const [saveItemPrice, setSavedItemPrice] = useState<string>("");

  const [itemQty, setItemQty] = useState<string>("");
  const [saveItemQuantity, setSavedItemQuantity] = useState<string>("1");

  const [freeShipping, setFreeShipping] = useState<boolean>(false);
  const [saveShipping, setSavedShipping] = useState<boolean>(false);

  const [voucher, setVoucher] = useState<boolean>(false);
  const [saveVoucher, setSavedVoucher] = useState<boolean>(false);

  const [total, setTotal] = useState<string>("");

  const [address, setAddress] = useState<string>("");
  const [saveAddress, setSavedAddress] = useState<string>("");
  const [errorMessageAddress, setErrorMessageAddress] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [saveName, setSavedName] = useState<string>("");
  const [errorMessageName, setErrorMessageName] = useState<string>("");

  const [timeStamp, setTimeStamp] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [selectedImage, setSelectedImage] = useState<any>(null);

  const [selectedItem, setSelectedItem] = useState<Partial<Shoppee> |null>(null);

  const [saveImage, setSavedImage] = useState<any>(null);


const buyButton = (item: Partial<Shoppee>) => {
  setSelectedId(item.id!);
  setSelectedItem(item);
  setItemName(item.name!);
  setItemPrice(item.price!.replace(/[^\d]/g, ""));
  setItemQty("1");
  setSelectedImage(item.image);
  setModalVisible(true);
};

    const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

 
 const confirmReceipt = () => {

  const cleanedName = name.replace(/\s+/g, " ").trim();

  if (!name.trim() || !address.trim() || !itemName.trim() || !itemPrice.trim() || !itemQty.trim()) {
    Alert.alert("Please fill in all fields", "Try again");
    return false;
  }

  if (isNaN(Number(itemQty))) {
    Alert.alert("Invalid Quantity!");
    return false;
  }

  if (name.length < 4) {
    setErrorMessageName("Name is too short!");
    return false;
  } else {
    setErrorMessageName("");
  }

  if (address.length < 15) {
    setErrorMessageAddress("Address is too short!");
    return false;
  } else if (address.length > 50) {
    setErrorMessageAddress("Address is too long!");
    return false;
  } else {
    setErrorMessageAddress("");
  }


  

  // ★★★★★ CRUCIAL FIX ★★★★★
  // Validation passed → return true so modal closes
  // and loading screen becomes visible.
  setLoading(true);
  setSeconds(3);
  setReceipt(false);
   setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 200);

  let dotInterval = setInterval(() => {
  setLoadingDots(prev => {
    if (prev === "...") return ".";
    return prev + ".";
  });
}, 300);
 
  
  

  // Timer logic
  const interval = setInterval(() => {
    setSeconds(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        clearInterval(dotInterval);

        setLoading(false);
        setReceipt(true);
     

        setSavedName(name);
        setSavedImage(selectedImage);
        setSavedItemName(itemName);
        setSavedItemPrice(itemPrice);
        setSavedItemQuantity(itemQty);
        setSavedAddress(address);
        setSavedShipping(freeShipping);
        setSavedVoucher(voucher);

        setName("");
        setAddress("");
        setFreeShipping(false);
        setVoucher(false);

        const numItemPrice = Number(itemPrice);
        const numQty = Number(itemQty);
        const deliveryFee = freeShipping ? 0 : 40;

        const subtotal = numItemPrice * numQty;
        const discounted = voucher ? subtotal * 0.90 : subtotal;
        const totalAmount = discounted + deliveryFee;

        setTotal(totalAmount.toFixed(2));
        setTimeStamp(Date.now().toString());
        setDate(new Date().toLocaleDateString());
      

          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 200);

        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return true;
};

const buyAgain = () => {
  
  setReceipt(false);

     setTimeout(() => {
      scrollToTop();
    }, 100);

  setLoading(false);
  setSeconds(0);
  setSelectedId(null);
  setSelectedImage(null);
  setSelectedItem(null);

    setTimeout(() => {
    
  }, 200);
};

const calculateLiveTotal = () => {
  const priceNum = Number(itemPrice);
  const qtyNum = Number(itemQty);

  if (isNaN(priceNum) || isNaN(qtyNum)) return "0";

  let subtotal = priceNum * qtyNum;
  if (voucher) subtotal *= 0.9;

  const deliveryFee = freeShipping ? 0 : 40;

  return (subtotal + deliveryFee).toLocaleString();
};

const totalPreviewPrice = calculateLiveTotal

const estimatedDate = new Date(Date.now() + 3 * 24*60*60*1000)
  .toLocaleDateString();

const pulse = useRef(new Animated.Value(1)).current;

useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(pulse, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(pulse, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ])
  ).start();
}, []);

const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,            // animate to fully visible (0 -> 1)
    duration: 500,
    useNativeDriver: true, // good for opacity
  }).start();
}, []);




  
    

    


  

  

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.ripple}]}>

      {/* Search bar container */}
      <View style = {[styles.searchBarIcons, {backgroundColor: theme.accent}]}>
        <Pressable style = {[styles.searchBar, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textSearch, {color: theme.textPrimary}]}> 🔍 Search for products... </Text>
        </Pressable>

        <Pressable style = {[styles.shoppingCartIcon, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textShoppingCart, {color: theme.textPrimary}]}>🛒</Text>
        </Pressable>

        <Pressable style = {[styles.chatBarIcon, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.chatBar, {color: theme.textPrimary}]}>💬</Text>
        </Pressable>

       
      </View>
      
      <Text style = {[styles.title, {color: theme.textPrimary}]}> Hot Picks for You 🔥 </Text>

      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        ref={scrollViewRef}
        horizontal={false}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        decelerationRate="normal"
        nestedScrollEnabled={true}
        overScrollMode="always"
        scrollEventThrottle={16}
        onScrollBeginDrag={() => console.log("Scrolling...")}>

          <Animated.View style = {[styles.cardContainer, {backgroundColor: theme.ripple, opacity: fadeAnim}]}>
            {items.map(({id, name, description, price, place, shipping, sold, image, bestSelling}) => (
              <Pressable key={id}
              onPress={() => {
                setSelectedId(id)
                setSelectedItem({id, name, price, image})
                setItemName(name);
                setItemPrice(price.replace(/[^\d]/g, ""));
                setItemQty("1");
                setSelectedImage(image);
                console.log(`You pressed, ${name}`) 
              }}
              style={[styles.card, {backgroundColor: theme.ripple}]}>
                
                {/* Image, Name, Description */}
                {image && <Image source={image} style={[styles.imageOutput]}/>}
                <Text style = {[styles.textItemName, {color: theme.textPrimary}]}> {name} </Text>
                <Text style = {[styles.textItemDescription, {color: theme.textPrimary}]}> {description} </Text>
                {/* Image, Name, Description */}
                
                {/* Best Selling Container */}
                <View style = {[styles.bestSellingContainer, {backgroundColor: '#f65d04ff' }]}>
                  <Text style = {[styles.textBestSelling, {color: '#fff'}]}> {bestSelling ? "🏆Best Selling" : "👍Sulit Deal"} </Text>
                </View>
                {/* Best Selling Container */}

                {/* price and Sold */}
                <View style = {[styles.priceandShippingContainer, {backgroundColor: theme.ripple }]}>
                  <Text style = {[styles.textPrice, {color: '#f65d04ff'}]}> {price}</Text>
                  <Text style = {[styles.textShipping, {color: theme.textPrimary}]}> {sold} </Text>
                </View>
                {/* price and Sold */}

                {/* Shipping and Place */}
                <View style = {[styles.shippingandPlaceContainer, {backgroundColor: theme.ripple }]}>
                  <Text style = {[styles.textShipping, {color: theme.success}]}> 🚚{shipping} | 📍{place}</Text>
                </View>
                <Pressable
                  onPress={() => buyButton({ id, name, price, image })}
                  onLongPress={() => alert("Long pressed")}
                  delayLongPress={400}
                  
                  hitSlop={10}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                  styles.buttonBuyItem,
                  pressed && {transform: [{ scale: 0.50 }] }]}>
                    <Text style = {[styles.textButtonBuyItem, {color: theme.textPrimary}]}> Buy Item </Text>
                </Pressable>
              
              </Pressable>
            ))}
          </Animated.View>

          {loading && (
            <>
            <ActivityIndicator size={'large'} color={'blue'}/>
              <Animated.Text style={{ transform: [{ scale: pulse }], textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
              Processing your order{loadingDots} {seconds}s
            </Animated.Text>
            </>
          )}

          {!loading && receipt && (
            <Animated.View style = {[styles.outputCard, {backgroundColor: theme.inputBackground,      transform: [{ scale: popAnim }]}]}>
              <Text style = {[styles.textBuyAgain, {color: theme.textPrimary}]}> Thankyou for buying to our shop❤️!  </Text>
            
              <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
              <Text style = {[styles.textBuyAgain, {color: theme.textPrimary, fontSize: 20,}]}> 🧾Order Receipt.  </Text>
              {saveImage && <Image source={saveImage} style={[styles.imageOutputLoading]}/>}
              <Text style = {[styles.textOutput, {color: theme.textPrimary, textAlign: 'center', fontSize: 20}]}> Item: {saveItemName} </Text>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 👤Customer Name: {saveName} </Text>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 💰Price: ₱{saveItemPrice} </Text>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 🔢Quantity: {saveItemQuantity} </Text>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 🏠Address: {saveAddress} </Text>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 🛫Shipping Fee: {saveShipping ? "Free Shipping" : "+ ₱40"} </Text>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 🚚Delivery Fee: {saveVoucher ? "10% discount" : "None"} </Text>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 🧿Order Id: {timeStamp} </Text>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 📅Date Ordered: {date.toString()} </Text>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 📅Estimated Delivery: {estimatedDate} </Text>
              <View style = {[styles.divider, {backgroundColor: theme.success}]}/>
              <Text style = {[styles.textOutput, {color: theme.success, fontSize: 20, textAlign: "center"}]}> 💳Total Price: ₱{total} </Text>
              <Pressable
                  onPress={buyAgain}
                  onLongPress={() => alert("Long pressed")}
                  delayLongPress={400}
                  android_ripple={{ color: "#4818e5ff" }}
                  hitSlop={10}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                  styles.buttonBuyAgain,
                  pressed && {transform: [{ scale: 0.80 }] }]}>
                    <Text style = {[styles.textButtonBuyAgain, {color: theme.textPrimary}]}> Buy Again </Text>
                </Pressable>

            </Animated.View>
          )}
           
        </ScrollView>

        <Modal visible={modalVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        hardwareAccelerated={true}
        statusBarTranslucent={true}>

          {/* Modal Overlay */}
          <View style = {[styles.modalOverlay, {backgroundColor: theme.inputBackground,}]}>

               <KeyboardAvoidingView
                behavior='padding'
                
                
                >
                
                

                

            {/* Modal Card */}
              <Animated.View style = {[styles.modalCard, {backgroundColor: theme.inputBackground, transform:  [{ translateY: slideUp }] }]}>
              <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Item Selected </Text>
              {selectedImage && <Image source={selectedImage} style = {[styles.imageOutputModal]}/> }
              <Text style = {[styles.textItemNameModal, {color: theme.textPrimary}]}> 🎁Item: {itemName} </Text>
              <Text style = {[styles.textItemPrice, {color: theme.textPrimary}]}> Price: ₱{itemPrice} </Text>

              {/* Quantity Container */}
              <View style = {[styles.quantityContainer]}>
                <Pressable onPress={() => setItemQty(prev => String(Math.max(1, Number(prev) - 1)))}
                android_ripple={{ color: "#4818e5ff" }}
                onLongPress={() => alert("Long pressed")}
                hitSlop={10}
                accessibilityRole="button"
                style={({ pressed }) => [
                styles.buttonMinus,
                pressed && {opacity: 0.1 }]}>
                  <Text style = {[styles.textButtonMinus, {color: theme.error, fontSize: 26}]}> ➖ </Text>
                </Pressable>

                <Text style = {[styles.textQuantity, {color: theme.textPrimary}]}> {itemQty} </Text>

                <Pressable onPress={() => setItemQty(prev => String(Math.max(1, Number(prev) + 1)))}
                android_ripple={{ color: "#4818e5ff" }}
                onLongPress={() => alert("Long pressed")}
                hitSlop={10}
                accessibilityRole="button"
                style={({ pressed }) => [
                styles.buttonPlus,
                pressed && {opacity: 0.1 }]}>
                  <Text style = {[styles.textButtonPlus, {color: theme.success, fontSize: 26}]}> ➕ </Text>
                </Pressable>
              </View>
               {/* Quantity Container */}

                {/* TextInput Container */}
                <View style = {[styles.textInputContainer]}>
                  <TextInput style= {[styles.input, {backgroundColor: theme.success, borderColor: theme.border}]}
                  placeholder='type your name'
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="none"
                  autoCorrect={true}
                  maxLength={30}
                  cursorColor={theme.accent}
                  selectionColor="#6200ee"
                  onFocus={() => console.log("Focus")}
                  onBlur={() => console.log("Blur")}/>
                  {errorMessageName && <Text style = {[styles.textError, {color: errorMessageName && theme.error}]}>
                    {errorMessageName} 
                  </Text>}
                  
                  <TextInput style= {[styles.input, {backgroundColor: theme.success, borderColor: theme.border}]}
                  placeholder='type your address'
                  value={address}
                  onChangeText={setAddress}
                  autoCapitalize="none"
                  autoCorrect={true}
                  maxLength={50}
                  cursorColor={theme.accent}
                  selectionColor="#6200ee"
                  onFocus={() => console.log("Focus")}
                  onBlur={() => console.log("Blur")}/>
                  {errorMessageAddress && <Text style = {[styles.textError, {color: errorMessageAddress && theme.error}]}>
                    {errorMessageAddress} 
                  </Text>}
                </View>
                {/* TextInput Container */}

                {/* Shipping Container */}
                <View style = {[styles.shippingContainer]}>
                  <Text style = {[styles.textShippingSwitch, {color: theme.textPrimary}]}>
                    Activate Free Shipping: {freeShipping ? "₱0 DELIVERY FEE" : "+₱40 DELIVERY"}
                  </Text>
                  <Switch value={freeShipping} onValueChange={setFreeShipping}
                  trackColor={{true: theme.success, false: theme.warning}}
                  thumbColor={freeShipping ? theme.success : theme.warning}/>
                </View>
                {/* Shipping Container */}

                {/* Voucher Container */}
                <View style = {[styles.voucherContainer]}>
                  <Text style = {[styles.textVoucherSwitch, {color: theme.textPrimary}]}>
                    Activate Voucher: {voucher ? "10% discount" : "Not Available"}
                  </Text>
                  <Switch value={voucher} onValueChange={setVoucher}
                  trackColor={{true: theme.success, false: theme.warning}}
                  thumbColor={voucher ? theme.success : theme.warning}/>
                </View>
                 {/* Voucher Container */}

                  <Text style = {[styles.textShippingDisplay, {color: theme.textPrimary}]}> Total Shipping: {freeShipping ? "₱0" : "₱40"} </Text>
                 <Text style = {[styles.textPreviewTotal, {color: theme.error}]}> Preview Total Price: ₱{totalPreviewPrice()} </Text>
                
                {/* Confirm and Cancel Modal Container */}
                <View style = {[styles.confirmandModalContainer]}> 
                <Pressable onPress={() => {
                  Alert.alert(
                    "Confirmation Receipt",
                    "Are you sure you want to buy this item?",
                    [
                      {text: "Cancel", style: 'cancel'},
                      {
                      text: "Confirm", style: 'destructive',
                      onPress: () => {
                      const success = confirmReceipt();
                      if (success) setModalVisible(false);

                      }
                    }
                    ]
                  )
                
                }}
                android_ripple={{ color: "#4818e5ff" }}
                onLongPress={() => alert("Long pressed")}
                hitSlop={10}
                accessibilityRole="button"
                style={({ pressed }) => [
                styles.buttonConfirm,
                pressed && {opacity: 0.1 }]}>
                  <Text style = {[styles.textConfirmButton, {color: theme.textPrimary}]}> Confirm  </Text>
                </Pressable>

                <Pressable onPress={()=> {
                  setModalVisible(false);
                  setSelectedId(null);
                  setSelectedItem(null);
                  setName("");
                  setAddress("");
                  setVoucher(false);
                  setFreeShipping(false);
                }}
                android_ripple={{ color: "#4818e5ff" }}
                onLongPress={() => alert("Long pressed")}
                hitSlop={10}
                accessibilityRole="button"
                style={({ pressed }) => [
                styles.buttonCancel,
                pressed && {opacity: 0.1 }]}>
                  <Text style = {[styles.textButtonCancel, {color: theme.textPrimary}]}> Cancel </Text>
                </Pressable>
                </View>
                





              
            </Animated.View>
             {/* Modal Card */}
             </KeyboardAvoidingView>
          </View>
        {/* Modal Overlay */}
        
        </Modal>
      
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,


  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center"

  },

  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'

  },

  card: {
  width: "48%",
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 24,
  gap: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0 ,height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  
  alignSelf: "center",


  },

  imageOutput: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10
  },

  textItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'


  },

  textItemPrice: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },

  textItemDescription: {
    fontStyle: 'italic',
    fontSize: 14,
    textAlign: 'left'

  },

  bestSellingContainer: {
    borderRadius: 10,
    height: 25,
    alignSelf: 'flex-start'

  },

  textBestSelling: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'

  },

  priceandShippingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },

  textPrice: {
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'left'

  },

  textShipping: {
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'left'



  },

  shippingandPlaceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10

  },

  buttonBuyItem: {
  
    backgroundColor: "#3B82F6",
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 10
    

  },

  textButtonBuyItem: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'

  },

  buttonMinus: {


  },

  textButtonMinus: {

  },

  buttonPlus: {

  },

  textButtonPlus: {

  },

  modalOverlay: {
    paddingVertical: 60,
    justifyContent: 'center',
    
    alignItems: "center",
     
    
  },

  modalCard: {
  width: "100%",
  justifyContent: 'center',
  maxHeight: 850,
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 24,
  gap: 15,
  shadowColor: "#000",
  shadowOffset: { width: 0 ,height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 0,
  alignSelf: "center",
  

  },

  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center"

  },

  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  textQuantity: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center"

  },

  textInputContainer: {
    justifyContent: 'center',
    gap: 10

  },

  input: {
  width: "90%",
  alignSelf: "center",

 
  borderRadius: 12,

  paddingVertical: 12,
  paddingHorizontal: 16,

  fontSize: 16,
  color: "#111827",

  borderWidth: 1,
  borderColor: "#E5E7EB",

  // shadow for iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,

  },

  textError: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  },

  shippingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
    
  },

  textShippingSwitch: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left'
   
  },

 
  voucherContainer: {
     flexDirection: 'row',
    justifyContent: 'center',
    alignItems:  'center',
    bottom: 30

  },

  textVoucherSwitch: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    
   

  },

  textItemNameModal: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  },

  imageOutputModal: {
    width: 300,
    alignSelf: 'center',
    height: 200,
    borderRadius: 20
  },
  
  buttonConfirm: {
    backgroundColor: "#3B82F6",
    width: '40%',
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 10
  },

  textConfirmButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },

  confirmandModalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40
  },

  buttonCancel: {
    backgroundColor: "#FACC15",
    width: '40%',
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 10

  },
  
  textButtonCancel: {
     textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16

  },

  textLoading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
   
  },

  outputCard: {
  marginTop: 400,
  width: "85%",
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 24,
  gap: 15,
  borderWidth: 1,
  shadowColor: "#000",
  shadowOffset: { width: 0 ,height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 3,
  alignSelf: "center",

  },

  textOutput: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: 'bold'
  },

  imageOutputLoading: {
    alignSelf: 'center',
    width: 250,
    height: 150,
    borderRadius: 20
  },

  divider: {
    paddingVertical: 2,
    height: 3,
    width: '100%'
  },

  buttonBuyAgain: {
    backgroundColor: "#FACC15",
    width: '40%',
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 10
  },

  textButtonBuyAgain: {
   textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },

  textBuyAgain: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  
  textPreviewTotal: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold'
  },

  textShippingDisplay: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '400',
    top: 15
  },

  searchBarIcons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5
    
  },

  

  searchBar: {
  alignSelf: 'flex-start',
  width: 270,
  margin: 10,
  paddingVertical: 10,
  gap: 10,
  borderRadius: 20,
  
  },

  textSearch: {
    textAlign: 'left',
    fontSize: 10,
    fontWeight: 'bold'
  },

  chatBarIcon: {
    
    width: 40,
    height: 30,
    borderRadius: 20

  },

  chatBar: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    

  },

  shoppingCartIcon: {
    width: 40,
    height: 30,
    borderRadius: 20

  },

  textShoppingCart: {
     fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',

  }

 
  






})