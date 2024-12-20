import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import NavBar from '../components/navigationBar';
import Title2 from '../components/Title2';
import Title3 from '../components/Title3';

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{question}</Text>
        </View>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

export default function FAQScreen({ navigation }) {
  return (
    <BackgroundFlex>
        <View style={styles.buttonsContainer}>
          <View>
          <HeaderWithIcon title="FAQ" MoveTo='Welcome' navigation={navigation} />
          </View>
        
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.name}>
        <Title2>Expiry </Title2>
        <Title2>Inspector</Title2>
        <Title3>Our Frequently Asked Questions</Title3>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <FAQItem 
          question=" 1.   What is Expiry Inspector?" 
          answer="Expiry Inspector is a mobile application that helps users to keep track of their inventory and prevent food waste by notifying them of the expiry dates of their items." 
        />
        <FAQItem 
          question=" 2.   Do I need to create an account to use the app?" 
          answer="Yes, you need to create an account to use Expiry Inspector. This allows us to save your inventory data and send you notifications about your items." 
        />
        <FAQItem 
          question=" 3.   What should I do if I forget my password?" 
          answer="If you forget your password, click on the 'Forgot Password' link on the login screen. Follow the instructions to reset your password via email." 
        />
        <FAQItem 
          question=" 4.   How can I update my profile information?" 
          answer="To update your profile information, navigate to the 'User Profile' section in the app. Click on 'Edit Profile', make the necessary changes, and save your updated information." 
        />
        <FAQItem 
          question=" 5.   How do I add a new product?" 
          answer="You can add a new product by navigating to the 'Add Product' section and filling in the required details." 
        />
        <FAQItem 
          question=" 6.   How do I receive notifications?" 
          answer="Notifications are automatically sent based on the expiry dates of the items you have added to your inventory." 
        />
        <FAQItem 
          question=" 7.   How to add an item to the budget list?" 
          answer="To add an item to the budget list, navigate to the 'Budget List' section in the app and click on 'Add Item'. Fill in the required details and save the item." 
        />
        <FAQItem 
          question=" 8.   How to remove an item from the budget list?" 
          answer="To remove an item from the budget list, go to the 'Budget List' section, find the item you want to remove, and swipe left on the item. Then, click on the 'Delete' button." 
        />
        <FAQItem 
          question=" 9.   How to get expiration notifications on mobile?" 
          answer="To get expiration notifications on your mobile, make sure you have enabled notifications for Expiry Inspector in your phone's settings. The app will automatically send you notifications based on the expiry dates of your items." 
        />
        <FAQItem 
          question=" 10.  How to edit an item in the inventory?" 
          answer="To edit an item in the inventory, navigate to the 'Inventory' section, find the item you want to edit, and click on the 'Edit' button. Make the necessary changes and save the item." 
        /> 
      </ScrollView>
      <NavBar navigation={navigation} />
    </BackgroundFlex>
  );
}

const styles = StyleSheet.create({
  name: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
    height: 100,
    width: '100%',
    backgroundColor: '#FFD1C4', 
    marginBottom: 10,
    paddingLeft: 20,  
  },
  scrollContainer: {
    padding: 10,
  },
  faqItem: {
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  registerButton: {
    backgroundColor: '#000000',
    width: 90, height: 40, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginLeft:60,
  },
  loginButton: {
    backgroundColor: '#2BD110',
    width: 90, height: 40, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin:10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionContainer: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  answerContainer: {
    backgroundColor: '#FFD1C4',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 30,
  },
  answer: {
    fontSize: 16,
    color: '#000000',  
  },
});
