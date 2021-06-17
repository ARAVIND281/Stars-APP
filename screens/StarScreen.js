import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Image } from "react-native-elements";
import axios from 'axios'

export default class PlanetScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planet_url: "https://d52d7d8173c3.ngrok.io/planet?name=" + this.props.navigation.getParam('planet_name'),
            //"https://d52d7d8173c3.ngrok.io/planet?name=" + "11 Comae Berenices b"
            //this.props.navigation.getParam('planet_name')
            ip: null,
            pd: {}
        }
    }

    getPlanetData = async () => {

        const { planet_url } = this.state

        await axios.get(planet_url)
            .then(response => {

                this.getImage(response.data.data)
            })
            .catch((error) => {

                console.log(error + " error");
                alert("error\n" + error)
            })
    }

    getImage = (planetData) => {

        const pt = planetData.planet_type
        var ip = ""
        switch (pt) {
            case "Gas Giant": ip = require("../assets/gas_giant.png")
                break
            case "Neptune-like": ip = require("../assets/neptune_like.png")
                break
            case "Terrestrial": ip = require("../assets/terrestrial.png")
                break
            case "Super Earth": ip = require("../assets/super_earth.png")
                break
            default: ip = require("../assets/super_earth.png")
        }
        this.setState({
            ip: ip,
            pd: planetData
        })

    }

    componentDidMount = () => {

        this.getPlanetData()
    }

    render() {
        const { pd, ip } = this.state
        return (
            <View style={styles.container} >


                <Card>
                    <Card.FeaturedTitle style={{ color: "#000", textAlign: "center" }}>{pd.name}</Card.FeaturedTitle>
                    <Card.Divider />
                    <Card.Image source={ip}></Card.Image>
                    <Card.FeaturedSubtitle style={{ color: "#000", marginTop: 20 }}>{"distance from earth: " + pd.Distance}</Card.FeaturedSubtitle>
                    <Card.FeaturedSubtitle style={{ color: "#000" }}>{"star mass: " + pd.Mass}</Card.FeaturedSubtitle>
                    <Card.FeaturedSubtitle style={{ color: "#000" }}>{"star radius: " + pd.Radius}</Card.FeaturedSubtitle>
                </Card>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
});