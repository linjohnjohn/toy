import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ReactDOMServer from "react-dom/server";
import { default as AvatarReact, Piece as PieceReact } from "avataaars";
import { SvgCss } from 'react-native-svg';


export default function App() {

    const s = ReactDOMServer.renderToString(<AvatarReact
        size={300}
        avatarStyle="Circle"
        topType="ShortHairShortRound"
        accessoriesType="Prescription02"
        hairColor="Black"
        facialHairType="Blank"
        clotheType="BlazerShirt"
        eyeType="Happy"
        eyebrowType="Default"
        mouthType="Default"
        skinColor="Light"
    />)

    console.log(s);

    return (
        
        <View></View>
    );
}

const styles = StyleSheet.create({

});
