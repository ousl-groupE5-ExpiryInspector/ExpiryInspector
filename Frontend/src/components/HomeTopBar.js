import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function HomeTopBar({ MoveTo, navigation, db = false }) {
    return (
        <View style={styles.headerContainer}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />
            <TouchableOpacity onPress={() => navigation.navigate(MoveTo, db)}>
                <Image
                    source={require('../../assets/userAccount.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        margin: 0,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#FF4913',
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 5,
    },
    logo: {
        width: 100,
        height: 50,
    },
});
