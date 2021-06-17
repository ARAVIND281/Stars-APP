import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { ListItem } from "react-native-elements"
import axios from 'axios'

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            url: "https://d52d7d8173c3.ngrok.io",
            allData: []
        }
    }

    getPlanet = async () => {

        const { url } = this.state

        await axios.get(url)
            .then(response => {
                // handle success
                console.log("success")

                return this.setState({
                    allData: response.data.data
                }
                )
            })
            .catch((error) => {

                console.log(error + " error");
                alert("error\n" + error)
            })


    }

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                onPress={() => { this.props.navigation.navigate('PlanetScreen', { StarScreen: item.name }) }}
                bottomDivider
            >
                <ListItem.Content>
                    <ListItem.Title>{"Star: " + item.Star_name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        )
    }



    keyExtractor = (index) => index.toString()

    componentDidMount = () => {

        this.getPlanet()

    }

    render() {
        return (
            <View style={styles.container} >
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allData}
                    renderItem={this.renderItem}
                />
                {/*  <Text style={{ marginTop: 50 }}>{this.state.allData.distance_from_their_sun}</Text> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
});