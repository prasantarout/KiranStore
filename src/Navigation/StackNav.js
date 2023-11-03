import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import Language from '../screen/Auth/Language';
import Login from '../screen/Auth/Login';
import Register from '../screen/Auth/Register';
import OtpScreen from '../screen/Auth/OtpScreen';
import NavigationScreen from '../screen/Auth/NavigationScreen';
import SplashScreen from '../screen/splashScreen/SplashScreen';
import AccountDetails from '../screen/Account/AccountDetails';
import ShopDetails from '../screen/Account/ShopDetails';
import BottomNav from './BottomNav';

import MultipleShop from '../screen/more/MultipleShop';
import Partner from '../screen/more/Partner';
import InvoiceSetting from '../screen/more/InvoiceSetting';
import Expenses from '../screen/more/Expenses';
import SearchProduct from '../screen/more/SearchProduct';
import Staff from '../screen/more/Staff';
import Tutorials from '../screen/more/Tutorials';
import CustomerLoyalty from '../screen/more/CustomerLoyalty'; 
import MarketingTools from '../screen/more/MarketingTools';
import Materials from '../screen/more/Materials';
import Notification from '../screen/Account/Notification';
import SelfLedger from '../screen/common/SelfLedger';
import Refer from '../screen/Account/Refer';
import MyOrders from '../screen/Home/MyOrders';
import MyCustomers from '../screen/Home/MyCustomers';
import MyStock from '../screen/Home/MyStock';
import MySuppliers from '../screen/Home/MySuppliers';
import AddPRoductToMyShop from '../screen/Home/AddPRoductToMyShop';
import NewBill from '../screen/Home/NewBill';
import MarketingTool from '../screen/more/MarketingTool';
import ProductDiscount from '../screen/more/ProductDiscount';
import BestSellers from '../screen/more/BestSellers';
import NewLaunch from '../screen/more/NewLaunch';
import ShareCatlogue from '../screen/more/ShareCatlogue';
import ShareGreetings from '../screen/more/ShareGreetings';
import BusinessCard from '../screen/more/BusinessCard';
import SupplierLedgerRecord from '../screen/Home/SupplierLedgerRecord';
import CustomerLedgerRecord from '../screen/Home/CustomerLedgerRecord';
import CategoryBanner from '../screen/onlineShop/CategoryBanner';
import OfferforOnlineStore from '../screen/onlineShop/OfferforOnlineStore';
import SingleProduct from '../screen/onlineShop/SingleProduct';
import Search from '../screen/onlineShop/Search';
import ChangeBannerOffer from '../screen/onlineShop/ChangeBannerOffer';
import EnabledisableProducts from '../screen/onlineShop/EnabledisableProducts';
import PartnerDetails from '../screen/Account/PartnerDetails';
import TabStack from './TopTab';
import ProductManually from '../screen/Home/ProductManually';
import TabStack1 from './TopTab1';
import BluetoothPrinter from '../screen/more/BluetoothPrinter';
import Purchase from '../screen/Home/Purchase';
// import Pickup from '../components/Pickup';
const StackNav = () => {
  const Stack = createStackNavigator();
  const mytheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
    },
  };
  const MyTransition = {
    gestureDirection: 'vertical',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({current, next, layouts}) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 1],
              }),
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 0.1],
            outputRange: [0, 0.1],
          }),
        },
      };
    },
  };
  //
  const Screens = {
    SplashScreen: SplashScreen,
    Login: Login,
    OtpScreen: OtpScreen,
    NavigationScreen: NavigationScreen,
    Language: Language,
    BottomNav:BottomNav,
    ShopDetails:ShopDetails,
    AccountDetails:AccountDetails,
    MultipleShop:MultipleShop,
    MarketingTools:MarketingTools,
    Partner:Partner,
    Staff:Staff,
    InvoiceSetting:InvoiceSetting,
    CustomerLoyalty:CustomerLoyalty,
    Expenses:Expenses,
    SearchProduct:SearchProduct,
    Tutorials:Tutorials,
    Materials:Materials,
    Notification:Notification,
    SelfLedger:SelfLedger,
    Refer:Refer,
    MyCustomers:MyCustomers,
    MyOrders:MyOrders,
    MyStock:MyStock,
    MySuppliers:MySuppliers,
    AddPRoductToMyShop:AddPRoductToMyShop,
    NewBill:NewBill,
    MarketingTool:MarketingTool,
    ProductDiscount:ProductDiscount,
    BestSellers:BestSellers,
    NewLaunch:NewLaunch,
    ShareCatlogue:ShareCatlogue,
    ShareGreetings:ShareGreetings,
    BusinessCard:BusinessCard,
    SupplierLedgerRecord:SupplierLedgerRecord,
    CustomerLedgerRecord:CustomerLedgerRecord,
    SingleProduct:SingleProduct,
    OfferforOnlineStore:OfferforOnlineStore,
    CategoryBanner:CategoryBanner,
    Search:Search,
    ChangeBannerOffer:ChangeBannerOffer,
    EnabledisableProducts:EnabledisableProducts,
    PartnerDetails:PartnerDetails,
    TabStack:TabStack,
    ProductManually:ProductManually,
    TabStack1:TabStack1,
    BluetoothPrinter:BluetoothPrinter,
    Purchase:Purchase,
    // Pickup:Pickup
  };

  return (
    <NavigationContainer theme={mytheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...MyTransition,
          animationEnabled: true,
        }}>
        {Object.entries({
          ...Screens,
        }).map(([name, component]) => {
          return <Stack.Screen name={name} component={component} key={name} />;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNav;
